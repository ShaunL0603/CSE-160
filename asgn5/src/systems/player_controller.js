import * as THREE from 'three';

export class PlayerController {
    constructor() {
        // Player spatial properties, track feet on ground
        this.position = new THREE.Vector3(0, 0, 5);
        this.prevPosition = new THREE.Vector3(0, 0, 5);
        this.velocity = new THREE.Vector3(0, 0, 0);

        // eye-height
        this.eyeHeight = 1.6;
        this.prevEyeHeight = 1.6;

        // Angle states in Radians (Camera orientation tracker)
        this.pitch = 0; // Look up/down
        this.prevPitch = 0;
        this.yaw = 0;   // Look left/right
        this.prevYaw = 0;

        // Kinematics Configuration
        this.moveSpeed = 6.0;
        this.noclipSpeed = 12.0;
        this.gravity = -24.0;
        this.jumpImpulse = 8.5;
        this.isNoclip = false;

        this.bounds = {
            floorY: 0.0,
            limitXZ: 24.0
        };

        this.isGrounded = true;

        // Pre-allocated Vector3s
        this._forward = new THREE.Vector3();
        this._right = new THREE.Vector3();
        this._wishDir = new THREE.Vector3();
        this._temp = new THREE.Vector3();
    }

    savePreviousState() {
        this.prevPosition.copy(this.position);
        this.prevPitch = this.pitch;
        this.prevYaw = this.yaw;
        this.prevEyeHeight = this.eyeHeight;
    }

    getEyePosition(outVector) {
        outVector.copy(this.position);
        outVector.y += this.eyeHeight;
    }

    getLookDirection(outVector) {
        outVector.set(
            -Math.sin(this.yaw) * Math.cos(this.pitch),
            Math.sin(this.pitch),
            -Math.cos(this.yaw) * Math.cos(this.pitch)
        ).normalize();
    }

    update(dt, input) {
        // Handle noclip toggle state transitions
        if (input.noclipTriggered) {
            this.isNoclip = !this.isNoclip;
            this.velocity.set(0, 0, 0); // Reset forces
        }

        // Process Rotation via Accumulated Mouse Delta
        const mouseSensitivity = 0.002;
        this.yaw -= input.mouseDelta.x * mouseSensitivity;
        this.pitch -= input.mouseDelta.y * mouseSensitivity;

        // Clamp camera pitch looking up/down to avoid screen flipping (approx. 85 degrees)
        const pitchLimit = (Math.PI * 0.5) - 0.08;
        this.pitch = Math.max(-pitchLimit, Math.min(pitchLimit, this.pitch));

        const targetEyeHeight = input.state.crouch ? 0.8 : 1.6;

        const croutchTransitionSpeed = 14.0;
        this.eyeHeight = THREE.MathUtils.lerp(this.eyeHeight, targetEyeHeight, croutchTransitionSpeed * dt);

        // Select Kinematic Mode
        if (this.isNoclip) {
            this.applyNoclipMovement(dt, input);
        } else {
            this.applyNormalMovement(dt, input);
        }
    }

    applyNormalMovement(dt, input) {
        // Calculate forward and right directions parallel to the ground (XZ plane)
        this._forward.set(-Math.sin(this.yaw), 0, -Math.cos(this.yaw)).normalize();
        this._right.set(Math.cos(this.yaw), 0, -Math.sin(this.yaw)).normalize();

        // Build wish direction vector
        this._wishDir.set(0, 0, 0);
        if (input.state.forward)  this._wishDir.add(this._forward);
        if (input.state.backward) this._wishDir.sub(this._forward);
        if (input.state.right)    this._wishDir.add(this._right);
        if (input.state.left)     this._wishDir.sub(this._right);
        this._wishDir.normalize();

        // Calculate horizontal speed
        const speed = input.state.crouch ? this.moveSpeed * 0.5 : this.moveSpeed;
        this.velocity.x = this._wishDir.x * speed;
        this.velocity.z = this._wishDir.z * speed;

        // Apply environment gravity
        if (!this.isGrounded) {
            this.velocity.y += this.gravity * dt;
        } else {
            this.velocity.y = 0;
            // Jump execution
            if (input.state.jump) {
                this.velocity.y = this.jumpImpulse;
                this.isGrounded = false;
            }
        }

        // Apply physical delta translations
        this._temp.copy(this.velocity).multiplyScalar(dt);
        this.position.add(this._temp);

        // Simple world boundary collisions
        if (this.position.y <= this.bounds.floorY) {
            this.position.y = this.bounds.floorY;
            this.velocity.y = 0;
            this.isGrounded = true;
        }

        // Level boundary clamps (stop player from falling off platform)
        this.position.x = Math.max(-this.bounds.limitXZ, Math.min(this.bounds.limitXZ, this.position.x));
        this.position.z = Math.max(-this.bounds.limitXZ, Math.min(this.bounds.limitXZ, this.position.z));
    }

    applyNoclipMovement(dt, input) {
        // Build wish direction using full 3D pitch/yaw coordinates
        this._forward.set(
            -Math.sin(this.yaw) * Math.cos(this.pitch),
            Math.sin(this.pitch),
            -Math.cos(this.yaw) * Math.cos(this.pitch)
        ).normalize();

        this._right.set(Math.cos(this.yaw), 0, -Math.sin(this.yaw)).normalize();

        this._wishDir.set(0, 0, 0);
        if (input.state.forward)  this._wishDir.add(this._forward);
        if (input.state.backward) this._wishDir.sub(this._forward);
        if (input.state.right)    this._wishDir.add(this._right);
        if (input.state.left)     this._wishDir.sub(this._right);

        this._wishDir.normalize();

        // Fly direct kinematic translation
        this.velocity.copy(this._wishDir).multiplyScalar(this.noclipSpeed);
        
        this._temp.copy(this.velocity).multiplyScalar(dt);
        this.position.add(this._temp);

        this.isGrounded = false; // player falls back down if exiting noclip
    }
}