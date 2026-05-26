import * as THREE from 'three';

class TargetState {
    constructor(id) {
        this.id = id;
        this.active = false;
        
        this.position = new THREE.Vector3();
        this.prevPosition = new THREE.Vector3();
        this.velocity = new THREE.Vector3();
        this.scale = 0.5;
        this.boundingRadius = 0.5; // Baseline sphere bounds radius
    }

    savePreviousState() {
        this.prevPosition.copy(this.position);
    }
}

export class TargetManager {
    constructor(poolSize = 100) {
        this.poolSize = poolSize;
        // Generate a pre-allocated pool of target states
        this.targets = Array.from({ length: this.poolSize }, (_, idx) => new TargetState(idx));

        this.spawnBounds = new THREE.Box3(
            new THREE.Vector3(-12, 1.5, -15), // Min X, Y, Z
            new THREE.Vector3(12, 7.5, -5)    // Max X, Y, Z
        )

        this._boundsSize = new THREE.Vector3();
        this.spawnBounds.getSize(this._boundsSize);
        this._tempVector = new THREE.Vector3();
    }

    savePreviousStates() {
        for (let i = 0; i < this.poolSize; i++) {
            if (this.targets[i].active) {
                this.targets[i].savePreviousState();
            }
        }
    }

    spawnTarget(config) {
        // Find the first available inactive target in the pool
        const target = this.targets.find(t => !t.active);
        if (!target) return; // Pool exhausted (safety fallback)

        const min = this.spawnBounds.min;
        // Position target randomly within spawn bounding region
        target.position.set(
            min.x + Math.random() * this._boundsSize.x,
            min.y + Math.random() * this._boundsSize.y,
            min.z + Math.random() * this._boundsSize.z
        );
        target.prevPosition.copy(target.position);

        // map logic
        if (config.mapType === 'static') {
            target.velocity.set(0, 0, 0);
        } else {
            // Assign random direction vector and scale by configured velocity
            target.velocity.set(
                Math.random() - 0.5,
                Math.random() - 0.5,
                Math.random() - 0.5
            ).normalize().multiplyScalar(config.targetSpeed);
        }

        target.scale = config.targetSize;
        target.active = true;
    }

    despawnTarget(id) {
        const target = this.targets.find(t => t.id === id);
        if (target) {
            target.active = false;
        }
    }

    spawnInitial(count, config) {
        for (let i = 0; i < count; i++) {
            this.spawnTarget(config);
        }
    }

    applyConfigToActive(config) {
        let activeCount = 0;

        for (let i = 0; i < this.poolSize; ++i) {
            const target = this.targets[i];
            if (!target.active) continue;

            activeCount++;
            target.scale = config.targetSize;

            if (config.mapType === 'static') {
                target.velocity.set(0, 0, 0);
            } else {
                // if target was static, give random new directino
                if (target.velocity.lengthSq() === 0) {
                    target.velocity.set(
                        Math.random() - 0.5,
                        Math.random() - 0.5,
                        Math.random() - 0.5
                    ).normalize().multiplyScalar(config.targetSpeed);
                } else {
                    // update speed, otherwise
                    target.velocity.normalize().multiplyScalar(config.targetSpeed);
                }
            }
        }

        // If user increased target count in menu, spawn the difference
        if (activeCount < config.targetCount) {
            const diff = config.targetCount - activeCount;
            for (let i = 0; i < diff; i++) this.spawnTarget(config);
        } 
        // If user decreased target count, despawn the excess
        else if (activeCount > config.targetCount) {
            let diff = activeCount - config.targetCount;
            for (let i = 0; i < this.poolSize && diff > 0; i++) {
                if (this.targets[i].active) {
                    this.targets[i].active = false;
                    diff--;
                }
            }
        }
    }

    update(dt) {
        const bounds = this.spawnBounds;
        for (let i = 0; i < this.poolSize; ++i) {
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

    reset(config) {
        for (let i = 0; i < this.poolSize; ++i) {
            this.targets[i].active = false;
        }
        this.spawnInitial(config.targetCount, config);
    }
}