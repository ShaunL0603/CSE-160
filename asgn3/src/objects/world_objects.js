function createWorld() {
    g_skybox = new Cube();
    g_skybox.type = "sky";
    g_skybox.color = [0.0, 0.0, 1.0, 1.0];
    g_skybox.textureNum = 0;
    g_skybox.matrix.translate(-500.0, -500.0, -500.0);
    g_skybox.matrix.scale(1000.0, 1000.0, 1000.0);
    g_worldObjs.push(g_skybox);

    g_ground = new Cube();
    g_ground.type = "ground";
    g_ground.color = [0.2, 0.5, 0.2, 1.0];
    g_ground.textureNum = 1;
    g_ground.UVScale = 5.0;
    g_ground.matrix.translate(-20.0, -0.2, -20.0);
    g_ground.matrix.scale(40, 0.2, 40);
    g_worldObjs.push(g_ground);

    createWalls();
    createRange();
    createTargets();
}

function createRange() {
    var rangeWall = new Cube();
    rangeWall.type = "rangeWall"
    rangeWall.color = [0.2, 0.0, 0.2, 1.0];
    rangeWall.UVScale = 5;
    rangeWall.textureNum = 3;
    rangeWall.matrix.translate(-5.0, 0.0, -10.0);
    var rangeWallMat = new Matrix4(rangeWall.matrix);
    rangeWall.matrix.scale(10.0, 5.0, 0.2);
    g_worldObjs.push(rangeWall);

    var rangeWall2 = new Cube();
    rangeWall2.type = "rangeWall"
    rangeWall2.color = [0.2, 0.0, 0.2, 1.0];
    rangeWall2.UVScale = 5;
    rangeWall2.textureNum = 3;
    rangeWall2.matrix = new Matrix4(rangeWallMat);
    rangeWall2.matrix.translate(0.0, 0.0, 10.0);
    rangeWall2.matrix.rotate(90, 0, 1, 0);
    rangeWall2.matrix.scale(9.8, 5.0, 0.2);
    g_worldObjs.push(rangeWall2);

    var rangeWall3 = new Cube();
    rangeWall3.type = "rangeWall"
    rangeWall3.color = [0.2, 0.0, 0.2, 1.0];
    rangeWall3.UVScale = 5;
    rangeWall3.textureNum = 3;
    rangeWall3.matrix = new Matrix4(rangeWallMat);
    rangeWall3.matrix.translate(10.0, 0.0, 0.2);
    rangeWall3.matrix.rotate(-90, 0, 1, 0);
    rangeWall3.matrix.scale(9.8, 5.0, 0.2);
    g_worldObjs.push(rangeWall3);
}

var g_map = generateRandWalk(64, 17000);
function createWalls() {
    let mapSize = g_map.length;
    let wallHeight = 3;
    for (let x = 0; x < mapSize; ++x) {
        for (let y = 0; y < mapSize; ++y) {
            if (g_map[x][y] == 1) {
                for (let h = 0; h < wallHeight; ++ h) {
                    var wall = new Cube();
                    wall.type = "wall";
                    wall.color = [0.5, 0.5, 0.5, 1.0];
                    wall.textureNum = 2;
                    wall.matrix.translate((x * 0.25) - 8.0, (h * 0.25), (y * 0.25) - 8.0);
                    wall.matrix.scale(0.25, 0.25, 0.25);
                    g_worldObjs.push(wall);
                }
            }
        }
    }
    console.log("Walls created");
}

// --- Functions to create targets in shooting range ---

/**
 * Main function to create all and new targets on screen
 * saves target in global targets and worldObjs lists
 * target hit box also saved in global worldObjs list
 */
function createTargets() {
    let  safeDistance = g_targetSize * 3.0;

    for (let i = 0; i < g_maxTargets; ++i) {
        var target = new Sphere();
        target.type = "target";
        target.color = [1.0, 0.0, 0.0, 1.0];
        target.textureNum = -2;
        // find a position to spawn the target
        let pos = findValidTargetPos(safeDistance);
        target.spawnPos = pos;

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
}

/**
 * Get a random position to spawn a target at
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
            if (!t.active || !t.spawnPos) continue;

            let dx = x - t.spawnPos[0];
            let dy = y - t.spawnPos[1];
            let dz = z - t.spawnPos[2];
            let distance = Math.sqrt(dx**2 + dy**2 + dz**2);

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
 * helper function to update the hitbox matrix of a rescaled target
 * @param {*} target sphere object that hitbox is tied to
 * @returns nothing, updates target hitbox
 */
function updateHitBox(target) {
    if (!target.hitbox || !target.baseMatrix) return;

    let hitBoxSize = g_targetSize * 1.4;
    let offset = (hitBoxSize) * 0.5;
    
    target.hitbox.matrix = new Matrix4(target.baseMatrix);
    target.hitbox.matrix.translate(-offset, -offset, -offset);
    target.hitbox.matrix.scale(hitBoxSize, hitBoxSize, hitBoxSize);
}

/**
 * helper function to handle the respawning events for target
 * after being hit
 */
function handleRespawning() {
    for (let i = 0; i < g_targets.length; ++i) {
        let t = g_targets[i];
        
        if (!t.active) {
            let timeSinceDeath = g_seconds - t.tod;
            if (timeSinceDeath >= t.respawnDelay) {
                // Find safe distance to spawn so targets don't collide
                let safeDistance = g_targetSize * 3.0;
                let pos = findValidTargetPos(safeDistance);

                t.spawnPos = pos;
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

// when user changes maximum number of targets 
// rebuild existing targets on screen
function rebuildTargets() {
    g_worldObjs = g_worldObjs.filter(obj => obj.type !== "target" && obj.type !== "hit box");
    g_targets = [];
    createTargets();
}

/**
 * Helper function to generate random walls
 * @param {*} size size of grid
 * @param {*} pathLen length the digger will walk
 */
function generateRandWalk(size, pathLen) {
    // Grid set to 1 where a 1 indicates a wall
    let map = Array(size).fill().map(() => Array(size).fill(1));

    let currentX = Math.floor(size * 0.5);
    let currentY = Math.floor(size * 0.5);

    // Digger walking loop
    for (let i = 0; i < pathLen; ++i) {
        map[currentX][currentY] = 0;

        let dir = Math.floor(Math.random() * 4)

        if (dir === 0 && currentX > 1) --currentX;
        if (dir === 1 && currentY < size - 2) ++currentY;
        if (dir === 2 && currentX < size - 2) ++currentX;
        if (dir === 3 && currentY > 1) --currentY;
    }

    return map;
}
