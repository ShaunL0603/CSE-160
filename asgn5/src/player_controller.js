import * as THREE from 'three';

export class PlayerController {
    constructor(baseFOV) {
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

        this.fov = baseFOV;
        this.prevFOV = baseFOV;

        // logic states
        this.isCrouched = false;
        this.isSprinting = false;
        this.isADS = false;
        this.isGrounded = true;
        this.isNoclip = false;

        // Kinematics Configuration
        this.moveSpeed = 6.0;
        this.noclipSpeed = 12.0;
        this.gravity = -24.0;
        this.jumpImpulse = 8.5;

        this.bounds = {
            floorY: 0.0,
            limitXZ: 24.0
        };


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
        this.prevFOV = this.fov;
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

    update(dt, input, config) {
        // Handle noclip toggle state transitions
        if (input.triggers.noclip) {
            this.isNoclip = !this.isNoclip;
            this.velocity.set(0, 0, 0); // Reset forces
        }

        // toggles or holding button
        if (config.controls.toggleCrouch) {
            if (input.triggers.crouch) this.isCrouched = !this.isCrouched;
        } else {
            this.isCrouched = input.state.crouch;
        }
        if (config.controls.toggleSprint) {
            if (input.triggers.sprint) this.isSprinting = !this.isSprinting;
        } else {
            this.isSprinting = input.state.sprint;
        }

        this.isADS = input.state.ads;
        // FOV zoom
        const targetFOV = this.isADS ? config.camera.baseFOV / 1.5 : config.camera.baseFOV;
        const zoomSpeed = 15.0;
        this.fov = THREE.MathUtils.lerp(this.fov, targetFOV, zoomSpeed * dt);

        // mouse sens
        const fovRatio = this.fov / config.camera.baseFOV;
        let currentSensX = config.controls.sensX * fovRatio;
        let currentSensY = config.controls.sensY * fovRatio;

        if (this.isADS) { 
            currentSensX *= config.controls.adsSensMultiplier;
            currentSensY *= config.controls.adsSensMultiplier;
        }

        // Process Rotation via Accumulated Mouse Delta
        // base multi (0.005) keeping 0-1 slider range feeling normal
        this.yaw -= input.mouseDelta.x * currentSensX * 0.005;
        this.pitch -= input.mouseDelta.y * currentSensY * 0.005;

        // Clamp camera pitch looking up/down to avoid screen flipping (approx. 85 degrees)
        const pitchLimit = (Math.PI * 0.5) - 0.08;
        this.pitch = Math.max(-pitchLimit, Math.min(pitchLimit, this.pitch));

        const targetEyeHeight = this.isCrouched ? 0.8 : 1.6;
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
        let currentSpeed = this.moveSpeed;
        if (this.isCrouched && this.isSprinting) {
            currentSpeed = this.moveSpeed * 0.75;
        } else if (this.isCrouched) {
            currentSpeed = this.moveSpeed * 0.5;
        } else if (this.isSprinting) {
            currentSpeed = this.moveSpeed * 1.5;
        }
        this.velocity.x = this._wishDir.x * currentSpeed;
        this.velocity.z = this._wishDir.z * currentSpeed;

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

    reset(baseFOV) {
        this.position.set(0, 0, 5);
        this.prevPosition.set(0, 0, 5);
        this.velocity.set(0, 0, 0);
        
        this.pitch = 0;
        this.prevPitch = 0;
        this.yaw = 0;
        this.prevYaw = 0;

        this.fov = baseFOV;
        this.prevFOV = baseFOV;

        this.isCrouched = false;
        this.isSprinting = false;
        this.isADS = false;
        this.isNoclip = false;
        this.isGrounded = true;   
    }
}