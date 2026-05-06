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
    let g_camSpeedMult = Number(document.getElementById("camSpeed").defaultValue);
    let g_pointerLocked = false;
    
    // --- FOR PERFORMANCE ---
    let g_startTime = performance.now() / 1000.0;
    let g_seconds = performance.now() / 1000.0 - g_startTime;
    let g_lastFrameTime = performance.now();
    let g_fpsCap = 165;

    // --- FOR HTML ---
    let g_noclip = false;
    let g_keys = {
        "w": false, "a": false, "s": false, 
        "d": false, "shift" : false, "v": false,
        "1": false, "2": false, "z": false,
        "x": false
    };

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

    // --- OTHERS ---
    let g_worldObjs = [];
    var g_skybox;
    var g_ground;
    let g_targets = [];
    let g_blockScale = 0.25;
    let g_targetSize = document.getElementById("targetSize").defaultValue;
    let g_hitboxVisible = false;
    let g_maxTargets = 15;
    let g_hitSound = new Audio("./assets/audio/laser.wav");
    var g_playerMode;
    var g_currMap;
    var g_map = generateRandWalk(64, 17000);
    let g_mapSize = g_map.length;

// CONSTANTS
const g_defaultCamSpeed = 0.025;
const g_defaultCamRotSpeed = 0.05;
const degToRad = Math.PI / 180;
const g_fracFPSCap = 1 / g_fpsCap;
// --- for player modes ---
const FPS = "FPS";
const MINE = "MINE";
// ---- for current map ---
const RANGE = "m_RANGE";
const RANDOM = "m_RANDOM";