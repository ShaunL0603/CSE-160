class Camera {
    constructor() {
        this.fov = 60;
        this.eye = new Vector3([0.0, 0.5, 0.0]);
        this.at = new Vector3([0.0, 0.5, -1.0]);
        this.up = new Vector3([0.0, 1.0, 0.0]);
        this.viewMatrix = new Matrix4();
        this.projectionMatrix = new Matrix4();
        this.inverseMat = new Matrix4();
        this.speed = g_camSpeed;
        this.rotSpeed = 0.05;
        this.yaw = 270.0;
        this.pitch = 0.0;
        this.canvasWidth = 400.0;
        this.canvasHeight = 400.0;
        this.forwardVec = new Vector3();
        this.movementVec = new Vector3();
        this.dirVec = new Vector3();
        this.tempVec = new Vector3(); // used for moveCamera method
    }

    updateMatrices() {
        this.viewMatrix.setLookAt(
            this.eye.elements[0], this.eye.elements[1], this.eye.elements[2],
            this.at.elements[0], this.at.elements[1], this.at.elements[2],
            this.up.elements[0], this.up.elements[1], this.up.elements[2]
        )

        this.projectionMatrix.setPerspective(this.fov, this.canvasWidth / this.canvasHeight, 
            0.1, 2000
        );
    }

    // Helper for collision check, multiplies a Mat4 by a 3D point
    multiplyMatrixAndPoint(matrix, point) {
        let e = matrix.elements;
        let x = point[0], y = point[1], z = point[2];
        let rx = e[0]*x + e[4]*y + e[8]*z + e[12];
        let ry = e[1]*x + e[5]*y + e[9]*z + e[13];
        let rz = e[2]*x + e[6]*y + e[10]*z + e[14];
        return [rx, ry, rz];
    }

    // Checks collision against g_worldObjs
    checkCollision(x, y, z) {
        let buffer = 0.2; // Hitbox radius for the player
        let pWorld = [x, y, z]; // next world position

        // Loop through world objects to check collisions
        for (let i = 0; i < g_worldObjs.length; i++) {
            let obj = g_worldObjs[i];

            // check collisions for specific objects
            if (obj.type !== "rangewall" && obj.type !== "cube" && 
                obj.type !== "sphere" && obj.type !== "customModel") 
            {
                continue;
            }

            if (obj.type === "customModel" && obj.hitbox === undefined) continue;

            // Skip deactivated objects
            if (obj.active === false) continue;

            // Get Inverse Matrix to convert world coords to local object coords
            this.inverseMat.setInverseOf(obj.matrix);

            // Transform next cam position into the object's local space
            let pLocal = this.multiplyMatrixAndPoint(this.inverseMat, pWorld);
            let cLocal = [0, 0, 0];

            // 3. Find the closest point on the object to the camera in local space
            if (obj.type === "sphere") {
                // Spheres are radius 1, spanning -1 to 1
                let dist = Math.sqrt(pLocal[0]*pLocal[0] + pLocal[1]*pLocal[1] + pLocal[2]*pLocal[2]);
                if (dist > 1.0) {
                    cLocal[0] = pLocal[0] / dist;
                    cLocal[1] = pLocal[1] / dist;
                    cLocal[2] = pLocal[2] / dist;
                } else {
                    cLocal[0] = pLocal[0];
                    cLocal[1] = pLocal[1];
                    cLocal[2] = pLocal[2];
                }
            } else {
                // Cubes span exactly 0.0 to 1.0 on all axes
                cLocal[0] = Math.max(0.0, Math.min(1.0, pLocal[0]));
                cLocal[1] = Math.max(0.0, Math.min(1.0, pLocal[1]));
                cLocal[2] = Math.max(0.0, Math.min(1.0, pLocal[2]));
            }

            // Transform that closest local point back to world space
            let cWorld = this.multiplyMatrixAndPoint(obj.matrix, cLocal);

            // Check the distance from the closest point to the camera
            let dx = pWorld[0] - cWorld[0];
            let dy = pWorld[1] - cWorld[1];
            let dz = pWorld[2] - cWorld[2];
            let distToClosestPoint = Math.sqrt(dx*dx + dy*dy + dz*dz);

            // If distance is less than our 0.2 buffer, we've hit something
            if (distToClosestPoint < buffer) {
                return true; 
            }
        }
        return false; 
    }

    moveCamera(keys) {
        this.forwardVec.set(this.at);
        this.forwardVec.sub(this.eye);
        this.forwardVec.normalize();
        
        this.movementVec.elements[0] = 0;
        this.movementVec.elements[1] = 0;
        this.movementVec.elements[2] = 0;

        if (g_keys["w"]) {
            this.movementVec.add(this.forwardVec);
        } 
        if (g_keys["a"]) {
            this.tempVec.cross(this.up, this.forwardVec);
            this.tempVec.normalize();
            this.movementVec.add(this.tempVec);
        } 
        if (g_keys["s"]) {
            this.tempVec.set(this.forwardVec);
            this.tempVec.mul(-1);
            this.movementVec.add(this.tempVec);
        } 
        if (g_keys["d"]) {
            this.tempVec.cross(this.up, this.forwardVec);
            this.tempVec.normalize();
            this.tempVec.mul(-1);
            this.movementVec.add(this.tempVec);
        }
        
        if (!g_noclip) this.movementVec.elements[1] = 0.0;

        this.movementVec.normalize(); // movement length to 1
        this.movementVec.mul(this.speed); // apply cam speed

        // sliding if colliding logic
        // get intended movement
        let moveX = this.movementVec.elements[0];
        let moveY = this.movementVec.elements[1];
        let moveZ = this.movementVec.elements[2];

        // Store cam's current position
        let cx = this.eye.elements[0];
        let cy = this.eye.elements[1];
        let cz = this.eye.elements[2];
        
        // Check each axis independently for sliding
        if (!this.checkCollision(cx + moveX, cy, cz)) {
            cx += moveX;
        }
        if (!this.checkCollision(cx, cy + moveY, cz)) {
            cy += moveY;
        }
        if (!this.checkCollision(cx, cy, cz + moveZ)) {
            cz += moveZ;
        }

        // Calculate actual translation applied after collisions
        let actualMoveX = cx - this.eye.elements[0];
        let actualMoveY = cy - this.eye.elements[1];
        let actualMoveZ = cz - this.eye.elements[2];

        // Update global eye vectors
        if (!g_noclip) {
            this.eye.elements[0] = cx;
            this.eye.elements[1] = cy;
            this.eye.elements[2] = cz;

            // Apply exact same translation to the 'at' vector to maintain look direction
            this.at.elements[0] += actualMoveX;
            this.at.elements[1] += actualMoveY;
            this.at.elements[2] += actualMoveZ;
        } else {
            this.eye.add(this.movementVec);
            this.at.add(this.movementVec);
        }

        this.updateMatrices();
    }

    panCamera(movementX, movementY) {
        this.yaw -= movementX * this.rotSpeed;
        this.pitch -= movementY * this.rotSpeed;
        
        // avoid parallel with up vector
        if (this.pitch > 89.0) this.pitch = 89.0;
        if (this.pitch < -89.0) this.pitch = -89.0;
        
        // degrees to radians
        let yawRadians =  this.yaw * degToRad;
        let pitchRadians =  this.pitch * degToRad;
        
        // Polar coordinates to cartesian
        this.dirVec.elements[0] = Math.cos(pitchRadians) * Math.cos(yawRadians); // new x
        this.dirVec.elements[1] = Math.sin(pitchRadians);                        // new y
        this.dirVec.elements[2] = Math.cos(pitchRadians) * Math.sin(yawRadians); // new z
        
        this.at.set(this.eye);
        this.at.add(this.dirVec);
        this.updateMatrices();
    }

    resetHeight(height) {
        let heightDiff = height - this.eye.elements[1];
        this.eye.elements[1] = height;
        this.at.elements[1] += heightDiff;
        this.updateMatrices();
    }

    recenterCamera() {
        // set back to world origin as default
        this.eye.elements[0] = 0.0;
        this.eye.elements[1] = 0.5;
        this.eye.elements[2] = 0.0;

        this.at.elements[0] = 0.0;
        this.at.elements[1] = 0.5;
        this.at.elements[2] = -1.0;

        this.yaw = 270.0;
        this.pitch = 0.0;

        this.updateMatrices();
    }
}