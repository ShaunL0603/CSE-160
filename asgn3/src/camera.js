class Camera {
    constructor() {
        this.fov = 60;
        this.eye = new Vector3([0.0, 0.0, 0.0]);
        this.at = new Vector3([0.0, 0.0, -1.0]);
        this.up = new Vector3([0.0, 1.0, 0.0]);
        this.viewMatrix = new Matrix4();
        this.projectionMatrix = new Matrix4();
        this.speed = 0.01;
        this.rotSpeed = 0.05;
        this.yaw = 270.0;
        this.pitch = 0.0;
        this.canvasWidth = 400.0;
        this.canvasHeight = 400.0;
    }

    updateMatrices() {
        this.viewMatrix.setLookAt(
            this.eye.elements[0], this.eye.elements[1], this.eye.elements[2],
            this.at.elements[0], this.at.elements[1], this.at.elements[2],
            this.up.elements[0], this.up.elements[1], this.up.elements[2]
        )

        this.projectionMatrix.setPerspective(this.fov, this.canvasWidth / this.canvasHeight, 
            0.1, 1000
        );
    }

    moveCamera(keys) {
        let f = new Vector3();
        f.set(this.at);
        f.sub(this.eye);
        f.normalize();

        let m = new Vector3();
        if (g_keys["w"]) {
            m.add(f);
        } 
        if (g_keys["a"]) {
            let left = Vector3.cross(this.up, f);
            left.normalize  ();
            m.add(left);
        } 
        if (g_keys["s"]) {
            let back = new Vector3();
            back.set(f);
            back.mul(-1);
            m.add(back);
        } 
        if (g_keys["d"]) {
            let right = Vector3.cross(this.up, f);
            right.normalize();
            right.mul(-1);
            m.add(right);
        }

        m.normalize(); // movement length to 1
        m.mul(this.speed); // apply cam speed
        // update global eye and at vec3s
        this.eye.add(m);
        this.at.add(m);
        this.updateMatrices();
    }

    panCamera(movementX, movementY) {
        this.yaw -= movementX * this.rotSpeed;
        this.pitch -= movementY * this.rotSpeed;
        
        // avoid parallel with up vector
        if (this.pitch > 89.0) this.pitch = 89.0;
        if (this.pitch < -89.0) this.pitch = -89.0;
        
        // degrees to radians
        let yawRadians =  this.yaw * Math.PI / 180;
        let pitchRadians =  this.pitch * Math.PI / 180;
        
        let d = new Vector3();
        let rho = 1.0;
        // Polar coordinates to cartesian
        d.elements[0] = rho * Math.cos(pitchRadians) * Math.cos(yawRadians); // new x
        d.elements[1] = rho * Math.sin(pitchRadians);                        // new y
        d.elements[2] = rho * Math.cos(pitchRadians) * Math.sin(yawRadians); // new z
        
        let newAt = new Vector3();
        newAt.set(this.eye);
        newAt.add(d);
        this.at = newAt;
        this.updateMatrices();
    }
}
