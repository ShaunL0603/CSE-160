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
        this._intersectPool = Array.from({ length: 10}, () => ({
            obj: null,
            dist: 0,
            entryPoint: new THREE.Vector3()
        }));
        this._intersectCount = 0;

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

                // let closestVoxelObj = null;
                // let closestDist = 25;
                this._intersectCount = 0;
                const voxelObjects = this.environment.voxelObjects;

                // Broad-phase: find closest voxel master bounding box intersected
                for (let i = 0; i < voxelObjects.length; i++) {
                    const voxelObj = voxelObjects[i];
                    // Player is inside voxel object's bounding box
                    if (voxelObj.boundingBox.containsPoint(this._tempVector)) {
                        const entry = this._intersectPool[this._intersectCount];
                        entry.obj = voxelObj;
                        entry.dist = 0;
                        entry.entryPoint.copy(this._tempVector);
                        this._intersectCount++;
                    }
                    // ray intersects bounding box from outside
                    else {
                        const intersectPoint = this._ray.intersectBox(voxelObj.boundingBox, this._tempIntersect);
                        if (intersectPoint !== null) {
                            const entry = this._intersectPool[this._intersectCount];
                            entry.obj = voxelObj;
                            entry.dist = this._tempVector.distanceTo(intersectPoint);
                            entry.entryPoint.copy(intersectPoint);
                            this._intersectCount++;
                        }
                    }
                }

                // In-place insertion sort to sort intersected objects by distance
                for (let i = 1; i < this._intersectCount; i++) {
                    let j = i;
                    while (j > 0 && this._intersectPool[j].dist < this._intersectPool[j - 1].dist) {
                        const temp = this._intersectPool[j];
                        this._intersectPool[j] = this._intersectPool[j - 1];
                        this._intersectPool[j - 1] = temp;
                        j--;
                    }
                }

                let hitVoxel = false;

                // Narrow-phase: sequentially ray-march through sorted voxel objects
                for (let k = 0; k < this._intersectCount; k++) {
                    const entry = this._intersectPool[k];
                    const voxelObj = entry.obj;
                    const s = voxelObj.voxelScale;
                    const maxMarchDist = 25.0; // Max depth to search
                    const stepSize = s * 0.5;  // Half voxel size step to gurantee zero voxel skips

                    this._marchPos.copy(entry.entryPoint);
                    let hitVoxelInThisObject = false;

                    for (let distWalked = 0; distWalked < maxMarchDist; distWalked += stepSize) {
                        // Transform world coordinates to local offsets relative to center
                        this._localHitPoint.copy(this._marchPos).sub(voxelObj.position);

                        const { x: w, y: h, z: d } = voxelObj.dimensions;
                        const offsetScalarX = (w - 1) * 0.5;
                        const x = Math.round(this._localHitPoint.x / s + offsetScalarX);

                        const offsetScalarY = (h - 1) * 0.5;
                        const y = Math.round(this._localHitPoint.y / s + offsetScalarY);

                        const offsetScalarZ = (d - 1) * 0.5;
                        const z = Math.round(this._localHitPoint.z / s + offsetScalarZ);

                        if (voxelObj.isSolid(x, y, z)) {
                            // First solid voxel found! Trigger destruction
                            voxelObj.applyExplosion(this._localHitPoint, this.config.gameplay.destructionRadius);
                            hitVoxelInThisObject = true;
                            hitVoxel = true;
                            break;
                        }

                        // March step along direction
                        this._marchPos.addScaledVector(this._lookDir, stepSize);
                    }

                    if (hitVoxelInThisObject) break;
                }

                if (hitVoxel) {
                    audio.synthesizeBeep(120, 0.20, 'sawtooth'); // Deep explosion beep
                } else {
                    audio.synthesizeBeep(220, 0.1, 'sine'); // Solid boundary miss
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