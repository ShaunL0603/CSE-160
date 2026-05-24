import * as THREE from 'three';
import { PlayerController } from './player_controller.js';
import { TargetManager } from './target_manager.js';
import { HitDetectionSystem } from './hit_detection_system.js';

export class GameLogic {
    constructor() {
        this.player = new PlayerController();
        this.targetManager = new TargetManager();
        this.hitDetection = new HitDetectionSystem();

        this.targetManager.spawnInitial(10);

        this._lookDir = new THREE.Vector3();
    }

    // Stores positioning records before executing mutation steps
    savePreviousState() {
        this.player.savePreviousState();
        this.targetManager.savePreviousStates();
    }

    // Executed at a predictable, fixed interval of 60Hz
    update(dt, input) {
        // move player
        this.player.update(dt, input);

        // move targets
        this.targetManager.update(dt);

        // shot processing
        if (input.fireTriggered) {
            // get current direction player looking in
            this.player.getLookDirection(this._lookDir);

            const hitTargetId = this.hitDetection.evaluateShot(
                this.player.position,
                this._lookDir,
                this.targetManager.targets
            );

            if (hitTargetId !== null) {
                console.log(`Hit registered on target: ${hitTargetId}`);

                this.targetManager.despawnTarget(hitTargetId);
                this.targetManager.spawnTarget();
            }
        }
    }
}