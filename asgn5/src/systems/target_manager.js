import * as THREE from 'three';

class TargetState {
    constructor(id) {
        this.id = id;
        this.active = false;
        
        this.position = new THREE.Vector3();
        this.prevPosition = new THREE.Vector3();
        this.velocity = new THREE.Vector3();
        this.scale = 1.0;
        this.boundingRadius = 0.5; // Baseline sphere bounds radius
    }

    savePreviousState() {
        this.prevPosition.copy(this.position);
    }
}

export class TargetManager {
    constructor(poolSize = 50) {
        this.poolSize = poolSize;
        
        // Generate a pre-allocated pool of target states
        this.targets = Array.from({ length: this.poolSize }, (_, idx) => new TargetState(idx));

        this.config = {
            targetSpeed: 3.5,
            targetSize: 1.0,
            // Spawning region in front of player
            spawnBounds: new THREE.Box3(
                new THREE.Vector3(-12, 1.5, -15), // Min X, Y, Z
                new THREE.Vector3(12, 7.5, -5)    // Max X, Y, Z
            )
        };

        this._boundsSize = new THREE.Vector3();
        this.config.spawnBounds.getSize(this._boundsSize);
        this._tempVector = new THREE.Vector3();
    }

    savePreviousStates() {
        for (let i = 0; i < this.poolSize; i++) {
            if (this.targets[i].active) {
                this.targets[i].savePreviousState();
            }
        }
    }

    spawnTarget() {
        // Find the first available inactive target in the pool
        const target = this.targets.find(t => !t.active);
        if (!target) return; // Pool exhausted (safety fallback)

        const min = this.config.spawnBounds.min;

        // Position target randomly within spawn bounding region
        target.position.set(
            min.x + Math.random() * this._boundsSize.x,
            min.y + Math.random() * this._boundsSize.y,
            min.z + Math.random() * this._boundsSize.z
        );
        target.prevPosition.copy(target.position);

        // Assign random direction vector and scale by configured velocity
        target.velocity.set(
            Math.random() - 0.5,
            Math.random() - 0.5,
            Math.random() - 0.5
        ).normalize().multiplyScalar(this.config.targetSpeed);

        target.scale = this.config.targetSize;
        target.active = true;
    }

    despawnTarget(id) {
        const target = this.targets.find(t => t.id === id);
        if (target) {
            target.active = false;
        }
    }

    spawnInitial(count) {
        for (let i = 0; i < count; i++) {
            this.spawnTarget();
        }
    }

    applyConfigToActive() {
        for (let i = 0; i < this.poolSize; ++i) {
            const target = this.targets[i];
            if (!target.active) continue;

            // update targets scale and velocity
            target.scale = this.config.targetSize;
            // need to preserve targets current movement direction when adjusting speed
            // check if we're dividing by 0 first if velocity is somehow 0
            if (target.velocity.lengthSq() > 0) {
                target.velocity.normalize().multiplyScalar(this.config.targetSpeed);
            }
        }
    }

    update(dt) {
        const bounds = this.config.spawnBounds;

        for (let i = 0; i < this.poolSize; i++) {
            const target = this.targets[i];
            if (!target.active) continue;
            
            // Move target using current velocity direction
            this._tempVector.copy(target.velocity).multiplyScalar(dt);
            target.position.add(this._tempVector);

            // Bounds boundary check with bounce reversal
            if (target.position.x < bounds.min.x || target.position.x > bounds.max.x) {
                target.velocity.x *= -1;
                target.position.x = Math.max(bounds.min.x, Math.min(bounds.max.x, target.position.x));
            }
            if (target.position.y < bounds.min.y || target.position.y > bounds.max.y) {
                target.velocity.y *= -1;
                target.position.y = Math.max(bounds.min.y, Math.min(bounds.max.y, target.position.y));
            }
            if (target.position.z < bounds.min.z || target.position.z > bounds.max.z) {
                target.velocity.z *= -1;
                target.position.z = Math.max(bounds.min.z, Math.min(bounds.max.z, target.position.z));
            }
        }
    }
}