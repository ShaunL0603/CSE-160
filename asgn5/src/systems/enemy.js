import * as THREE from 'three';

export class Enemy {
    constructor(id, initialPosition, path) {
        this.id = id;
        this.position = initialPosition.clone(); // Spatial center (Y includes radius offset)
        this.prevPosition = initialPosition.clone();
        this.velocity = new THREE.Vector3();
        this.radius = 0.6;
        this.collisionOffsetY = 0.6; // Feet are at position.y - radius
        this.active = true;

        // Finite State Machine: 'PATROL' | 'CHASE' | 'SEARCH' | 'RETURN'
        this.state = 'PATROL';
        this.path = path; // Array of THREE.Vector3 waypoints
        this.currentWaypointIdx = 0;

        // Rotation tracking
        this.yaw = 0;
        this.prevYaw = 0;
        this.targetYaw = 0;

        // Kinematics Configuration
        this.moveSpeed = 2.0;
        this.chaseSpeed = 4.0;
        this.rotationSpeed = 6.0;
        this.isGrounded = false;
        this.groundCollider = null;

        // Vision & Combat Configuration
        this.maxVisionDist = 18.0;
        this.visionConeCos = Math.cos(THREE.MathUtils.degToRad(45)); // 90 degree total visual cone

        this.visionTickCounter = Math.floor(Math.random() * 6); // Offset update ticks across enemies
        this.searchTimer = 0;
        this.lookAroundTimer = 0;
        this.shootCooldown = 0;
        this.hasLoS = false;
        this.lastKnownPlayerPos = new THREE.Vector3();
        
        // Zero-GC preallocated math helpers
        this._temp = new THREE.Vector3();
        this._lookDir = new THREE.Vector3();
        this._nextPos = new THREE.Vector3();
        this._wishDir = new THREE.Vector3();
        this._ray = new THREE.Ray();
        this._closestPoint = new THREE.Vector3();
        this._toPlayer = new THREE.Vector3();
        this._localHitPoint = new THREE.Vector3();
        this._marchPos = new THREE.Vector3();
    }

    savePreviousState() {
        this.prevPosition.copy(this.position);
        this.prevYaw = this.yaw;
    }

    reset(baseFOV) {
        if (this.path && this.path.length > 0) {
            this.position.copy(this.path[0]);
            this.prevPosition.copy(this.path[0]);
        }
        this.velocity.set(0, 0, 0);
        this.state = 'PATROL';
        this.currentWaypointIdx = 0;
        this.yaw = 0;
        this.prevYaw = 0;
        this.targetYaw = 0;
        this.isGrounded = false;
        this.groundCollider = null;
        this.searchTimer = 0;
        this.lookAroundTimer = 0;
        this.shootCooldown = 0;
        this.hasLoS = false;
    }

    update(dt, player, environment, hitDetection, audio, assets) {
        this.savePreviousState();

        // Throttled Vision checks (10Hz / every 6 frames)
        const playerSpotted = this.checkVision(player, environment);

        // FSM State Transitions
        if (playerSpotted) {
            this.state = 'CHASE';
            this.searchTimer = 0;
        } else if (this.state === 'CHASE') {
            this.state = 'SEARCH'; // Search last known position
            this.searchTimer = 0;
            this.lookAroundTimer = 0;
        }

        // Execute FSM Actions
        if (this.state === 'PATROL') {
            this.patrol(dt);
        } else if (this.state === 'CHASE') {
            this.chase(dt, player, audio, assets);
        } else if (this.state === 'SEARCH') {
            this.search(dt, audio, assets);
        } else if (this.state === 'RETURN') {
            this.goToNearestWaypoint(dt);
        }

        // Check voxel floor to avoid holes
        const isStandingOnVoxels = this.groundCollider && this.groundCollider.colliderType === 'VOXEL_GRID';
        if (isStandingOnVoxels) {
            this.avoidHoles(dt, environment);
        }

        // Apply physics translation
        this._temp.copy(this.velocity).multiplyScalar(dt);
        this.position.add(this._temp);

        // Reset grounded status (re-evaluated during collision resolution step)
        this.isGrounded = false;
    }

    // Cone-of-sight & Raycast occlusion solver
    checkVision(player, environment) {
        this.visionTickCounter++;
        if (this.visionTickCounter < 6) return this.hasLoS; // Throttling
        this.visionTickCounter = 0;

        this.hasLoS = false;

        const eyePos = this._temp;
        eyePos.copy(this.position);
        eyePos.y += this.collisionOffsetY;

        const playerEye = this._toPlayer;
        player.getEyePosition(playerEye);

        // Distance Gatekeeper Check
        const dist = eyePos.distanceTo(playerEye);
        if (dist > this.maxVisionDist) return false;

        // Cone Angle Check (Dot Product)
        this._toPlayer.subVectors(playerEye, eyePos).normalize();
        this._lookDir.set(-Math.sin(this.yaw), 0, -Math.cos(this.yaw)).normalize();

        const cosAngle = this._toPlayer.dot(this._lookDir);
        if (cosAngle < this.visionConeCos) return false;

        // Line-of-Sight Occlusion Check (Raycasting through walls & voxels)
        this._ray.set(eyePos, this._toPlayer);
        let closestObstructionDist = Infinity;

        // Check AABB walls
        for (let i = 0; i < environment.walls.length; i++) {
            const wall = environment.walls[i];
            if (wall.colliderType === 'VOXEL_GRID') continue; // Handled below

            const hit = this._ray.intersectBox(wall.boundingBox, this._closestPoint);
            if (hit !== null) {
                const hitDist = eyePos.distanceTo(hit);
                if (hitDist < closestObstructionDist) {
                    closestObstructionDist = hitDist;
                }
            }
        }

        // Check Voxel platforms
        for (let i = 0; i < environment.voxelObjects.length; i++) {
            const voxelObj = environment.voxelObjects[i];
            const hit = this._ray.intersectBox(voxelObj.boundingBox, this._closestPoint);
            
            if (hit !== null) {
                // Ray-march voxel narrow-phase to check if we hit a solid voxel before hitting the player
                const s = voxelObj.voxelScale;
                this._marchPos.copy(hit);
                
                const stepSize = s * 0.5;
                const maxMarch = Math.min(15.0, dist);

                for (let dWalked = 0; dWalked < maxMarch; dWalked += stepSize) {
                    this._localHitPoint.copy(this._marchPos).sub(voxelObj.position);
                    const { x: w, y: h, z: d } = voxelObj.dimensions;
                    const x = Math.round(this._localHitPoint.x / s + (w - 1) * 0.5);
                    const y = Math.round(this._localHitPoint.y / s + (h - 1) * 0.5);
                    const z = Math.round(this._localHitPoint.z / s + (d - 1) * 0.5);

                    if (voxelObj.isSolid(x, y, z)) {
                        const voxelHitDist = eyePos.distanceTo(this._marchPos);
                        if (voxelHitDist < closestObstructionDist) {
                            closestObstructionDist = voxelHitDist;
                        }
                        break;
                    }
                    this._marchPos.addScaledVector(this._toPlayer, stepSize);
                }
            }
        }

        // Clear Line of Sight established if no walls obstruct
        if (closestObstructionDist >= dist) {
            this.hasLoS = true;
            this.lastKnownPlayerPos.copy(playerEye);
        }

        return this.hasLoS;
    }

    patrol(dt) {
        if (this.path.length === 0) return;
        const targetNode = this.path[this.currentWaypointIdx];

        this._wishDir.subVectors(targetNode, this.position);
        this._wishDir.y = 0; 
        const dist = this._wishDir.length();

        if (dist < 0.3) {
            this.currentWaypointIdx = (this.currentWaypointIdx + 1) % this.path.length;
            return;
        }

        this._wishDir.normalize();
        this.velocity.x = this._wishDir.x * this.moveSpeed;
        this.velocity.z = this._wishDir.z * this.moveSpeed;
        this.velocity.y += -24.0 * dt; // Gravity

        this.targetYaw = Math.atan2(-this.velocity.x, -this.velocity.z);
        this.interpolateYaw(dt);
    }

    chase(dt, player, audio, assets) {
        const playerEye = this._temp;
        player.getEyePosition(playerEye);

        this._wishDir.subVectors(playerEye, this.position);
        this._wishDir.y = 0;
        const dist = this._wishDir.length();

        this._wishDir.normalize();

        // Keep dynamic minimum distance (3-5 units)
        const minDistance = 4.0;
        if (dist > minDistance) {
            this.velocity.x = this._wishDir.x * this.chaseSpeed;
            this.velocity.z = this._wishDir.z * this.chaseSpeed;
        } else {
            this.velocity.set(0, 0, 0); // Halt and track player
        }

        this.velocity.y += -24.0 * dt;

        this.targetYaw = Math.atan2(-this._wishDir.x, -this._wishDir.z);
        this.interpolateYaw(dt);

        if (this.shootCooldown > 0) {
            this.shootCooldown -= dt;
        } else {
            this.shoot(player, audio, assets);
            this.shootCooldown = 0.8; 
        }
    }

    search(dt, audio, assets) {
        this._wishDir.subVectors(this.lastKnownPlayerPos, this.position);
        this._wishDir.y = 0;
        const dist = this._wishDir.length();

        if (dist > 0.4) {
            this._wishDir.normalize();
            this.velocity.x = this._wishDir.x * this.moveSpeed;
            this.velocity.z = this._wishDir.z * this.moveSpeed;
            this.targetYaw = Math.atan2(-this._wishDir.x, -this._wishDir.z);
            this.interpolateYaw(dt);
        } else {
            // Reached last known position, look around slowly
            this.velocity.set(0, 0, 0);

            this.lookAroundTimer += dt;
            if (this.lookAroundTimer >= 1.5) {
                this.lookAroundTimer = 0;
                this.targetYaw = this.yaw + (Math.random() - 0.5) * Math.PI; 
            }
            this.interpolateYaw(dt);
        }

        this.velocity.y += -24.0 * dt;

        this.searchTimer += dt;
        if (this.searchTimer >= 5.0) {
            this.state = 'RETURN';
            this.searchTimer = 0;
        }
    }

    goToNearestWaypoint(dt) {
        let nearestIdx = 0;
        let minDist = Infinity;

        for (let i = 0; i < this.path.length; i++) {
            const dist = this.position.distanceTo(this.path[i]);
            if (dist < minDist) {
                minDist = dist;
                nearestIdx = i;
            }
        }

        const targetNode = this.path[nearestIdx];
        this._wishDir.subVectors(targetNode, this.position);
        this._wishDir.y = 0;
        const dist = this._wishDir.length();

        if (dist < 0.3) {
            this.currentWaypointIdx = nearestIdx;
            this.state = 'PATROL';
            return;
        }

        this._wishDir.normalize();
        this.velocity.x = this._wishDir.x * this.moveSpeed;
        this.velocity.z = this._wishDir.z * this.moveSpeed;
        this.velocity.y += -24.0 * dt;

        this.targetYaw = Math.atan2(-this._wishDir.x, -this._wishDir.z);
        this.interpolateYaw(dt);
    }

    interpolateYaw(dt) {
        let diff = this.targetYaw - this.yaw;
        diff = Math.atan2(Math.sin(diff), Math.cos(diff));
        this.yaw += diff * Math.min(1.0, this.rotationSpeed * dt);
    }

    // checks for holes in a voxel floor
    avoidHoles(dt, environment) {
        if (!this.isGrounded) return;
        this._nextPos.copy(this.position).addScaledVector(this.velocity, dt);

        const voxelObj = environment.voxelObjects[0]; // Platform
        if (!voxelObj) return;

        const s = voxelObj.voxelScale;
        const c = voxelObj.position;
        const { x: w, y: h, z: d } = voxelObj.dimensions;

        const lx = this._nextPos.x - c.x;
        const ly = (this._nextPos.y - this.radius - 0.1) - c.y; // Check slightly below feet height
        const lz = this._nextPos.z - c.z;

        const offsetScalarX = (w - 1) * 0.5;
        const x = Math.round(lx / s + offsetScalarX);
        const y = Math.round(ly / s + (h - 1) * 0.5);
        const z = Math.round(lz / s + offsetScalarZ);

        if (x >= 0 && x < w && z >= 0 && z < d) {
            if (!voxelObj.isSolid(x, y, z)) {
                this.velocity.set(0, 0, 0); // Halt forward momentum
                if (this.state === 'PATROL') {
                    this.currentWaypointIdx = (this.currentWaypointIdx + 1) % this.path.length;
                } else {
                    this.state = 'RETURN';
                }
            }
        }
    }

    shoot(player, audio, assets) {
        const eyePos = this._temp;
        eyePos.copy(this.position);
        eyePos.y += this.collisionOffsetY;

        const playerEye = this._toPlayer;
        player.getEyePosition(playerEye);

        this._lookDir.subVectors(playerEye, eyePos).normalize();

        // Inaccurate hitscan: apply 12% random spherical offset
        const spread = 0.12; 
        this._lookDir.x += (Math.random() - 0.5) * spread;
        this._lookDir.y += (Math.random() - 0.5) * spread;
        this._lookDir.z += (Math.random() - 0.5) * spread;
        this._lookDir.normalize();

        // Fire gunshot sfx
        audio.synthesizeBeep(330, 0.05, 'triangle');

        this._ray.set(eyePos, this._lookDir);

        // Check hitscan intersection directly against the player's dynamic Combat Hitbox
        if (this._ray.intersectsBox(player.combatHitbox)) {
            if (player.damageCooldown <= 0) {
                player.health = Math.max(0, player.health - 5); // take damage
                player.damageCooldown = 0.2; // 200ms damage immunity
                audio.synthesizeBeep(100, 0.1, 'sawtooth'); // Pain sound
            }
        }
    }
}