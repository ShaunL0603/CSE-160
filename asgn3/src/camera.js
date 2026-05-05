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

function rayCast() {
    const origin = [
        g_camera.eye.elements[0],
        g_camera.eye.elements[1],
        g_camera.eye.elements[2]
    ];

    let forwardVec = new Vector3();
    forwardVec.set(g_camera.at);
    forwardVec.sub(g_camera.eye);
    forwardVec.normalize();

    const direction = [
        forwardVec.elements[0],
        forwardVec.elements[1],
        forwardVec.elements[2]
    ]

    const localMinBounds = [0.0, 0.0, 0.0];
    const localMaxbounds = [1.0, 1.0, 1.0];
    
    let closestObj = null;
    let closestDistance = Infinity;

    for (let i = 0; i < g_worldObjs.length; ++i) {
        let obj = g_worldObjs[i];
        // console.log("Object type:", obj.type, " Object: ", obj);

        // Calculate inverse model matrix of a cube
        let invMat = new Matrix4().setInverseOf(obj.matrix);
        
        // transform ray origin into local space
        let localOrigin4 = invMat.multiplyVector4(new Vector4([
            origin[0], origin[1], origin[2], 1.0
        ]));
        let localOrigin = [
            localOrigin4.elements[0], 
            localOrigin4.elements[1], 
            localOrigin4.elements[2]
        ];
        // console.log("local origin:", localOrigin);

        // transform ray direction into local space
        let localDir4 = invMat.multiplyVector4(new Vector4([
            direction[0], direction[1], direction[2], 0.0
        ]));
        let localDir = [
            localDir4.elements[0], 
            localDir4.elements[1], 
            localDir4.elements[2]
        ];
        // console.log("local direction:", localDir);

        // Check intersection
        let hitDistance = intersectRayAABB(localOrigin, localDir, localMinBounds, localMaxbounds);
        // console.log("calculate hit distance:", hitDistance);

        if (hitDistance !== null && hitDistance < closestDistance) {
            closestDistance = hitDistance;
            closestObj = obj;
        }
    }

    if (closestObj) {
        console.log("Objct Hit: ", closestObj.type, " distance: ", closestDistance);
    } else {
        console.log("No hit");
    }
}

/** 
 * Using slab method
 * Check if a ray intersects an Axis-Aligned Bounding Box (AABB)
 */
function intersectRayAABB(origin, direction, boxMin, boxMax) {
    const invD = [
        1.0 / direction[0],
        1.0 / direction[1],
        1.0 / direction[2]
    ];

    let t0 = (boxMin[0] - origin[0]) * invD[0];
    let t1 = (boxMax[0] - origin[0]) * invD[0];
    let tmin = Math.min(t0, t1);
    let tmax = Math.max(t0, t1);

    t0 = (boxMin[1] - origin[1]) * invD[1];
    t1 = (boxMax[1] - origin[1]) * invD[1];
    tmin = Math.max(tmin, Math.min(t0, t1));
    tmax = Math.min(tmax, Math.max(t0, t1));

    t0 = (boxMin[2] - origin[2]) * invD[2];
    t1 = (boxMax[2] - origin[2]) * invD[2];
    tmin = Math.max(tmin, Math.min(t0, t1));
    tmax = Math.min(tmax, Math.max(t0, t1));

    // If tmax < 0, box behind us. If tmin > tmax we'vr missed.
    if (tmax < 0 || tmin > tmax) return null;

    return tmin > 0 ? tmin : tmax;
}
