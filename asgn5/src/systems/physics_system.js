import * as THREE from 'three';

export class PhysicsSystem {
    constructor() {
        this._normal = new THREE.Vector3();
        this._relativeVelocity = new THREE.Vector3();
        this._pushVector = new THREE.Vector3();

        this._closestPoint = new THREE.Vector3();
        this._tempDir = new THREE.Vector3();
    }

    resolveTargetCollisions(targets) {
        const len = targets.length;

        for (let i = 0; i < len; ++i) {
            const targetA = targets[i];
            if (!targetA.active) continue;

            const radiusA = targetA.boundingRadius * targetA.scale;

            for (let j = i + 1; j < len; ++j) {
                const targetB = targets[j];
                if (!targetB.active) continue;

                const radiusB = targetB.boundingRadius * targetB.scale;
                const combinedRadius = radiusA + radiusB;

                // squared-distance collision check
                this._tempDir.copy(targetA.position).sub(targetB.position);
                const distSq = this._tempDir.lengthSq();

                if (distSq < combinedRadius * combinedRadius) {
                    const dist = Math.sqrt(distSq);
                    
                    // Prevent dividing by zero if center positions are mathematically identical
                    if (dist === 0) {
                        targetA.position.x += 0.01; // Tiny nudge
                        continue;
                    }

                    this._normal.copy(this._tempDir).divideScalar(dist);

                    // Position correction: push targets apart to prevent "sticking"
                    const overlap = combinedRadius - dist;
                    this._pushVector.copy(this._normal).multiplyScalar(overlap * 0.5);
                    
                    targetA.position.add(this._pushVector);
                    targetB.position.sub(this._pushVector);

                    // Elastic Momentum Resolution (Swapping velocities along collision normal)
                    this._relativeVelocity.copy(targetA.velocity).sub(targetB.velocity);
                    const relVelocityNormal = this._relativeVelocity.dot(this._normal);

                    // Only resolve momentum if targets are moving toward each other
                    if (relVelocityNormal < 0) {
                        const impulse = -relVelocityNormal;
                        this._pushVector.copy(this._normal).multiplyScalar(impulse);
                        
                        targetA.velocity.add(this._pushVector);
                        targetB.velocity.sub(this._pushVector);
                    }
                }
            }
        }
    }

    resolveWallCollisions(targets, walls) {
        const targetsLen = targets.length;
        const wallsLen = walls.length;

        for (let i = 0; i < targetsLen; ++i) {
            const target = targets[i];
            if (!target.active) continue;

            const radius = target.boundingRadius * target.scale;

            for (let j = 0; j < wallsLen; ++j) {
                const wall = walls[j];

                // Find the closest point on the AABB wall box to the sphere coordinates
                this._closestPoint.copy(target.position).clamp(wall.boundingBox.min, wall.boundingBox.max);
                this._tempDir.copy(target.position).sub(this._closestPoint);
                const distSq = this._tempDir.lengthSq();

                if (distSq < radius * radius) {
                    const dist = Math.sqrt(distSq);

                    if (dist === 0) {
                        // Edge case fallback: Sphere center is completely inside the wall geometry
                        // Find the shallowest penetration axis and push out along it
                        const box = wall.boundingBox;
                        const p = target.position;
                        
                        const dMinX = p.x - box.min.x;
                        const dMaxX = box.max.x - p.x;
                        const dMinY = p.y - box.min.y;
                        const dMaxY = box.max.y - p.y;
                        const dMinZ = p.z - box.min.z;
                        const dMaxZ = box.max.z - p.z;

                        const minPen = Math.min(dMinX, dMaxX, dMinY, dMaxY, dMinZ, dMaxZ);
                        this._normal.set(0, 0, 0);

                        if (minPen === dMinX) { this._normal.x = -1; target.position.x = box.min.x - radius; }
                        else if (minPen === dMaxX) { this._normal.x = 1; target.position.x = box.max.x + radius; }
                        else if (minPen === dMinY) { this._normal.y = -1; target.position.y = box.min.y - radius; }
                        else if (minPen === dMaxY) { this._normal.y = 1; target.position.y = box.max.y + radius; }
                        else if (minPen === dMinZ) { this._normal.z = -1; target.position.z = box.min.z - radius; }
                        else if (minPen === dMaxZ) { this._normal.z = 1; target.position.z = box.max.z + radius; }

                        target.velocity.reflect(this._normal);
                    } else {
                        // Standard physical wall intersection
                        this._normal.copy(this._tempDir).divideScalar(dist);
                        const overlap = radius - dist;

                        // Positional correction: push out of wall
                        target.position.addScaledVector(this._normal, overlap);

                        // Velocity Resolution: reflect velocity vector across wall surface normal
                        target.velocity.reflect(this._normal);
                    }
                }
            }
        }
    }
}