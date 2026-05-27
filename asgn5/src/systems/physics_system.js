import * as THREE from 'three';

export class PhysicsSystem {
    constructor() {
        // per-allocate helpers
        this._normal = new THREE.Vector3();
        this._relativeVelocity = new THREE.Vector3();
        this._pushVector = new THREE.Vector3();

        this._closestPoint = new THREE.Vector3();
        this._tempDir = new THREE.Vector3();

        // voxel stuff
        this._localMin = new THREE.Vector3();
        this._localMax = new THREE.Vector3();
        this._unitNegative = new THREE.Vector3(-1, -1, -1);
        this._unitPositive = new THREE.Vector3(1, 1, 1);
        
        this._voxelCenter = new THREE.Vector3();
        this._voxelMin = new THREE.Vector3();
        this._voxelMax = new THREE.Vector3();
        this._voxelBox = new THREE.Box3();
        this._tempSphere = new THREE.Sphere();
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

        for (let i = 0; i < targetsLen; i++) {
            const target = targets[i];
            if (!target.active) continue;

            const radius = target.boundingRadius * target.scale;

            for (let j = 0; j < wallsLen; j++) {
                const wall = walls[j];

                // Standard solid box collision
                if (wall.colliderType === 'AABB') {
                    this.resolveSphereAABBCollision(target, wall.boundingBox, radius);
                } 
                // Voxel Grid collision
                else if (wall.colliderType === 'VOXEL_GRID') {
                    this._tempSphere.set(target.position, radius);
                    // Broad-Phase Filter: check if sphere intersects the voxel object's master bounding box
                    if (wall.boundingBox.intersectsSphere(this._tempSphere)) {
                        this.resolveSphereVoxelGrid(target, wall.voxelRef, radius);
                    }
                }
            }
        }
    }

    // Sphere-to-AABB math
    resolveSphereAABBCollision(target, boundingBox, radius) {
        // Find the closest point on the bounding box to the target sphere
        this._closestPoint.copy(target.position).clamp(boundingBox.min, boundingBox.max);
        this._tempDir.copy(target.position).sub(this._closestPoint);
        const distSq = this._tempDir.lengthSq();

        if (distSq < radius * radius) {
            const dist = Math.sqrt(distSq);

            if (dist === 0) {
                // Sphere center is completely inside the box
                const box = boundingBox;
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
                // Standard penetration: calculate collision normal
                this._normal.copy(this._tempDir).divideScalar(dist);
                const overlap = radius - dist;
                // Positional correction: push out of wall
                target.position.addScaledVector(this._normal, overlap);
                // Bounce: reflect velocity vector
                target.velocity.reflect(this._normal);
            }
        }
    }

    // Narrow-Phase Voxel resolution
    resolveSphereVoxelGrid(target, voxelObj, radius) {
        const s = voxelObj.voxelScale;
        const { x: w, y: h, z: d } = voxelObj.dimensions;
        const c = voxelObj.position;

        // Convert world sphere boundaries to local coordinates relative to the voxel center
        this._localMin.copy(target.position).addScaledVector(this._unitNegative, radius).sub(c);
        this._localMax.copy(target.position).addScaledVector(this._unitPositive, radius).sub(c);

        // Map local coordinate bounds to grid indices
        const offsetScalarX = (w - 1) * 0.5;
        const minI = Math.max(0, Math.floor(this._localMin.x / s + offsetScalarX));
        const maxI = Math.min(w - 1, Math.ceil(this._localMax.x / s + offsetScalarX));

        const offsetScalarY = (h - 1) * 0.5;
        const minJ = Math.max(0, Math.floor(this._localMin.y / s + offsetScalarY));
        const maxJ = Math.min(h - 1, Math.ceil(this._localMax.y / s + offsetScalarY));

        const offsetScalarZ = (d - 1) * 0.5;
        const minK = Math.max(0, Math.floor(this._localMin.z / s + offsetScalarZ));
        const maxK = Math.min(d - 1, Math.ceil(this._localMax.z / s + offsetScalarZ));

        // Iterate strictly over the calculated tiny sub-grid [5]
        for (let x = minI; x <= maxI; x++) {
            for (let y = minJ; y <= maxJ; y++) {
                for (let z = minK; z <= maxK; z++) {
                    if (voxelObj.isSolid(x, y, z)) {
                        // Calculate this specific voxel's temporary world bounding box (AABB)
                        const lx = (x - (w - 1) * 0.5) * s;
                        const ly = (y - (h - 1) * 0.5) * s;
                        const lz = (z - (d - 1) * 0.5) * s;

                        this._voxelCenter.set(c.x + lx, c.y + ly, c.z + lz);
                        this._voxelMin.set(this._voxelCenter.x - s * 0.5, this._voxelCenter.y - s * 0.5, this._voxelCenter.z - s * 0.5);
                        this._voxelMax.set(this._voxelCenter.x + s * 0.5, this._voxelCenter.y + s * 0.5, this._voxelCenter.z + s * 0.5);
                        this._voxelBox.set(this._voxelMin, this._voxelMax);

                        // Resolve collision against this specific voxel box
                        this.resolveSphereAABBCollision(target, this._voxelBox, radius);
                    }
                }
            }
        }
    }
}