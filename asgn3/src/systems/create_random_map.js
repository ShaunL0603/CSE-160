// --- File with functions to create a randomly generated map ---


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
            // else if (g_map[x][z] == 2) {
            //     let tilex = (x * cubeSize) - recenter;
            //     let tilez = (z * cubeSize) - recenter;
            //     let targetHeight = 0.5;
            //     createTarget([tilex, targetHeight, tilez]);
            // }
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
