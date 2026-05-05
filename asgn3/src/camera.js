class Camera {
    constructor() {
        this.fov = 60;
        this.eye = new Vector3([0.0, 0.5, 0.0]);
        this.at = new Vector3([0.0, 0.5, -1.0]);
        this.up = new Vector3([0.0, 1.0, 0.0]);
        this.viewMatrix = new Matrix4();
        this.projectionMatrix = new Matrix4();
        this.speed = g_defaultCamSpeed;
        this.rotSpeed = g_defaultCamRotSpeed;
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
            0.1, 1250
        );
    }

    moveCamera(keys) {
        this.forwardVec.set(this.at);
        this.forwardVec.sub(this.eye);
        
        if (!g_noclip) this.forwardVec.elements[1] = 0.0;
        this.forwardVec.normalize();

        this.movementVec.elements[0] = 0;
        this.movementVec.elements[1] = 0;
        this.movementVec.elements[2] = 0;

        if (g_keys["w"]) {
            this.movementVec.add(this.forwardVec);
        } 
        if (g_keys["a"]) {
            // let left = Vector3.cross(this.up, this.forwardVec);
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
            // let right = Vector3.cross(this.up, this.forwardVec);
            this.tempVec.cross(this.up, this.forwardVec);
            this.tempVec.normalize();
            this.tempVec.mul(-1);
            this.movementVec.add(this.tempVec);
        }

        this.movementVec.normalize(); // movement length to 1
        this.movementVec.mul(this.speed); // apply cam speed
        // update global eye and at vec3s
        this.eye.add(this.movementVec);
        this.at.add(this.movementVec);
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
}

function rayCast(ev) {
    const rect = canvas.getBoundingClientRect();
    const x = ev.clientX - rect.left;
    const y = ev.clientY - rect.top;

    // Coudld be used if mouse isn't locked
    // const xNDC = (x / canvas.width) * 2.0 - 1.0;
    // const yNDC = 1.0 - (y / canvas.height) * 2.0;
    // x and y fixed b/c of locking mouse
    const xNDC = 0.0;
    const yNDC = 0.0;

    const { origin, direction } = calculateRay(xNDC, yNDC);
    console.log("Ray origin: ", origin, " Ray direction: ", direction);
}

function calculateRay(xNDC, yNDC) {
    const projMat = g_camera.projectionMatrix;
    const viewMat = g_camera.viewMatrix;

    const vpMat = new Matrix4().set(projMat).multiply(viewMat);
    const invVP = new Matrix4().setInverseOf(vpMat);

    const nearPoint = invVP.multiplyVector4(new Vector4([xNDC, yNDC, -1, 1]));
    const farPoint = invVP.multiplyVector4(new Vector4([xNDC, yNDC, 1, 1]));

    // Calculate the world-space coordinates by dividing x, y, and z by w
    const nearWorld = new Vector3([
      nearPoint.elements[0] / nearPoint.elements[3],
      nearPoint.elements[1] / nearPoint.elements[3],
      nearPoint.elements[2] / nearPoint.elements[3]
    ]);
    
    const farWorld = new Vector3([
      farPoint.elements[0] / farPoint.elements[3],
      farPoint.elements[1] / farPoint.elements[3],
      farPoint.elements[2] / farPoint.elements[3]
    ]);
    
    const direction = new Vector3(farWorld.elements).sub(nearWorld);
    direction.normalize();
    const origin = getOrigin(viewMat);
    return { origin, direction };
}

// helper function to get camera origin
function getOrigin(viewMat) {
    const invView = new Matrix4().setInverseOf(viewMat);
    const pos = invView.multiplyVector4(new Vector4([0, 0, 0, 1]));
    console.log(pos);
    return [pos.elements[0], pos.elements[1], pos.elements[2]];
}
