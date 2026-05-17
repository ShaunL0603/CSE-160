// header file for js files in asgn3, blocky world, folder


// CONSTANTS
const degToRad = Math.PI / 180;
const g_invFPSCap = 1 / 165; // my cap, 165
    // --- for player modes ---
    const FPS = "FPS";
    const MINE = "MINE";
    // ---- for current map ---
    const RANGE = "m_RANGE";
    const RANDOM = "m_RANDOM";

    // For textures
    const t_COLOR = -2 //"COLOR"
    const t_DEBUG = -1 //"DEBUG"
    const t_SKY = 0 // "SKY"
    const t_GROUND = 1 //"GROUND"
    const t_WALL = 2 // "WALL"
    const t_RANGEWALL = 3 // "RANGEWALL" 

// Global variables, WebGL
var canvas;
var gl;
var a_Position;
var a_Normal;
var a_UV;
var u_ModelMatrix;
var u_ProjectionMatrix;
var u_ViewMatrix;
var u_NormalMatrix;
var u_FragColor;
var u_Sampler0;
var u_Sampler1;
var u_Sampler2;
var u_Sampler3;
var u_Sampler4;
var u_WhichTexture;
var u_ShowTexture;
var u_ShowNormals;
var u_LightPos;
var u_CameraPos;
var u_CameraAtPos;
var u_FlashlightPos;
var u_FlashlightAtPos;
var u_LightColor;
var u_LightOn;
var u_FlashlightOn;
var u_Shininess;
let u_UVScale = 1.0;                                                                            // used to repeat textures on single object
// For shadow mapping
    // --- Sun shadow map ---
    var u_LightViewMatrix;
    var u_LightProjMatrix;
    var u_ShadowMapSampler;
    var a_ShadowPosition;
    var u_ShadowModelMatrix;
    var u_ShadowLightViewMatrix;
    var u_ShadowLightProjMatrix;

// Global variables
    // --- FOR SHADERS ---
    var g_mainProgram;
    var g_shadowProgram;
    var g_shadowMapFBO;                                                                         // Framebuffer Object for shadow mapping
    let g_sunProjMatrix = new Matrix4();                                                        // Projection matrix for the "sun camera" (light source)
    let g_sunViewMatrix = new Matrix4();                                                        // View matrix for the "sun camera" (light source)
    let renderCubeShadows = ["cube", "wall", "rangewall", "ground", "block"];                   // list of obj types to render shadows
    let renderSphereShadows = ["sphere", "target"];

    // --- FOR CAMERA ---
    var g_camera;
    let g_camSpeedMult = Number(document.getElementById("camMovSpeed").defaultValue);           // speed camera moves through world
    let g_pointerLocked = false;                                                                // boolean for checking if mouse pointer locked to center of screen
    let g_camSpeed = 0.025;                                                                     // default camera speed (walking)
    
    // --- FOR PERFORMANCE ---
    let g_startTime = performance.now() / 1000.0;
    let g_seconds = performance.now() / 1000.0 - g_startTime;
    let g_lastFrameTime = performance.now();
    let g_fpsCap = 165;
    let g_lastFPSUpdateTime = 0;

    // --- FOR HTML ---
    let g_noclip = false;
    // map keys to false until pressed, then true
    // used in updateKeyDown() and updateKeyUp()
    let g_keys = {
        "w": false, "a": false, "s": false, 
        "d": false, "shift" : false, "v": false,
        "1": false, "2": false, "z": false,
        "x": false
    };
    let g_showTexture = true;
    let g_toggleNormals = false;
    let g_toggleSunPath = true;
    let g_LightOn = true;
    let g_FlashlightOn = true;
    let g_toggleShadows = true;

    // create necessary vertices and buffers for cubes and spheres once
    // initialize them here
    // --- FOR CUBE ---
    let g_cubeVertices = null;
    let g_cubeUVVerts = null;
    let g_cubeNormals = null;
    let g_cubeVertBuffer = null;
    let g_cubeUVVertBuffer = null;
    let g_cubeNormBuffer = null;
    let cubeVertLen = 36;
    // --- FOR SPHERE ---
    let g_sphereVertices = null;
    let g_sphereUVVerts = null;
    let g_sphereNormals = null;
    let g_sphereVertBuffer = null;
    let g_sphereUVVertBuffer = null;
    let g_sphereNormBuffer = null;

    // --- World objects ---
    let g_worldObjs = [];                                                                       // list of objects to render
    var g_sun;                                                                                  // sun sphere
    var g_flashlight;                                                                           // flashlight sphere that follows camera
    let g_targets = [];                                                                         // list of objects to keep track of and perform calculations on
    var g_currMap;                                                                              // Keep track of which map is currently loaded
    let g_NonMineable = ["ground", "rangewall", "sun"];                                         // keep track of types that shouldn't be destroyed by players
    let g_sunPos = [0.0, 2.5, 0.0];
    let g_sunScale = -5.0;
    
    // --- FOR TARGETS ---
    let g_targetSize = Number(document.getElementById("targetSize").defaultValue);
    let g_maxTargets = parseInt(document.getElementById("maxTargets").defaultValue);
    let g_hitboxVisible = false;
    let g_hitSound = new Audio("./assets/audio/laser.wav");                                     // play sound when hit scored, used in handleModes() function
    let g_tempInvMat = new Matrix4();
    let g_tempRayOrigin4v = new Vector4();
    let g_tempRayDir4v = new Vector4();
    let g_tempResult4v = new Vector4();
    
    // --- CREATE RANDOMLY GENERATED MAP ---
    var g_mergedMapVerts;
    var g_mergedMapUVVerts;
    var g_mergedMapNormals;
    var g_mergedMapVertBuffer;
    var g_mergedMapUVVertBuffer;
    var g_mergedMapNormBuffer;
    let g_mapSize = parseInt(document.getElementById("changeMapSize").defaultValue);            // Store new map size that user puts in
    let g_floorTileCount = parseInt(document.getElementById("floorTileCount").defaultValue);    // for digger, number of times it breaks a wall
    let g_currMapSize = g_mapSize;                                                              // Store current map size
    let g_currFloorTileCount = g_floorTileCount;
    let g_map = [];
    let g_cubeScale = 0.25;                                                                     // scale for player placed blocks and walls
    var g_recenter;                                                                             // recenter cubes of rand map so that span room is 0,0,0
    let randMapIndices = 0.0;


    // --- For placing blocks ---
    let g_tempOrigin3v = new Vector3();
    let g_tempDir3v = new Vector3();
    let g_tempHitPoint3v = new Vector3();  

    // --- FOR ANIMATION ---
    let cx = 0.0;  // -0.1 offset due to scale when centering with world origin
    let cy = 0.0;
    let cz = 0.0;   // 5.0 offset for same reason
    let radius = 120.0;
    let angle = 0.0;
    let tilt = -45.0 * degToRad;

    // --- OTHER ---
    var g_playerMode;                                                                           // track what mode player is in
    let g_score = 0;                                                                            // track player score
    let g_tempVec = new Vector3();                                                              // temporary, used for culling in isObjVisible()
    let g_flScale = 0.02;                                                                       // scale for flashlight sphere
    let identityMat = new Matrix4();