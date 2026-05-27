import * as THREE from 'three';
import { PlayerController } from './player_controller.js';
import { TargetManager } from './systems/target_manager.js';
import { HitDetectionSystem } from './systems/hit_detection_system.js';
import { EnvironmentManager } from './systems/environment_manager.js';
import { PhysicsSystem } from './systems/physics_system.js';

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
                targetSpeed: 3.5,
                targetSize: 0.5,
                targetCount: 10,
                mapType: 'moving'
            }
        };

        this.player = new PlayerController(this.config.camera.baseFOV);
        this.targetManager = new TargetManager();
        this.hitDetection = new HitDetectionSystem();
        this.environment = new EnvironmentManager();
        this.physics = new PhysicsSystem();

        this.environment.loadMap(this.config.gameplay.mapType);

        this.targetManager.spawnInitial(this.config.gameplay.targetCount, this.config.gameplay, this.environment);

        this._lookDir = new THREE.Vector3();
        this._tempVector = new THREE.Vector3();

        this.score = 0;
        this.shotsFired = 0;
    }

    applyConfigChanges() {
        this.environment.loadMap(this.config.gameplay.mapType);
        this.targetManager.applyConfigToActive(this.config.gameplay, this.environment);
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
        this.targetManager.update(dt);
        // resolve collisions
        this.physics.resolveTargetCollisions(this.targetManager.targets);
        this.physics.resolveWallCollisions(this.targetManager.targets, this.environment.walls);

        // shot processing
        if (input.triggers.fire) {
            ++this.shotsFired;
            // get current direction player looking in
            this.player.getLookDirection(this._lookDir);
            // get eye-level position
            this.player.getEyePosition(this._tempVector);

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

                const sfx = assets.sounds.get('hit');
                if (sfx) audio.playSound(sfx);
                else audio.synthesizeBeep(880, 0.08, 'triangle');
            } else {
                const sfx = assets.sounds.get('miss');
                if (sfx) audio.playSound(sfx);
                else audio.synthesizeBeep(220, 0.1, 'sawtooth');
            }
        }
    }

    reset() {
        this.score = 0;
        this.shotsFired = 0;
        this.player.reset(this.config.camera.baseFOV);
        this.targetManager.reset(this.config.gameplay, this.environment);
    }
}