/**
 * cast ray to see if a target (sphere) is hit
 */
function rayCast(mouseBtn) {
    
    let forwardVec = new Vector3();
    forwardVec.set(g_camera.at);
    forwardVec.sub(g_camera.eye);
    forwardVec.normalize();
    
    const direction = [
        forwardVec.elements[0],
        forwardVec.elements[1],
        forwardVec.elements[2]
    ]

    const origin = [
        g_camera.eye.elements[0],
        g_camera.eye.elements[1],
        g_camera.eye.elements[2]
    ];
    
    const localMinBounds = [0.0, 0.0, 0.0];
    const localMaxbounds = [1.0, 1.0, 1.0];
    
    let closestObj = null;

    let maxFPSDistance = 50.0;
    let maxMineDistance = 1.5;
    let closestDistance = (g_playerMode === MINE) ? maxMineDistance : maxFPSDistance;
    let objList = (g_playerMode === MINE) ? g_worldObjs : g_targets;

    for (let i = 0; i < objList.length; ++i) {
        let obj = objList[i];

        if (!obj.active) continue;
        else if (g_playerMode === MINE && (obj.type === "target" || obj.type === "hit box")) continue;
        else if (obj.type === "sky") continue;

        // Calculate inverse model matrix of an object
        let invMat = new Matrix4().setInverseOf(
            (g_playerMode === MINE) ? obj.matrix : obj.hitbox.matrix
        );
        
        // transform ray origin into local space
        let localOrigin4 = invMat.multiplyVector4(new Vector4([
            origin[0], origin[1], origin[2], 1.0
        ]));
        let localOrigin = [
            localOrigin4.elements[0], 
            localOrigin4.elements[1], 
            localOrigin4.elements[2]
        ];

        // transform ray direction into local space
        let localDir4 = invMat.multiplyVector4(new Vector4([
            direction[0], direction[1], direction[2], 0.0
        ]));
        let localDir = [
            localDir4.elements[0], 
            localDir4.elements[1], 
            localDir4.elements[2]
        ];

        // Check intersection
        let hitDistance = intersectRayAABB(localOrigin, localDir, localMinBounds, localMaxbounds);

        if (hitDistance !== null && hitDistance < closestDistance) {
            closestDistance = hitDistance;
            closestObj = obj;
        }
    }

    if (closestObj) {
        // console.log("Objct Hit: ", closestObj.type, " distance: ", closestDistance);
        handleModes(closestObj, mouseBtn, closestDistance);
    } else {
        // console.log("No hit");
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

function handleModes(obj, mouseBtn, closestDistance) {
    if (g_playerMode === MINE) {
        if (mouseBtn === 0) {
            if (obj.type === "ground" || obj.type === "rangeWall") return;
            obj.active = false;
        }
        else if (mouseBtn === 2) {
            placeBlock(closestDistance);
        };
    } else if (g_playerMode === FPS) {
        if (mouseBtn === 0) {
            obj.active = false;
            obj.tod = g_seconds;
            if (obj.hitbox) {
                obj.hitbox.active = false;
            }
            hitEvent();
        }
    } else {
        console.warn("Error: unrecognized mode", g_playerMode);
    };
}

function placeBlock(closestDistance) {
    let origin = new Vector3(g_camera.eye.elements);
    let direction = new Vector3();
    direction.set(g_camera.at);
    direction.sub(origin);
    direction.normalize();

    let spawnDistance = closestDistance - 0.125;
    direction.mul(spawnDistance);

    let hitPoint = new Vector3(origin.elements);
    hitPoint.add(direction);

    let gridSize = g_blockScale;
    let invGridSize = 1 / gridSize;
    let snapToX = Math.floor(hitPoint.elements[0] * invGridSize) * gridSize;
    let snapToY = Math.floor(hitPoint.elements[1] * invGridSize) * gridSize;
    let snapToZ = Math.floor(hitPoint.elements[2] * invGridSize) * gridSize;

    let newCube = new Cube();
    newCube.type = "block";
    newCube.color = [0.8, 0.8, 0.0, 1.0];
    newCube.textureNum = -2;
    newCube.matrix.translate(snapToX, snapToY, snapToZ);
    newCube.matrix.scale(g_blockScale, g_blockScale, g_blockScale);
    g_worldObjs.push(newCube);
}
