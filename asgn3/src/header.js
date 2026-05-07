// header file for js files in asgn3, blocky world, folder

// Global variables, WebGL
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
var u_Sampler2;
var u_Sampler3;
let u_UVScale = 1.0;

// Global variables
    // --- FOR CAMERA ---
    var g_camera;
    let g_camSpeedMult = Number(document.getElementById("camMovSpeed").defaultValue);
    let g_pointerLocked = false;
    let g_camSpeed = 0.025;
    
    // --- FOR PERFORMANCE ---
    let g_startTime = performance.now() / 1000.0;
    let g_seconds = performance.now() / 1000.0 - g_startTime;
    let g_lastFrameTime = performance.now();
    let g_fpsCap = 165;

    // --- FOR HTML ---
    let g_noclip = false;
    //
    let g_keys = {
        "w": false, "a": false, "s": false, 
        "d": false, "shift" : false, "v": false,
        "1": false, "2": false, "z": false,
        "x": false
    };

    // create necessary vertices and buffers for cubes and spheres once
    // initialize them here
    // --- FOR CUBE ---
    let g_cubeVertices = null;
    let g_cubeUVVertices = null;
    let g_cubeVertBuffer = null;
    let g_cubeUVVertBuffer = null;
    // --- FOR SPHERE ---
    let g_sphereVertices = null;
    let g_sphereUVVertices = null;
    let g_sphereVertBuffer = null;
    let g_sphereUVVertBuffer = null;

    // --- World objects ---
    let g_worldObjs = [];                                                                       // list of objects to render
    var g_skybox;
    var g_ground;
    let g_targets = [];                                                                         // list of objects to keep track of and perform calculations on
    var g_currMap;                                                                              // Keep track of which map is currently loaded
    let g_blockScale = 0.25;                                                                    // scale for player palced blocks and walls
    
    // --- FOR TARGETS ---
    let g_targetSize = Number(document.getElementById("targetSize").defaultValue);
    let g_maxTargets = parseInt(document.getElementById("maxTargets").defaultValue);
    let g_hitboxVisible = false;
    let g_hitSound = new Audio("./assets/audio/laser.wav");                                     // play sound when hit scored, used in handleModes() function
    
    // --- CREATE RANDOMLY GENERATED MAP ---
    let g_mapSize = parseInt(document.getElementById("changeMapSize").defaultValue);
    let g_floorTileCount = parseInt(document.getElementById("floorTileCount").defaultValue);    // for digger, number of times it breaks a wall
    let g_map = generateRandWalk(g_mapSize, g_floorTileCount);
    
    // --- OTHER ---
    var g_playerMode;                                                                           // track what mode player is in
    let g_score = 0;                                                                            // track player score
    let g_tempVec = new Vector3();                                                              // temporary, used for frustrum culling in isObjVisible()
    

// CONSTANTS
const degToRad = Math.PI / 180;
const g_fracFPSCap = 1 / g_fpsCap;
// --- for player modes ---
const FPS = "FPS";
const MINE = "MINE";
// ---- for current map ---
const RANGE = "m_RANGE";
const RANDOM = "m_RANDOM";