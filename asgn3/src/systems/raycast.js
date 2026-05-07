/**
 * Cast ray to see if a target is hit.
 * We want to transform the ray into an object's local space instead
 * of the its world space. Test each obj with the same local min and
 * max bounds, in this case 0.0 (min) and 1.0 (max) due to how we
 * currently generate the cube's vertices
 * @param {*} mouseBtn pass which mouse button was pressed to handleModes
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
    // setup some variables
    const localMinBounds = [0.0, 0.0, 0.0];
    const localMaxbounds = [1.0, 1.0, 1.0];
    let closestObj = null;
    let maxFPSDistance = 50.0;
    let maxMineDistance = 1.5;
    let closestDistance = (g_playerMode === MINE) ? maxMineDistance : maxFPSDistance;
    let objList = (g_playerMode === MINE) ? g_worldObjs : g_targets;
    // check objects in list
    for (let i = 0; i < objList.length; ++i) {
        let obj = objList[i];

        if (!obj.active) continue;
        else if (g_playerMode === MINE && (obj.type === "target" || obj.type === "hit box")) continue;
        else if (obj.type === "sky") continue;

        // Calculate inverse model matrix of an object
        g_tempInvMat.setInverseOf(
            (g_playerMode === MINE) ? obj.matrix : obj.hitbox.matrix
        );

        g_tempRayOrigin4v.elements[0] = origin[0];
        g_tempRayOrigin4v.elements[1] = origin[1];
        g_tempRayOrigin4v.elements[2] = origin[2];
        g_tempRayOrigin4v.elements[3] = 1.0;
        
        // transform ray origin into local space
        let localOrigin4 = g_tempInvMat.multiplyVector4(g_tempRayOrigin4v, g_tempResult4v);
        let localOrigin = [
            localOrigin4.elements[0], 
            localOrigin4.elements[1], 
            localOrigin4.elements[2]
        ];

        g_tempRayDir4v.elements[0] = direction[0];
        g_tempRayDir4v.elements[1] = direction[1];
        g_tempRayDir4v.elements[2] = direction[2];
        g_tempRayDir4v.elements[3] = 0.0;

        // transform ray direction into local space
        // important to not translate the direction though, set w to 0
        let localDir4 = g_tempInvMat.multiplyVector4(g_tempRayDir4v, g_tempResult4v);
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
 * We must also check if a ray is inside a cube so
 * returning tmin means our ray is outside a cube, return the entry point
 * conversely, tmax means the ray is inside it, return exit point
 * @param {*} origin should be camera's origin
 * @param {*} direction direction vector of the ray
 * @param {*} boxMin min corner of unit cube in local space
 * @param {*} boxMax max corner of unit cube in local space
 * @return null or hit distance along the ray 
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

    // If tmax < 0, box behind us. If tmin > tmax we've missed.
    if (tmax < 0 || tmin > tmax) return null;
    return tmin > 0 ? tmin : tmax;
}

function handleModes(obj, mouseBtn, closestDistance) {
    if (g_playerMode === MINE) {
        // Left click delete block
        if (mouseBtn === 0) {
            if (obj.type === "ground" || obj.type === "rangeWall") return;
            obj.active = false;
        }
        // right click place block
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

/**
 * 
 * @param {*} closestDistance closest distance to player to place block at 
 *                            in direction they're looking at
 */
function placeBlock(closestDistance) {
    g_tempOrigin3v.set(g_camera.eye);
    g_tempDir3v.set(g_camera.at);
    g_tempDir3v.sub(g_tempOrigin3v);
    g_tempDir3v.normalize();

    let spawnDistance = closestDistance - 0.125;
    g_tempDir3v.mul(spawnDistance);

    g_tempHitPoint3v.set(g_tempOrigin3v);
    g_tempHitPoint3v.add(g_tempDir3v);

    let gridSize = g_blockScale;
    let invGridSize = 1 / gridSize;
    let snapToX = Math.floor(g_tempHitPoint3v.elements[0] * invGridSize) * gridSize;
    let snapToY = Math.floor(g_tempHitPoint3v.elements[1] * invGridSize) * gridSize;
    let snapToZ = Math.floor(g_tempHitPoint3v.elements[2] * invGridSize) * gridSize;

    let newCube = new Cube();
    newCube.type = "block";
    newCube.color = [0.8, 0.8, 0.0, 1.0];
    newCube.textureNum = -2;
    newCube.matrix.translate(snapToX, snapToY, snapToZ);
    newCube.matrix.scale(g_blockScale, g_blockScale, g_blockScale);
    g_worldObjs.push(newCube);
}
