// ColoredPoint.js (c) 2012 matsuda Modified by Shaun Lagon, CSE 160


function main() {
    // setup start
    g_playerMode = FPS;
    sendTextToHTML(FPS, "playerMode");
    g_currMap = RANGE;
    // sets up canvas and gl variables
    setupWebGL();
    // set up GLSL shader programs and connect GLSL variables
    connectVariablesToGLSL();
    // get shadow shader variable locations and connect GLSL variables
    getShadowLocations();
    // Sets up html actions
    htmlActions();
    // document and canvas event listeners
    handleEvents();

    // Create global verts and buffers for cube, do once
    createCubeVertices();
    createCubeBuffers();
    // Create global sphere verts n buffers
    createSphereVertices(15);
    createSphereBuffers();
    // getting textures
    initTextures();
    g_shadowMapFBO = initFramebufferObject();
    if (!g_shadowMapFBO) {
        console.error("Failed to initialize Framebuffer Object for shadow mapping.");
        return -1;
    }

    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    createWorld();
    requestAnimationFrame(tick);
}

// Resize the canvas to users display size
function resizeCanvas(canvas) {
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;

    if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;

        gl.viewport(0, 0, canvas.width, canvas.height);

        if (g_camera) {
        g_camera.canvasWidth = canvas.width;
        g_camera.canvasHeight = canvas.height;
        g_camera.updateMatrices();
        }
    }
}

function handleModes(obj, mouseBtn, closestDistance) {
    if (g_playerMode === MINE) {
        // Left click delete block
        if (mouseBtn === 0) {
            if (g_NonMineable.includes(obj.type)) return;
            
            let idx = g_worldObjs.indexOf(obj);
            if (idx > -1) {
                // delete block from rendering list
                g_worldObjs.splice(idx, 1);
            }
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
        
        // filter out objs in range map and remove targets
        g_worldObjs = g_worldObjs.filter(obj => 
            obj.type !== "rangewall" && 
            obj.type !== "target" && 
            obj.type !== "hit box" &&
            obj.type !== "block"
        );
        g_targets = [];

        if (g_map.length === 0 || g_currMapSize !== g_mapSize || g_currFloorTileCount !== g_floorTileCount) {
            console.log("Generating map for the first time...");
            g_recenter = g_mapSize * g_cubeScale * 0.5; // first initalize g_recenter
            g_map = generateRandWalk(g_mapSize, g_floorTileCount);
            g_currMapSize = g_mapSize;
            g_currFloorTileCount = g_floorTileCount;
        }

        createRandomMap();
        createTargetsForRandMap();
        g_currMap = RANDOM;
    }
}

// Event player scores a hit on target
function hitEvent() {
    ++g_score;
    sendTextToHTML(g_score, "playerScore");
    g_hitSound.play();
}

function toggleTexture(showTexture) {
    if (g_showTexture) {
        return showTexture ? true : false;
    } else {
        return false;
    }
}