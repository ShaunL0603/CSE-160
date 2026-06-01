import * as THREE from 'three';
import { PlayerController } from './player_controller.js';
import { TargetManager } from './target_manager.js';
import { HitDetectionSystem } from './hit_detection_system.js';
import { EnvironmentManager } from './environment_manager.js';
import { PhysicsSystem } from './physics_system.js';

export class GameLogic {
    constructor() {
        // centralized game config
        this.config = {
            controls: {
                sensX: 0.50,
                sensY: 0.50,
                adsSensMultiplier: 1.00, // 100%
                toggleCroch: false,
                toggleSprint: false
            },
            camera: {
                baseFOV: 90
            },
            gameplay: {
                targetSpeed: 1.5,
                targetSize: 0.5,
                targetCount: 20,
                mapType: 'moving',
                destructionRadius: 1.0
            },
            graphics: {
                shadowQuality: 'normal', // 'low' | 'normal'
                voxelDensity: 'normal',  // 'low' | 'normal' | 'high'
                enableStrobes: true
            },
            debug: {
                showSpawnZones: false,
                showVoxelChunks: false,
                showHitboxes: false
            }
        };

        this.currentMode = 'SHOOT';

        this.player = new PlayerController(this.config.camera.baseFOV);
        this.targetManager = new TargetManager();
        this.hitDetection = new HitDetectionSystem();
        this.environment = new EnvironmentManager();
        this.physics = new PhysicsSystem();

        // this.environment.loadMap(this.config.gameplay.mapType, null, this.config.graphics.voxelDensity);
        // Calculate initial spawns: Static map gets exactly 20 targets, Moving map gets slider count
        const initialCount = this.config.gameplay.mapType === 'static' ? 50 : this.config.gameplay.targetCount;
        this.targetManager.spawnInitial(
            initialCount, 
            this.config.gameplay, 
            this.environment
        );

        this._lookDir = new THREE.Vector3();
        this._tempVector = new THREE.Vector3();
        
        this._ray = new THREE.Ray();
        this._marchPos = new THREE.Vector3();
        this._tempIntersect = new THREE.Vector3();
        this._localHitPoint = new THREE.Vector3();

        this.score = 0;
        this.shotsFired = 0;
    }

    applyConfigChanges(assets) {
        this.environment.loadMap(this.config.gameplay.mapType, assets, this.config.graphics.voxelDensity);
        if (this.config.gameplay.mapType === 'static') {
            // Despawn and cleanly reset all targets to exactly 20 for the Static Map
            this.targetManager.reset({
                targetCount: 20,
                targetSize: this.config.gameplay.targetSize,
                targetSpeed: this.config.gameplay.targetSpeed,
                mapType: 'static'
            }, this.environment);
        } else {
            // Standard moving map config update
            this.targetManager.applyConfigToActive(this.config.gameplay, this.environment);
        }
    }

    // Stores positioning records before executing mutation steps
    savePreviousState() {
        this.player.savePreviousState();
        this.targetManager.savePreviousStates();
    }

    // Executed at a predictable, fixed interval of 60Hz
    update(dt, input, assets, audio) {
        // move player
        this.player.update(dt, input, this.config);
        // move targets
        this.targetManager.update(dt, this.environment);
        // resolve collisions
        if (!this.player.isNoclip) this.physics.resolveEntityCollisions(this.player, 0.6, this.environment.walls, true);
        this.physics.resolveTargetCollisions(this.targetManager.targets);
        this.physics.resolveWallCollisions(this.targetManager.targets, this.environment.walls);

        if (input.triggers.modeToggle) {
            this.currentMode = this.currentMode === 'SHOOT' ? 'DESTROY' : 'SHOOT';
        }

        // shot processing
        if (input.triggers.fire) {
            // get current direction player looking in
            this.player.getLookDirection(this._lookDir);
            // get eye-level position
            this.player.getEyePosition(this._tempVector);

            if (this.currentMode === 'SHOOT') {
                ++this.shotsFired;
                // raycast check
                const hitTargetId = this.hitDetection.evaluateShot(
                    this._tempVector,
                    this._lookDir,
                    this.targetManager.targets
                );

                if (hitTargetId !== null) {
                    ++this.score;
                    this.targetManager.despawnTarget(hitTargetId);
                    this.targetManager.spawnTarget(this.config.gameplay, this.environment);
                    // console.log("hit target:", hitTargetId);
                    const sfx = assets.sounds.get('hit');
                    if (sfx) audio.playSound(sfx);
                    else audio.synthesizeBeep(880, 0.08, 'triangle');
                } else {
                    // console.log("missed");
                    const sfx = assets.sounds.get('miss');
                    if (sfx) audio.playSound(sfx);
                    else audio.synthesizeBeep(220, 0.1, 'sawtooth');
                }
            }
            else if (this.currentMode === 'DESTROY') {
                // Initialize math ray from camera
                this._ray.set(this._tempVector, this._lookDir);

                let closestVoxelObj = null;
                let closestDist = 25;
                
                const voxelObjects = this.environment.voxelObjects;

                // Broad-phase: find closest voxel master bounding box intersected
                for (let i = 0; i < voxelObjects.length; i++) {
                    const voxelObj = voxelObjects[i];

                    if (voxelObj.boundingBox.containsPoint(this._tempVector)) {
                        closestVoxelObj = voxelObj;
                        closestDist = 0;
                        this._marchPos.copy(this._tempVector);
                        break;
                    }

                    const intersectPoint = this._ray.intersectBox(voxelObj.boundingBox, this._tempIntersect);
                    if (intersectPoint !== null) {
                        const dist = this._tempVector.distanceTo(intersectPoint);
                        if (dist < closestDist) {
                            closestDist = dist;
                            closestVoxelObj = voxelObj;
                            this._marchPos.copy(intersectPoint); // Start raymarching at entry point
                        }
                    }
                }

                // Narrow-phase: parametric Ray-Marching inside the voxel object
                if (closestVoxelObj !== null) {
                    const s = closestVoxelObj.voxelScale;
                    const maxMarchDist = 15.0; // Max depth to search
                    const stepSize = s * 0.5;  // Half voxel size step to gurantee zero voxel skips
                    
                    let hitVoxel = false;

                    for (let distWalked = 0; distWalked < maxMarchDist; distWalked += stepSize) {
                        // Transform world coordinates to local offsets relative to center
                        this._localHitPoint.copy(this._marchPos).sub(closestVoxelObj.position);

                        const { x: w, y: h, z: d } = closestVoxelObj.dimensions;
                        const offsetScalarX = (w - 1) * 0.5;
                        const x = Math.round(this._localHitPoint.x / s + offsetScalarX);

                        const offsetScalarY = (h - 1) * 0.5;
                        const y = Math.round(this._localHitPoint.y / s + offsetScalarY);

                        const offsetScalarZ = (d - 1) * 0.5;
                        const z = Math.round(this._localHitPoint.z / s + offsetScalarZ);

                        if (closestVoxelObj.isSolid(x, y, z)) {
                            // First solid voxel found! Trigger destruction
                            closestVoxelObj.applyExplosion(this._localHitPoint, this.config.gameplay.destructionRadius);
                            hitVoxel = true;
                            break;
                        }

                        // March step along direction
                        this._marchPos.addScaledVector(this._lookDir, stepSize);
                    }

                    if (hitVoxel) {
                        audio.synthesizeBeep(120, 0.20, 'sawtooth'); // Deep explosion beep
                    } else {
                        audio.synthesizeBeep(220, 0.1, 'sine'); // Solid boundary miss
                    }
                } else {
                    audio.synthesizeBeep(220, 0.1, 'sine'); // Complete miss
                }
            }
        }
    }

    reset(assets) {
        this.score = 0;
        this.shotsFired = 0;
        this.player.reset(this.config.camera.baseFOV);
        // .loadMap() -> true parameter to force a reload, regenerate voxel objects when clicking reset button
        this.environment.loadMap(this.config.gameplay.mapType, assets, this.config.graphics.voxelDensity, true);
        // Reset target managers with correct count
        const activeConfig = {
            targetCount: this.config.gameplay.mapType === 'static' ? 20 : this.config.gameplay.targetCount,
            targetSize: this.config.gameplay.targetSize,
            targetSpeed: this.config.gameplay.targetSpeed,
            mapType: this.config.gameplay.mapType
        };
        this.targetManager.reset(activeConfig, this.environment);
    }
}