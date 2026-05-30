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
        this._helperClosest = new THREE.Vector3();
    }

    savePreviousStates() {
        for (let i = 0; i < this.poolSize; i++) {
            if (this.targets[i].active) {
                this.targets[i].savePreviousState();
            }
        }
    }

    // Weighted lottery algorithm, distribute targets evenly based on zone sizes
    selectSpawnZone(environment) {
        const zones = environment.targetSpawnZones;
        if (zones.length === 0) return null;

        // Build simple lottery ticket array
        const lottery = [];
        for (let i = 0; i < zones.length; i++) {
            const limit = zones[i].maxTargets;
            for (let j = 0; j < limit; j++) {
                lottery.push(i); // Push zone index "limit" times
            }
        }

        if (lottery.length === 0) return null;
        const selectedIdx = lottery[Math.floor(Math.random() * lottery.length)];
        return zones[selectedIdx].boundingBox;
    }

    spawnTarget(config, environment) {
        // Find the first available inactive target in the pool
        const target = this.targets.find(t => !t.active);
        if (!target) return; // Pool exhausted (safety fallback)

        const isStatic = (config.mapType === 'static');
        const zones = environment.targetSpawnZones;
        let spawnSuccess = false;
        const maxAttempts = 20;

        for (let attempt = 0; attempt < maxAttempts; ++attempt) {
            let targetY = 0;

            if (isStatic && zones.length > 0) {
                // Multi-zone spawning logic
                const zoneBox = this.selectSpawnZone(environment);
                const sizeX = zoneBox.max.x - zoneBox.min.x;
                const sizeZ = zoneBox.max.z - zoneBox.min.z;
                this._tempVector.set(
                    zoneBox.min.x + Math.random() * sizeX,
                    0,
                    zoneBox.min.z + Math.random() * sizeZ
                );
                // Position sphere center exactly at ye Level
                targetY = zoneBox.min.y + 1.6; 
                this._tempVector.y = targetY;
            } else {
                // Standard moving map bounding box spawning
                // Position target randomly within spawn bounding region
                const min = this.spawnBounds.min;
                this._tempVector.set(
                    min.x + Math.random() * this._boundsSize.x,
                    min.y + Math.random() * this._boundsSize.y,
                    min.z + Math.random() * this._boundsSize.z
                );
            }

            const candidateRadius = target.boundingRadius * config.targetSize;
            let collided = false;
            // check for overlap with existing targets
            for (let i = 0; i < this.poolSize; ++i) {
                const other = this.targets[i];
                if (!other.active) continue;

                const otherRadius = other.boundingRadius * other.scale;
                const minDist = candidateRadius + otherRadius;

                if (this._tempVector.distanceToSquared(other.position) < minDist * minDist) {
                    collided = true;
                    break;
                }
            }

            if (collided) continue;

            // check overlap against walls
            for (let i = 0; i < environment.walls.length; ++i) {
                const wall = environment.walls[i];
                // find the closest point on wall
                this._helperClosest.copy(this._tempVector).clamp(wall.boundingBox.min, wall.boundingBox.max);
                const distSq = this._tempVector.distanceToSquared(this._helperClosest);

                if (distSq < candidateRadius * candidateRadius) {
                    collided = true;
                    break;
                }
            }

            if (!collided) {
                target.position.copy(this._tempVector);
                target.prevPosition.copy(target.position);
                spawnSuccess = true;
                break;
            }
        }

        if (!spawnSuccess) {
            console.warn("Could not find a position to spawn target after 20 attempts");
            return;
        }

        // map logic
        if (isStatic) {
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
        if (target) target.active = false;
    }

    spawnInitial(count, config, environment) {
        for (let i = 0; i < count; ++i) {
            this.spawnTarget(config, environment);
        }
    }

    applyConfigToActive(config, environment) {
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
            for (let i = 0; i < diff; ++i) this.spawnTarget(config, environment);
        } 
        // If user decreased target count, despawn the excess
        else if (activeCount > config.targetCount) {
            let diff = activeCount - config.targetCount;
            for (let i = 0; i < this.poolSize && diff > 0; ++i) {
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

    reset(config, environment) {
        for (let i = 0; i < this.poolSize; ++i) {
            this.targets[i].active = false;
        }
        this.spawnInitial(config.targetCount, config, environment);
    }
}