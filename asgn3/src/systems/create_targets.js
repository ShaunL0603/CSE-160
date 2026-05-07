// --- File with functions to create targets in shooting range ---


/**
 * Main function to create targets in world
 * @param {*} pos takes in a position array for target to spawn at
 */
function createTarget(pos) {
    var target = new Sphere();
    target.type = "target";
    target.color = [1.0, 0.0, 0.0, 1.0];
    target.textureNum = -2;
    target.pos = pos;
    target.baseMatrix = new Matrix4();
    target.baseMatrix.translate(pos[0], pos[1], pos[2]);
    target.matrix = new Matrix4(target.baseMatrix);
    target.matrix.scale(g_targetSize, g_targetSize, g_targetSize);
    
    var targetHitBox = new Cube();
    targetHitBox.type = "hit box";
    targetHitBox.color = [1.0, 1.0, 0.0, (g_hitboxVisible) ? 1.0 : 0.0];
    targetHitBox.textureNum = -2;
    target.hitbox = targetHitBox;
    updateHitBox(target);

    g_targets.push(target);
    g_worldObjs.push(target);
    g_worldObjs.push(targetHitBox);
}

/**
 * function to create all targets on screen in RANGE map
 * saves target in global targets and worldObjs lists
 * target hit box also saved in global worldObjs list
 */
function createTargetsForRange() {
    let  safeDistance = g_targetSize * 3.0;

    for (let i = 0; i < g_maxTargets; ++i) {
        // find a position to spawn the target
        let pos = findValidTargetPos(safeDistance);
        createTarget(pos);
    }
}

function createTargetsForRandMap() {
    let currMapSize = g_map.length;
    let cubeSize = 0.25;
    let recenter = currMapSize * 0.25 * 0.5;
    let validTiles = [];

    // Find all floor tiles
    for (let x = 0; x < currMapSize; ++x) {
        for (let z = 0; z < currMapSize; ++z) {
            if (g_map[x][z] === 0 || g_map[x][z] === 2) {
                validTiles.push({x: x, z: z});
            }
        }
    }

    // Spawn up to g_maxTargets
    let targetsToSpawn = Math.min(g_maxTargets, validTiles.length);
    for (let i = 0; i < targetsToSpawn; ++i) {
        let randIdx = Math.floor(Math.random() * validTiles.length);
        let tile = validTiles[randIdx];
        
        // Remove the tile from the list so two targets don't spawn in the exact same spot
        validTiles.splice(randIdx, 1); 

        let tileX = (tile.x * cubeSize) - recenter;
        let tileZ = (tile.z * cubeSize) - recenter;
        createTarget([tileX, 0.5, tileZ]);
    }
}

/**
 * helper function to handle the respawning events for target
 * after being hit. 
 */
function handleRespawning() {
    for (let i = 0; i < g_targets.length; ++i) {
        let t = g_targets[i];
        
        if (!t.active) {
            let timeSinceDeath = g_seconds - t.tod;
            if (timeSinceDeath >= t.respawnDelay) {
                let pos;
                if (g_currMap === RANGE) {
                    // Find safe distance to spawn so targets don't collide
                    let safeDistance = g_targetSize * 3.0;
                    pos = findValidTargetPos(safeDistance);
                } else if (g_currMap === RANDOM) {
                    pos = findRandValidFloorPos();
                }

                t.pos = pos;
                t.baseMatrix.setIdentity();
                t.baseMatrix.translate(pos[0], pos[1], pos[2]);
                t.matrix.set(t.baseMatrix);
                t.matrix.scale(g_targetSize, g_targetSize, g_targetSize);
                updateHitBox(t);
                
                t.active = true;
                if (t.hitbox) {
                    t.hitbox.active = true;
                }
            }
        }
    }
}

/**
 * Helper function to get a random position to spawn a target at
 * @param {*} minDistance minimum distance a target can spawn at
 * @returns XYZ position array
 */
function findValidTargetPos(minDistance) {
    let maxAttempts = 27;

    for (let a = 0; a < maxAttempts; ++a) {
        let x = (Math.random() * 9.0) - 4.5;
        let y = (Math.random() * 4.0) + 0.5;
        let z = (Math.random() * 4.0) - 9.0;

        let isValid = true;
        for (let i = 0; i < g_targets.length; ++i) {
            var t = g_targets[i];
            if (!t.active || !t.pos) continue;

            let dx = x - t.pos[0];
            let dy = y - t.pos[1];
            let dz = z - t.pos[2];
            let distance = Math.sqrt(dx*dx + dy*dy + dz*dz);

            if (distance < minDistance) {
                isValid = false;
                break;
            }
        }

        if (isValid) return [x, y, z];
    }

    // just give a random point if too many attempts were made
    return [(Math.random() * 9.0) - 4.5, (Math.random() * 4.0) + 0.5, (Math.random() * 4.0) - 9.0];
}

/**
 * helper function, 
 * @returns valid position for a target to spawn in the world, an XYZ array
 */
function findRandValidFloorPos() {
    let currMapSize = g_map.length;
    let cubeSize = 0.25;
    let recenter = currMapSize * cubeSize * 0.5;
    let maxAttempts = 27;
    
    for (let i = 0; i < maxAttempts; ++i) {
        let x = Math.floor(Math.random() * currMapSize);
        let z = Math.floor(Math.random() * currMapSize);
        
        // randomly picked a floor tile, return its 3D world coordinates
        if (g_map[x][z] === 0 || g_map[x][z] === 2) {
            let testX = (x * cubeSize) - recenter;
            let testY = 0.5;
            let testZ = (z * cubeSize) - recenter;

            // next let's find if there's already a target in current game state
            let isOccupied = false;
            for (let j = 0; j < g_targets.length; ++j) {
                let t = g_targets[j];

                if (t.active && t.pos) {
                    let targetX = testX - t.pos[0];
                    let targetZ = testZ - t.pos[2];

                    // test squared distance due to grid snap
                    let distSqr = (targetX*targetX) + (targetZ*targetZ);
                    // comparing with 0.01 and not == 0.0 due to floating point
                    // errors, 0.01 is threshold
                    if (distSqr < 0.01) {
                        isOccupied = true;
                        break;
                    }
                }
            }

            if (!isOccupied) return [testX, testY, testZ];
        }
    }
    // Fallback: center spawn room (world origin) guaranteed to be empty
    return [0.0, 0.5, 0.0]; 
}

/**
 * helper function to update the hitbox matrix of a rescaled target
 * @param {*} target sphere object that hitbox is tied to
 * @returns nothing, updates target hitbox
 */
function updateHitBox(target) {
    if (!target.hitbox || !target.baseMatrix) return;

    let hitBoxSize = g_targetSize * 1.4;
    let offset = (hitBoxSize) * 0.5;
    
    target.hitbox.matrix = new Matrix4(target.baseMatrix);
    target.hitbox.pos = [-offset, -offset, -offset];
    target.hitbox.matrix.translate(-offset, -offset, -offset);
    target.hitbox.matrix.scale(hitBoxSize, hitBoxSize, hitBoxSize);
}

// when user changes maximum number of targets 
// rebuild existing targets on screen
function rebuildTargets() {
    g_worldObjs = g_worldObjs.filter(obj => obj.type !== "target" && obj.type !== "hit box");
    g_targets = [];
    if (g_currMap === RANGE) createTargetsForRange();
    else if (g_currMap === RANDOM) createTargetsForRandMap();
}