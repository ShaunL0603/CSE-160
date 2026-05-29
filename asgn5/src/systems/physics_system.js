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

    resolveEntityCollisions(entity, radius, walls, slide = false) {
        for (let i = 0; i < walls.length; i++) {
            const wall = walls[i];

            if (wall.colliderType === 'AABB') {
                this.resolveSphereAABBCollision(entity, wall.boundingBox, radius, slide);
            } 
            else if (wall.colliderType === 'SLOPE') {
                this._tempSphere.set(entity.position, radius);
                if (wall.boundingBox.intersectsSphere(this._tempSphere)) {
                    this.resolveSphereSlopeCollision(entity, wall, radius);
                }
            } 
            else if (wall.colliderType === 'VOXEL_GRID') {
                this._tempSphere.set(entity.position, radius);
                if (wall.boundingBox.intersectsSphere(this._tempSphere)) {
                    this.resolveSphereVoxelGrid(entity, wall.voxelRef, radius, slide);
                }
            }
        }
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
        for (let i = 0; i < targetsLen; i++) {
            const target = targets[i];
            if (!target.active) continue;

            const radius = target.boundingRadius * target.scale;
            this.resolveEntityCollisions(target, radius, walls, false);
        }
    }

    // Sphere-to-AABB math
    resolveSphereAABBCollision(entity, boundingBox, radius, slide = false) {
        // Find the closest point on the bounding box to the target sphere
        this._closestPoint.copy(entity.position).clamp(boundingBox.min, boundingBox.max);
        this._tempDir.copy(entity.position).sub(this._closestPoint);
        const distSq = this._tempDir.lengthSq();

        if (distSq < radius * radius) {
            const dist = Math.sqrt(distSq);

            if (dist === 0) {
                // Sphere center is completely inside the box
                const box = boundingBox;
                const p = entity.position;
                
                const dMinX = p.x - box.min.x;
                const dMaxX = box.max.x - p.x;
                const dMinY = p.y - box.min.y;
                const dMaxY = box.max.y - p.y;
                const dMinZ = p.z - box.min.z;
                const dMaxZ = box.max.z - p.z;

                const minPen = Math.min(dMinX, dMaxX, dMinY, dMaxY, dMinZ, dMaxZ);
                this._normal.set(0, 0, 0);

                if (minPen === dMinX) { this._normal.x = -1; entity.position.x = box.min.x - radius; }
                else if (minPen === dMaxX) { this._normal.x = 1; entity.position.x = box.max.x + radius; }
                else if (minPen === dMinY) { this._normal.y = -1; entity.position.y = box.min.y - radius; }
                else if (minPen === dMaxY) { this._normal.y = 1; entity.position.y = box.max.y + radius; }
                else if (minPen === dMinZ) { this._normal.z = -1; entity.position.z = box.min.z - radius; }
                else if (minPen === dMaxZ) { this._normal.z = 1; entity.position.z = box.max.z + radius; }
            } else {
                this._normal.copy(this._tempDir).divideScalar(dist);
            }

            // STEP UP: if we collide with a vertical block face, 
            // but the top face is just slightly above our feet (<= 0.45 units)
            const feetY = entity.position.y - radius;
            const stepHeight = 0.45; // Standard step-up height limit
            const heightDiff = boundingBox.max.y - feetY;
            
            if (heightDiff > 0 && heightDiff <= stepHeight && this._normal.y < 0.5) {
                entity.position.y = boundingBox.max.y + radius; // Snap feet to top surface
                entity.isGrounded = true;
                entity.velocity.y = 0;
                return; // bypass horizontal push-back
            }

            // Standard collision response
            const overlap = radius - dist;
            if (dist > 0) {
                entity.position.addScaledVector(this._normal, overlap);
            }
            // --- GROUND LOGIC ---
            // If the push-out normal is mostly upwards, we're on a floor
            if (this._normal.y > 0.707) {
                entity.isGrounded = true;
                entity.velocity.y = 0;
            }

            if (slide) {
                const dot = entity.velocity.dot(this._normal);
                if (dot < 0) {
                    entity.velocity.addScaledVector(this._normal, -dot);
                    // entity.velocity.multiplyScalar(0.5); // friction slow down
                }
            } else {
                entity.velocity.reflect(this._normal);
            }
        }
    }

    resolveSphereSlopeCollision(entity, wall, radius) {
        let inBounds = false;
        let t = 0;
        let range = 0;

        if (wall.slopeAxis === 'X') {
            const minZ = wall.boundingBox.min.z;
            const maxZ = wall.boundingBox.max.z;
            // Check if entity is width-aligned with a X-axis ramp
            if (entity.position.z >= minZ - radius && entity.position.z <= maxZ + radius) {
                inBounds = true;
                range = wall.xEnd - wall.xStart;
                t = (entity.position.x - wall.xStart) / range;
            }
        } else {
            const minX = wall.boundingBox.min.x;
            const maxX = wall.boundingBox.max.x;
            // Check if entity is width-aligned with a Z-axis ramp
            if (entity.position.x >= minX - radius && entity.position.x <= maxX + radius) {
                inBounds = true;
                range = wall.zEnd - wall.zStart;
                t = (entity.position.z - wall.zStart) / range;
            }
        }

        if (inBounds) {
            // Clamp parametric bounds safely
            t = Math.max(0, Math.min(1, t));
            // Calculate precise vertical surface height
            const surfaceY = wall.yStart + t * (wall.yEnd - wall.yStart);
            const feetY = entity.position.y - radius;
            // Ground-Clamping and slope-climbing logic
            if (entity.position.y >= surfaceY - 0.2) {
                if (feetY <= surfaceY + 0.05 || (entity.isGrounded && feetY <= surfaceY + 0.3)) {
                    entity.position.y = surfaceY + radius;
                    entity.velocity.y = 0;
                    entity.isGrounded = true;
                }
            } else {
                this.resolveSphereAABBCollision(entity, wall.boundingBox, radius, true);
            }
        } else {
            this.resolveSphereAABBCollision(entity, wall.boundingBox, radius, true);
        }
    }

    resolveSphereVoxelGrid(target, voxelObj, radius, slide = false) {
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

        // Iterate strictly over the calculated tiny sub-grid
        for (let x = minI; x <= maxI; x++) {
            for (let y = minJ; y <= maxJ; y++) {
                for (let z = minK; z <= maxK; z++) {
                    if (voxelObj.isSolid(x, y, z)) {
                        // Calculate this specific voxel's temporary world bounding box (AABB)
                        const lx = (x - (w - 1) * 0.5) * s;
                        const ly = (y - (h - 1) * 0.5) * s;
                        const lz = (z - (d - 1) * 0.5) * s;

                        this._voxelCenter.set(c.x + lx, c.y + ly, c.z + lz);
                        this._voxelMin.set(
                            this._voxelCenter.x - s * 0.5, 
                            this._voxelCenter.y - s * 0.5, 
                            this._voxelCenter.z - s * 0.5
                        );
                        this._voxelMax.set(
                            this._voxelCenter.x + s * 0.5, 
                            this._voxelCenter.y + s * 0.5, 
                            this._voxelCenter.z + s * 0.5
                        );
                        this._voxelBox.set(this._voxelMin, this._voxelMax);

                        // Resolve collision against this specific voxel box
                        this.resolveSphereAABBCollision(target, this._voxelBox, radius, slide);
                    }
                }
            }
        }
    }
}