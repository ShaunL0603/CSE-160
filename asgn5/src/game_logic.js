import * as THREE from 'three';
import { PlayerController } from './player_controller.js';

export class GameLogic {
    constructor() {
        this.player = new PlayerController();

        // Static configuration parameters
        this.config = {
            targetSpeed: 2.0,
            targetSize: 1.0
        };

        // Preallocated helper vector
        this._tempVector = new THREE.Vector3();
    }

    // Stores positioning records before executing mutation steps
    savePreviousState() {
        this.player.savePreviousState();
    }

    // Executed at a predictable, fixed interval of 60Hz
    update(dt, input) {
        this.player.update(dt, input);
    }
}