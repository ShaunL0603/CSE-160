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
    // Sets up html actions
    htmlActions();
    // document and canvas event listeners
    handleEvents();

    // Create global verts and buffers for cube, do once
    createCubeVertices();
    createCubeBuffers();
    // Create global sphere verts n buffers
    createSphereVertices(10);
    createSphereBuffers();

    initTextures();

    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    createWorld();
    requestAnimationFrame(tick);
}

function setupWebGL() {
    // Retrieve <canvas> element
    canvas = document.getElementById('webgl');
    
    // Get the rendering context for WebGL
    gl = canvas.getContext("webgl", { preserveDrawingBuffer: true });
    if (!gl) {
        console.log('Failed to get the rendering context for WebGL');
        return;
    }

    g_camera = new Camera();
    resizeCanvas(canvas);

    gl.enable(gl.DEPTH_TEST);
    // Enable alpha blending
    gl.enable(gl.BLEND);
    // Tell WebGL how to mix the transparent color with the background
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
}

// Resize the canvas to users display size
function resizeCanvas(canvas) {
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;

    if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;

        gl.viewport(0, 0, canvas.width, canvas.height);

        if (typeof g_camera !== null) {
        g_camera.canvasWidth = canvas.width;
        g_camera.canvasHeight = canvas.height;
        g_camera.updateMatrices();
        }
    }
}

function connectVariablesToGLSL() {
    // Initialize shaders
    if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
        console.log("Failed to intialize shaders.");
        return -1;
    }
    
    // Get attribute storage locations
    a_Position = gl.getAttribLocation(gl.program, "a_Position");
    if (a_Position < 0) {
        console.log("Failed to get the storage location of a_Position");
        return -1;
    }
    
    a_UV = gl.getAttribLocation(gl.program, "a_UV");
    if (a_UV < 0) {
        console.log("Failed to get storage location of a_UV");
        return -1;
    }

    // Get uniform storage locations
    u_FragColor = gl.getUniformLocation(gl.program, "u_FragColor");
    if (!u_FragColor) {
        console.log('Failed to get the storage location of u_FragColor');
        return;
    }

    u_ModelMatrix = gl.getUniformLocation(gl.program, "u_ModelMatrix");
    if (!u_ModelMatrix) {
        console.log("Failed to get the storage location of u_ModelMatrix");
        return -1;
    }

    u_ProjectionMatrix = gl.getUniformLocation(gl.program, "u_ProjectionMatrix");
    if (!u_ProjectionMatrix) {
        console.log("Failed to get the storage location of u_ProjectionMatrix");
        return -1;
    }

    u_ViewMatrix = gl.getUniformLocation(gl.program, "u_ViewMatrix");
    if (!u_ViewMatrix) {
        console.log("Failed to get the storage location of u_ViewMatrix");
        return -1;
    }
    
    u_Sampler0 = gl.getUniformLocation(gl.program, 'u_Sampler0');
    if (!u_Sampler0) {
        console.log('Failed to get the storage location of u_Sampler0');
        return -1;
    }

    u_Sampler1 = gl.getUniformLocation(gl.program, 'u_Sampler1');
    if (!u_Sampler1) {
        console.log('Failed to get the storage location of u_Sampler1');
        return -1;
    }

    u_Sampler2 = gl.getUniformLocation(gl.program, 'u_Sampler2');
    if (!u_Sampler2) {
        console.log('Failed to get the storage location of u_Sampler2');
        return -1;
    }

    u_Sampler3 = gl.getUniformLocation(gl.program, 'u_Sampler3');
    if (!u_Sampler3) {
        console.log('Failed to get the storage location of u_Sampler3');
        return -1;
    }

    u_Sampler4 = gl.getUniformLocation(gl.program, 'u_Sampler4');
    if (!u_Sampler4) {
        console.log('Failed to get the storage location of u_Sampler4');
        return -1;
    }

    u_whichTexture = gl.getUniformLocation(gl.program, 'u_whichTexture');
    if (!u_whichTexture) {
        console.log('Failed to get the storage location of u_whichTexture');
        return -1;
    }

    u_UVScale = gl.getUniformLocation(gl.program, 'u_UVScale');
    if (!u_UVScale) {
        console.log('Failed to get the storage location of u_UVScale');
        return -1;
    }
}

function initTextures() {
    var debugImg = new Image();
    if (!debugImg) {
        console.log('Failed to create the image object');
        return -1;
    }
    debugImg.onload = function() { loadTexture(debugImg, u_Sampler0, 0, gl.TEXTURE0); };
    debugImg.src = "assets/textures/uv_grid_opengl.jpg";

    var skyImage = new Image();  // Create the image object
    if (!skyImage) {
        console.log('Failed to create the image object');
        return -1;
    }
    // Register the event handler to be called on loading an image
    skyImage.onload = function() { loadTexture(skyImage, u_Sampler1, 1, gl.TEXTURE1); };
    // Tell the browser to load the sky image
    skyImage.src = "assets/textures/sky_cloud.jpg";

    var groundImage = new Image();
    if (!groundImage) {
        console.log("Failed to create the image object");
        return -1;
    }

    groundImage.onload = function() { loadTexture(groundImage, u_Sampler2, 2, gl.TEXTURE2); };
    groundImage.src = "assets/textures/asphalt_02_diff_4k.jpg";

    var wallImg = new Image();
    if (!wallImg) {
        console.log("Failed to create the image object");
        return -1;
    }

    wallImg.onload = function() { loadTexture(wallImg, u_Sampler3, 3, gl.TEXTURE3); };
    wallImg.src = "assets/textures/concrete_slab_wall_02_diff_4k.jpg";

    var wallImg2 = new Image();
    if (!wallImg2) {
        console.log("Failed to create the image object");
        return -1;
    }

    wallImg2.onload = function() { loadTexture(wallImg2, u_Sampler4, 4, gl.TEXTURE4); };
    wallImg2.src = "assets/textures/concrete_tile_facade_disp_4k.png";
}

function loadTexture(image, sampler, texUnit, glTex) {
    var texture = gl.createTexture();   // Create a texture object
    if (!texture) {
        console.log('Failed to create the texture object');
        return false;
    }
    
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1); // Flip the image's y axis
    // Enable texture unit0
    gl.activeTexture(glTex);
    // Bind the texture object to the target
    gl.bindTexture(gl.TEXTURE_2D, texture);

    // Set the texture parameters
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);

    // Set the texture image
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, image);

    gl.generateMipmap(gl.TEXTURE_2D);
    
    // Set the texture unit 0 to the sampler
    gl.uniform1i(sampler, texUnit);
}

function renderAllShapes() {
    // clear canvas
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    gl.uniformMatrix4fv(u_ProjectionMatrix, false, g_camera.projectionMatrix.elements);
    gl.uniformMatrix4fv(u_ViewMatrix, false, g_camera.viewMatrix.elements);

    // Start rendering all objects in global world obj list
    for (let i = 0; i < g_worldObjs.length; ++i) {
        let obj = g_worldObjs[i];
        // Only render objects that are active
        if (obj.active) {
            // Don't render transparent objects (hitbox)
            if (obj.color && obj.color[3] == 0.0) continue;
            // skip objects outside camera's vision
            if (!isObjVisible(obj)) continue;

            obj.render();
        }
    }
}

// Redraw the canvas
function tick() {
    let now = performance.now();
    let elapsed = now - g_lastFrameTime;
    let frameInterval = 1000.0 * g_invFPSCap;
    
    g_camera.speed = (g_keys["shift"]) ? g_camSpeed * g_camSpeedMult : g_camSpeed;
    g_camera.moveCamera(g_keys);
    if (elapsed > frameInterval) {
        g_lastFrameTime = now - (elapsed % frameInterval);
        g_seconds = (now * 0.001) - g_startTime;
        // Main rendering
        handleRespawning();
        renderAllShapes();

        let fps = Math.round(1000.0 / elapsed);
        let msPerFrame = Math.round(elapsed);
        sendTextToHTML("ms: " + msPerFrame + " fps: " + fps + " / " + g_fpsCap, "numdot");
    };
    requestAnimationFrame(tick);
}

/**
 * Cone culling, don't render anything behind the camera
 * along with any obj beyond the 60 degree fov of the camera
 * @param {*} obj object to do culling math on
 * @returns boolean, is obj within camera fov
 */
function isObjVisible(obj) {
    // avoid objects with empty/no pos array (like ground)
    if (!obj.pos) return true;
    let maxDrawDist = 100.0;

    // get direction vector
    let dx = obj.pos[0] - g_camera.eye.elements[0];
    let dy = obj.pos[1] - g_camera.eye.elements[1];
    let dz = obj.pos[2] - g_camera.eye.elements[2];

    // first check if the distance squared is greater than our
    // max distance squared to avoid unnecessary math
    let distSqr = dx*dx + dy*dy + dz*dz;
    if (distSqr > maxDrawDist*maxDrawDist) return false;

    let dist = Math.sqrt(distSqr);
    // if the distance is less than 1 then obj is right next to camera
    if (dist < 1.0) return true;

    let invDist = 1 / dist; // divide once multiply a bunch later
    // normalize vector pointing to object
    g_tempVec.elements[0] = dx * invDist;
    g_tempVec.elements[1] = dy * invDist;
    g_tempVec.elements[2] = dz * invDist;
    let dotProduct = Vector3.dot(g_tempVec, g_camera.forwardVec);

    let paddingAngle = g_camera.fov;
    let threshold = Math.cos(paddingAngle * degToRad);
    return dotProduct >= threshold;
}

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

    // Default map to load to
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
            obj.type !== "rangeWall" && 
            obj.type !== "target" && 
            obj.type !== "hit box" &&
            obj.type !== "block"
        );
        g_targets = [];

        if (g_map.length === 0 || g_currMapSize !== g_mapSize || g_currFloorTileCount !== g_floorTileCount) {
            console.log("Generating map for the first time...");
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
