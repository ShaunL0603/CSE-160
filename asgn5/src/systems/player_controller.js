import * as THREE from 'three';

export class PlayerController {
    constructor() {
        // Player spatial properties
        this.position = new THREE.Vector3(0, 1.6, 5); // Start at standard head height (1.6m)
        this.prevPosition = new THREE.Vector3(0, 1.6, 5);
        this.velocity = new THREE.Vector3(0, 0, 0);

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

        // Player physics geometry bounds (simple head box boundaries)
        this.bounds = {
            width: 1.0,
            depth: 1.0,
            floorY: 0.0,
            maxY: 20.0,
            limitXZ: 24.0 // Invisible level borders at +/- 24 units
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
        const pitchLimit = Math.PI / 2 - 0.08;
        this.pitch = Math.max(-pitchLimit, Math.min(pitchLimit, this.pitch));

        // Select Kinematic Mode
        if (this.isNoclip) {
            this.isGrounded = false; // player falls back down if exiting noclip
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
        const targetEyeY = input.state.crouch ? 0.8 : 1.6;
        if (this.position.y <= this.bounds.floorY + targetEyeY) {
            this.position.y = this.bounds.floorY + targetEyeY;
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
    }

    getLookDirection(outVector) {
        outVector.set(
            -Math.sin(this.yaw) * Math.cos(this.pitch),
            Math.sin(this.pitch),
            -Math.cos(this.yaw) * Math.cos(this.pitch)
        ).normalize();
    }
}