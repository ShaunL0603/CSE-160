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

    createRange();
    createTargetsForRange();
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

// --- Functions to create targets in shooting range ---
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

/**
 * helper function to handle the respawning events for target
 * after being hit. 
 */
function handleRespawning() {
    if (g_currMap === RANDOM) return; // temporary

    for (let i = 0; i < g_targets.length; ++i) {
        let t = g_targets[i];
        
        if (!t.active) {
            let timeSinceDeath = g_seconds - t.tod;
            if (timeSinceDeath >= t.respawnDelay) {
                // Find safe distance to spawn so targets don't collide
                let safeDistance = g_targetSize * 3.0;
                let pos = findValidTargetPos(safeDistance);

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
}

// --- Functions to create random map --- 
function createRandomMap() {
    let wallHeight = 3;
    let cubeSize = 0.25;
    let currMapSize = g_map.length;
    let recenter = currMapSize * 0.25 * 0.5; // 0.25 is size of wall

    for (let x = 0; x < currMapSize; ++x) {
        for (let z = 0; z < currMapSize; ++z) {
            if (g_map[x][z] == 1) {
                for (let h = 0; h < wallHeight; ++h) {
                    var wall = new Cube();
                    wall.type = "wall";
                    wall.color = [0.5, 0.5, 0.5, 1.0];
                    wall.textureNum = 2;
                    wall.pos = [
                        (x * cubeSize) - recenter,
                        (h * cubeSize),
                        (z * cubeSize) - recenter
                    ];
                    wall.matrix.translate(
                        (x * cubeSize) - recenter, 
                        (h * cubeSize), 
                        (z * cubeSize) - recenter
                    );
                    wall.matrix.scale(cubeSize, cubeSize, cubeSize);
                    g_worldObjs.push(wall);
                }
            }
            else if (g_map[x][z] == 2) {
                let tilex = (x * cubeSize) - recenter;
                let tilez = (z * cubeSize) - recenter;
                let targetHeight = 0.5;
                createTarget([tilex, targetHeight, tilez]);
            }
        }
    }
}

/**
 * Henerate random walls by creating a grid filled with 1's (1 indicates wall)
 * Use a "digger" to go through the grid and replace 1's with 0's
 * @param {*} size size of grid
 * @param {*} pathLen length the digger will walk
 */
function generateRandWalk(size, maxFloorCount) {
    // console.log("current size:", size);
    // Grid set to 1's
    let map = Array(size).fill().map(() => Array(size).fill(1));

    // getting center of map
    let centerX = Math.floor(size * 0.5);
    let centerY = Math.floor(size * 0.5);

    // Digger digs a 3x3 spawn room
    for (let offsetX = -1; offsetX <= 1; ++offsetX) {
        for (let offsetY = -1; offsetY <=1; ++offsetY) {
            let x = centerX + offsetX;
            let y = centerY + offsetY;
            // make sure we're clearing cubes inside grid
            if (x >= 0 && x < size && y >= 0 && y < size) {
                map[x][y] = 0;
            }
        }
    }

    // set digger to center
    let currentX = centerX;
    let currentY = centerY;
    let floorTiles = []; // save coordinates that aren't walls

    // keep track of how many steps digger takes
    let stepsTaken = 0;
    let maxSteps = maxFloorCount * 10; // avoid infinite loop of digger trying to break outside walls

    // Digger walking loop
    while (floorTiles.length < maxFloorCount && stepsTaken < maxSteps) {
        ++stepsTaken;
        if (map[currentX][currentY] === 1) {
            floorTiles.push({x: currentX, y: currentY});
            map[currentX][currentY] = 0; 
        }

        // 4 directions to choose from
        let dir = Math.floor(Math.random() * 4)
        if (dir === 0 && currentX > 1) --currentX;
        if (dir === 1 && currentY < size - 2) ++currentY;
        if (dir === 2 && currentX < size - 2) ++currentX;
        if (dir === 3 && currentY > 1) --currentY;
    }

    if (stepsTaken >= maxSteps) {
        console.warn("too many floor tiles", " steps take: ", stepsTaken);
    }

    let targetsToSpawn = Math.min(g_maxTargets, floorTiles.length);
    for (let i = 0; i < targetsToSpawn; ++i) {
        let randIdx = Math.floor(Math.random() * floorTiles.length);
        let tile = floorTiles[randIdx];
        map[tile.x][tile.y] = 2; // marking coords to palce target
        // removing coords so we don't make another target there
        floorTiles.splice(randIdx, 1);
    }

    return map;
}

function regenerateMap() {
    g_worldObjs = g_worldObjs.filter(obj => obj.type !== "wall");
    g_map = generateRandWalk(g_mapSize, g_floorTileCount);
    rebuildTargets();
    createRandomMap();
}

/**
 * Let user switch between two maps
 * User presses alt + 1 or alt + 2 to switch between maps
 * 1 = RANGE map
 * 2 = RANDOM, randomly generated map
 * @param {*} ev to see if aly and specific keys are pressed
 */
function switchMap(ev) {
    // switch to range
    if (ev.altKey && ev.key === "1") {
        // Don't execute rest of if statement if same map is trying to be loaded
        if (g_currMap === RANGE) return;
        
        g_worldObjs = g_worldObjs.filter(obj => 
            obj.type !== "wall" &&
            obj.type !== "block"
        );
        createRange();
        g_currMap = RANGE;
        rebuildTargets();
    } 
    // switch to randomly generated map
    else if (ev.altKey && ev.key === "2") {
        if (g_currMap === RANDOM) return;

        g_worldObjs = g_worldObjs.filter(obj => 
            obj.type !== "rangeWall" && 
            obj.type !== "target" && 
            obj.type !== "hit box" &&
            obj.type !== "block"
        );
        g_targets = [];
        createRandomMap();
        g_currMap = RANDOM;
    }
}
