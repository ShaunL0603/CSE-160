// ColoredPoint.js (c) 2012 matsuda Modified by Shaun Lagon, CSE 160
// Vertex shader program
var VSHADER_SOURCE =
    `
    precision mediump float;

    attribute vec4 a_Position;
    attribute vec2 a_UV;

    varying vec2 v_UV;

    uniform mat4 u_ModelMatrix;
    // uniform mat4 u_GlobalRotationMatrix;
    uniform mat4 u_ViewMatrix;
    uniform mat4 u_ProjectionMatrix;
    uniform float u_UVScale;

    void main()
    {
        gl_Position = u_ProjectionMatrix * u_ViewMatrix *  u_ModelMatrix * a_Position;
        v_UV = a_UV * u_UVScale;
    }
    `;

// Fragment shader program
var FSHADER_SOURCE =
    `
    precision mediump float;

    varying vec2 v_UV;

    uniform vec4 u_FragColor;
    uniform sampler2D u_Sampler0; // Sky texture
    uniform sampler2D u_Sampler1; // Debug texture
    uniform int u_whichTexture;

    void main() {
        if (u_whichTexture == -2) {
        gl_FragColor = u_FragColor; // use color
        } else if (u_whichTexture == -1) {
        gl_FragColor = texture2D(u_Sampler1, v_UV); // use debug texture
        } else if (u_whichTexture == 0) {
        gl_FragColor = texture2D(u_Sampler0, v_UV); // use sky texture
        } else {
        gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0); // Error, put red
        }
    }
    `;

// Global variables
var canvas;
var gl;
var a_Position;
var a_UV;
var u_ModelMatrix;
var u_ProjectionMatrix;
var u_ViewMatrix;
var u_FragColor;
var u_whichTexture;
var u_Sampler0;
var u_Sampler1;
let u_UVScale = 1.0;
// var u_GlobalRotationMatrix;

// Global variables
    /* FOR CAMERA */
    var g_camera;
    let g_camSpeedMult = Number(document.getElementById("camSpeed").defaultValue);
    let g_pointerLocked = false;
    const g_defaultCamSpeed = 0.025;
    const g_defaultCamRotSpeed = 0.05;
    const degToRad = Math.PI / 180;
    
    /* FOR PERFORMANCE */
    let g_startTime = performance.now() / 1000.0;
    let g_seconds = performance.now() / 1000.0 - g_startTime;
    let g_lastFrameTime = performance.now();
    let g_fpsCap = 165;
    const g_fracFPSCap = 1 / g_fpsCap;

    /* FOR HTML */
    let g_noclip = false;
    let g_keys = {
        "w": false, "a": false, "s": false, 
        "d": false, "shift" : false, "v": false
    };

    /* FOR CUBE */
    var g_cubeVertices = null;
    var g_cubeUVVertices = null;
    var g_cubeVertBuffer = null;
    var g_cubeUVVertBuffer = null;

    var g_skybox;
    var g_ground;
    var g_worldObjs = [];

// let g_globalXAngle = 0.0;
// let g_globalYAngle = 0.0;
// let g_globalZAngle = 0.0;

function main() {
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
    // Create global spheer verts n buffers
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

    // u_GlobalRotationMatrix = gl.getUniformLocation(gl.program, "u_GlobalRotationMatrix");
    // if (!u_GlobalRotationMatrix) {
    //   console.log("Failed to get the storage location of u_GlobalRotationMatrix");
    //   return -1;
    // }

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
    var skyImage = new Image();  // Create the image object
    if (!skyImage) {
        console.log('Failed to create the image object');
        return -1;
    }
    // Register the event handler to be called on loading an image
    skyImage.onload = function() { loadTexture(skyImage, u_Sampler0, 0, gl.TEXTURE0); };
    // Tell the browser to load the sky image
    skyImage.src = "assets/sky_cloud.jpg";

    var groundImage = new Image();
    if (!groundImage) {
        console.log("Failed to create the image object");
        return -1;
    }

    groundImage.onload = function() { loadTexture(groundImage, u_Sampler1, 1, gl.TEXTURE1); };
    groundImage.src = "assets/uv_grid_opengl.jpg";
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
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.MIRRORED_REPEAT);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.MIRRORED_REPEAT);
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

    // var globalRotMat = new Matrix4()
    //   .rotate(g_globalXAngle, 1, 0, 0)
    //   .rotate(g_globalYAngle, 0, 1, 0)
    // gl.uniformMatrix4fv(u_GlobalRotationMatrix, false, globalRotMat.elements);

    // Start rendering all objects in global world obj list
    for (let i = 0; i < g_worldObjs.length; ++i) {
        let obj = g_worldObjs[i];
        obj.render();
    }
}

// Redraw the canvas
function tick() {
    let now = performance.now();
    let elapsed = now - g_lastFrameTime;
    let frameInterval = 1000.0 * g_fracFPSCap;

    if (elapsed > frameInterval) {
        g_lastFrameTime = now - (elapsed % frameInterval);
        
        g_seconds = (now * 0.001) - g_startTime;
        
        g_camera.speed = (g_keys["shift"]) ? g_defaultCamSpeed * g_camSpeedMult : g_defaultCamSpeed;
        g_camera.moveCamera(g_keys);
        renderAllShapes();

        let fps = Math.round(1000.0 / elapsed);
        let msPerFrame = Math.round(elapsed);
        sendTextToHTML("ms: " + msPerFrame + " fps: " + fps + " / " + g_fpsCap, "numdot");
    };
    requestAnimationFrame(tick);
}

var g_map = [
    [1, 1, 1, 1, 0, 1, 1, 1], 
    [1, 0, 0, 0, 0, 0, 0, 1], 
    [1, 0, 1, 1, 1, 1, 0, 1], 
    [0, 0, 0, 1, 0, 1, 0, 1], 
    [1, 0, 0, 1, 0, 0, 0, 1], 
    [1, 0, 0, 0, 0, 1, 0, 1], 
    [1, 0, 0, 1, 0, 0, 0, 1], 
    [1, 0, 1, 1, 0, 1, 1, 1]
];
function drawWalls() {
    for (let x = 0; x < g_map.length; ++x) {
        for (let y = 0; y < g_map.length; ++y) {
            if (g_map[x][y] == 1) {
                var wall = new Cube();
                wall.type = "wall";
                wall.color = [0.5, 0.5, 0.5, 1.0];
                wall.textureNum = -2;
                wall.matrix.translate(x, -0.001, y);
                g_worldObjs.push(wall);
            }
        }
    }
}

let g_targetSize = document.getElementById("targetSize").defaultValue;
let g_hitBoxPos = g_targetSize * 0.5;
let g_hitboxVisible = false;

let g_targets = [];
function drawTargets() {
    let spawnPos = [-1.0, 0.0, 2.0];

    for (let i = 0; i < spawnPos.length; ++i) {
        var target = new Sphere();
        target.type = "target";
        target.color = [1.0, 0.0, 0.0, 1.0];
        target.textureNum = -2;
        target.baseMatrix = new Matrix4();
        target.baseMatrix.translate(spawnPos[i], 0.5, -3.0);

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

function updateHitBox(target) {
    if (!target.hitbox || !target.baseMatrix) return;
    
    target.hitbox.matrix = new Matrix4(target.baseMatrix);
    target.hitbox.matrix.translate(-g_hitBoxPos, -g_hitBoxPos, -g_hitBoxPos);
    target.hitbox.matrix.scale(g_targetSize, g_targetSize, g_targetSize);
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
    g_ground.textureNum = -1;
    g_ground.UVScale = 50.0;
    g_ground.matrix.translate(-250.0, -0.2, -250.0);
    g_ground.matrix.scale(500, 0.2, 500);
    g_worldObjs.push(g_ground);

    drawWalls();
    drawTargets();
}
