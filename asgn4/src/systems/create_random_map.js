// --- File with functions to create a randomly generated map ---


// --- Functions to create random map --- 
function createRandomMap() {
    let wallHeight = 3;
    let mapPos = [];
    let mapUVs = [];
    let mapNorms = [];

    for (let x = 0; x < g_currMapSize; ++x) {
        for (let z = 0; z < g_currMapSize; ++z) {
            if (g_map[x][z] == 1) {
                for (let h = 0; h < wallHeight; ++h) {
                    // calculate world coords for cube at x,z with height h
                    let worldX = (x * g_cubeScale) - g_recenter;
                    let worldY = (h * g_cubeScale);
                    let worldZ = (z * g_cubeScale) - g_recenter;
                    
                    // loop through cube vertices and add to map verts with world coords
                    for (let v = 0; v < 36; ++v) {
                        // get local vertex coords
                        let localX = g_cubeVertices[v*3];
                        let localY = g_cubeVertices[v*3 + 1];
                        let localZ = g_cubeVertices[v*3 + 2];
                        // scale, then translate to world coords
                        mapPos.push(
                            (localX * g_cubeScale) + worldX,
                            (localY * g_cubeScale) + worldY,
                            (localZ * g_cubeScale) + worldZ
                        );
                        // normals and uvs don't change based on position
                        // copy them
                        mapUVs.push(
                            g_cubeUVVerts[v*2],
                            g_cubeUVVerts[v*2 + 1]
                        );
                        mapNorms.push(
                            g_cubeNormals[v*3],
                            g_cubeNormals[v*3 + 1],
                            g_cubeNormals[v*3 + 2]
                        );
                    }
                }
            }
        }
    }

    // Convert to typed arrays
    g_mergedMapVerts = new Float32Array(mapPos);
    randMapIndices = g_mergedMapVerts.length / 3;
    g_mergedMapUVVerts = new Float32Array(mapUVs);
    g_mergedMapNormals = new Float32Array(mapNorms);

    // Create and bind buffers exactly once
    g_mergedMapVertBuffer = gl.createBuffer();
    g_mergedMapUVVertBuffer = gl.createBuffer();
    g_mergedMapNormBuffer = gl.createBuffer();
    if (!g_mergedMapVertBuffer || !g_mergedMapUVVertBuffer || !g_mergedMapNormBuffer) {
        console.error("Failed to create global merged map buffers");
        return -1;
    }
    gl.bindBuffer(gl.ARRAY_BUFFER, g_mergedMapVertBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, g_mergedMapVerts, gl.STATIC_DRAW);
    gl.bindBuffer(gl.ARRAY_BUFFER, g_mergedMapUVVertBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, g_mergedMapUVVerts, gl.STATIC_DRAW);
    gl.bindBuffer(gl.ARRAY_BUFFER, g_mergedMapNormBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, g_mergedMapNormals, gl.STATIC_DRAW);
}

function renderMap() {
    gl.uniform1i(u_WhichTexture, t_WALL);
    gl.uniform1i(u_ShowTexture, true);
    gl.uniform1f(u_UVScale, g_cubeScale); // scale UVs based on cube scale to repeat texture correctly
    gl.uniform1i(u_ShowNormals, g_toggleNormals ? 1 : 0);
    
    // Rand map already in world coordinates, so the Model Matrix is Identity
    gl.uniformMatrix4fv(u_ModelMatrix, false, identityMat.elements);

    // Bind position buffer
    gl.bindBuffer(gl.ARRAY_BUFFER, g_mergedMapVertBuffer);
    gl.vertexAttribPointer(a_Position, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(a_Position);
    // --- bind UV and Normal buffers ---
    gl.bindBuffer(gl.ARRAY_BUFFER, g_mergedMapUVVertBuffer);
    gl.vertexAttribPointer(a_UV, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(a_UV);
    gl.bindBuffer(gl.ARRAY_BUFFER, g_mergedMapNormBuffer);
    gl.vertexAttribPointer(a_Normal, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(a_Normal);

    // Draw entire map
    gl.drawArrays(gl.TRIANGLES, 0, randMapIndices);
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

    if (g_currMapSize !== g_mapSize || g_currFloorTileCount !== g_floorTileCount) {
        g_currMapSize = g_mapSize;
        g_recenter = g_currMapSize * g_cubeScale * 0.5;
        g_currFloorTileCount = g_floorTileCount;
    }

    g_map = generateRandWalk(g_mapSize, g_floorTileCount);
    rebuildTargets();
    createRandomMap();
}
