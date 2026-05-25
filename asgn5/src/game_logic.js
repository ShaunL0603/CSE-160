import * as THREE from 'three';
import { PlayerController } from './systems/player_controller.js';
import { TargetManager } from './systems/target_manager.js';
import { HitDetectionSystem } from './systems/hit_detection_system.js';

export class GameLogic {
    constructor() {
        this.player = new PlayerController();
        this.targetManager = new TargetManager();
        this.hitDetection = new HitDetectionSystem();

        this.targetManager.spawnInitial(10);

        this._lookDir = new THREE.Vector3();

        this.score = 0;
        this.shotsFired = 0;
    }

    // Stores positioning records before executing mutation steps
    savePreviousState() {
        this.player.savePreviousState();
        this.targetManager.savePreviousStates();
    }

    // Executed at a predictable, fixed interval of 60Hz
    update(dt, input, assets, audio) {
        // move player
        this.player.update(dt, input);
        // move targets
        this.targetManager.update(dt);

        // shot processing
        if (input.fireTriggered) {
            ++this.shotsFired;
            // get current direction player looking in
            this.player.getLookDirection(this._lookDir);

            // raycast check
            const hitTargetId = this.hitDetection.evaluateShot(
                this.player.position,
                this._lookDir,
                this.targetManager.targets
            );

            if (hitTargetId !== null) {
                ++this.score;
                // console.log(`Hit registered on target: ${hitTargetId}`);

                this.targetManager.despawnTarget(hitTargetId);
                this.targetManager.spawnTarget();

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
}