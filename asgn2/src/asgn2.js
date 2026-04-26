// ColoredPoint.js (c) 2012 matsuda Modified by Shaun Lagon, CSE 160
// Vertex shader program
var VSHADER_SOURCE =
  `
  precision mediump float;
  attribute vec4 a_Position;
  attribute vec4 a_Color;
  varying vec4 v_Color;
  uniform mat4 u_ModelMatrix;
  uniform mat4 u_GlobalRotateMatrix;
  uniform mat4 u_ProjectionMatrix;
  void main()
  {
    gl_Position = u_ProjectionMatrix * u_GlobalRotateMatrix * u_ModelMatrix * a_Position;
    v_Color = a_Color;
  }
  `;

// Fragment shader program
var FSHADER_SOURCE =
  `
  precision mediump float;
  // uniform vec4 u_FragColor;
  varying vec4 v_Color;
  void main() {
    // gl_FragColor = u_FragColor;
    gl_FragColor = v_Color;
  }
  `;

// Global variables
var canvas;
var gl;
var a_Position;
var u_FragColor;
var u_ModelMatrix;
var u_GlobalRotateMatrix;
var u_ProjectionMatrix;
var a_Color;
var v_Color;
let g_walkAnimation = false;
let g_eatingAnimation = false;

// Global variables for interacting
let g_globalXAngle = 0;
let g_globalYAngle = 0;
let g_globalZAngle = 0;
let g_globalZoom = 0.15;
let g_rotateSensitivity = 0.2;
let g_movementSensitivity = 0.01;
// let g_redraw = false;

// Global rotation variables for animal
  // Left Arm rotation
  let g_rotateUpperLeftArm = Number(document.getElementById("rotateUpperLeftArm").defaultValue);
  let g_rotateLowerLeftArm = Number(document.getElementById("rotateLowerLeftArm").defaultValue);
  let g_rotateLeftWristX = Number(document.getElementById("rotateLeftWristX").defaultValue);
  let g_rotateLeftWristY = Number(document.getElementById("rotateLeftWristY").defaultValue);
  let g_rotateLeftWristZ = Number(document.getElementById("rotateLeftWristZ").defaultValue);

  // Left fingys rotation
  let g_rotateLeftThumb1 = Number(document.getElementById("rotateLeftFirstThumb").defaultValue);
  let g_rotateLeftThumb2 = Number(document.getElementById("rotateLeftSecondThumb").defaultValue);
  let g_rotateLeftIndexFinger = Number(document.getElementById("rotateLeftIndexFinger").defaultValue);
  let g_rotateLeftMiddleFinger = Number(document.getElementById("rotateLeftMiddleFinger").defaultValue);
  let g_rotateLeftPinkyFinger = Number(document.getElementById("rotateLeftPinkyFinger").defaultValue);

  // Right Arm rotations
  let g_rotateUpperRightArm = Number(document.getElementById("rotateUpperRightArm").defaultValue);
  let g_rotateLowerRightArm = Number(document.getElementById("rotateLowerRightArm").defaultValue);
  let g_rotateRightWristX = Number(document.getElementById("rotateRightWristX").defaultValue);
  let g_rotateRightWristY = Number(document.getElementById("rotateRightWristY").defaultValue);
  let g_rotateRightWristZ = Number(document.getElementById("rotateRightWristZ").defaultValue);

  // Right fingys rotation
  let g_rotateRightThumb1 = Number(document.getElementById("rotateRightFirstThumb").defaultValue);
  let g_rotateRightThumb2 = Number(document.getElementById("rotateRightSecondThumb").defaultValue);
  let g_rotateRightIndexFinger = Number(document.getElementById("rotateRightIndexFinger").defaultValue);
  let g_rotateRightMiddleFinger = Number(document.getElementById("rotateRightMiddleFinger").defaultValue);
  let g_rotateRightPinkyFinger = Number(document.getElementById("rotateRightPinkyFinger").defaultValue);

  // Head rotations
  let g_rotateHeadX = Number(document.getElementById("rotateHeadX").defaultValue);
  let g_rotateHeadY = Number(document.getElementById("rotateHeadY").defaultValue);
  let g_rotateHeadZ = Number(document.getElementById("rotateHeadZ").defaultValue);

  // Jaw rotations
  let g_rotateLowerJawY = Number(document.getElementById("rotateLowerJaw").defaultValue);

  // Left Leg rotations
  let g_rotateUpperLeftLeg = Number(document.getElementById("rotateUpperLeftLeg").defaultValue);
  let g_rotateLowerLeftLeg = Number(document.getElementById("rotateLowerLeftLeg").defaultValue);
  let g_rotateLeftAnkleX = Number(document.getElementById("rotateLeftAnkleX").defaultValue);
  let g_rotateLeftAnkleY = Number(document.getElementById("rotateLeftAnkleY").defaultValue);
  let g_rotateLeftAnkleZ = Number(document.getElementById("rotateLeftAnkleZ").defaultValue);

  // Left toes rotations
  let g_rotateLeftToe1 = Number(document.getElementById("rotateLeftToe1").defaultValue);
  let g_rotateLeftToe2 = Number(document.getElementById("rotateLeftToe2").defaultValue);
  let g_rotateLeftToe3 = Number(document.getElementById("rotateLeftToe3").defaultValue);
  let g_rotateLeftToe4 = Number(document.getElementById("rotateLeftToe4").defaultValue);
  let g_rotateLeftToe5 = Number(document.getElementById("rotateLeftToe5").defaultValue);

  // Right Leg rotations
  let g_rotateUpperRightLeg = Number(document.getElementById("rotateUpperRightLeg").defaultValue);
  let g_rotateLowerRightLeg = Number(document.getElementById("rotateLowerRightLeg").defaultValue);
  let g_rotateRightAnkleX = Number(document.getElementById("rotateRightAnkleX").defaultValue);
  let g_rotateRightAnkleY = Number(document.getElementById("rotateRightAnkleY").defaultValue);
  let g_rotateRightAnkleZ = Number(document.getElementById("rotateRightAnkleZ").defaultValue);

  // Right toes rotations
  let g_rotateRightToe1 = Number(document.getElementById("rotateRightToe1").defaultValue);
  let g_rotateRightToe2 = Number(document.getElementById("rotateRightToe2").defaultValue);
  let g_rotateRightToe3 = Number(document.getElementById("rotateRightToe3").defaultValue);
  let g_rotateRightToe4 = Number(document.getElementById("rotateRightToe4").defaultValue);
  let g_rotateRightToe5 = Number(document.getElementById("rotateRightToe5").defaultValue);

function main() {
  // sets up canvas and gl variables
  setupWebGL();
  // set up GLSL shader programs and connect GLSL variables
  connectVariablesToGLSL();
  // Set up actions for the HTML UI elements
  try {
    addActionsForHtmlUI();
  } catch (error) {
    console.error("Error occurred while setting up HTML UI actions:", error);
  }

  canvas.onmousedown = click;
  canvas.onmousemove = function(ev) { if(ev.buttons == 1) { click(ev); } };
  // Add event listener for mouse wheel to zoom in and out
  canvas.addEventListener("wheel", function(ev) {
    ev.preventDefault();

    if (ev.deltaY > 0) {
      g_globalZoom *= 0.9;
    }
    else {
      g_globalZoom *= 1.1;
    }

    g_globalZoom = Math.max(0.15, Math.min(5.0, g_globalZoom));

  }, { passive: false });

  document.addEventListener('keydown', function(ev) {
      if (ev.code === 'Space') {
        ev.preventDefault();
        
        if (ev.shiftKey) {
          g_eatingAnimation = !g_eatingAnimation;

          if (g_eatingAnimation) {
            g_walkAnimation = false;
            resetKoala();
          }
        } else {
          g_walkAnimation = !g_walkAnimation;

          if (g_walkAnimation) {
            g_eatingAnimation = false;
            resetKoala();
          }
        }
      }
  });

  gl.clearColor(0.0, 0.0, 0.0, 1.0);
  
  // renderAllShapes();
  requestAnimationFrame(tick);
}

function setupWebGL()
{
  // Retrieve <canvas> element
  canvas = document.getElementById('webgl');
  
  // Get the rendering context for WebGL
  gl = canvas.getContext("webgl", { preserveDrawingBuffer: true });
  if (!gl) {
    console.log('Failed to get the rendering context for WebGL');
    return;
  }

  gl.enable(gl.DEPTH_TEST);
}

function connectVariablesToGLSL() {
  // Initialize shaders
  if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
    console.log('Failed to intialize shaders.');
    return;
  }
  
  // Get the storage location of a_Position
  a_Position = gl.getAttribLocation(gl.program, 'a_Position');
  if (a_Position < 0) {
    console.log('Failed to get the storage location of a_Position');
    return;
  }

  u_ModelMatrix = gl.getUniformLocation(gl.program, 'u_ModelMatrix');
  if (!u_ModelMatrix) {
    console.log('Failed to get the storage location of u_ModelMatrix');
    return;
  }

  u_GlobalRotateMatrix = gl.getUniformLocation(gl.program, 'u_GlobalRotateMatrix');
  if (!u_GlobalRotateMatrix) {
    console.log('Failed to get the storage location of u_GlobalRotateMatrix');
    return;
  }

  u_ProjectionMatrix = gl.getUniformLocation(gl.program, 'u_ProjectionMatrix');
  if (!u_ProjectionMatrix) {
    console.log('Failed to get the storage location of u_ProjectionMatrix');
    return;
  }

  a_Color = gl.getAttribLocation(gl.program, 'a_Color');
  if (a_Color < 0) {
    console.log('Failed to get stoage location of a_Color')
    return;
  }
}

function click(ev) {
  if (ev.shiftKey) {
    // change the sensitivity of movement based on how zoomed in you are
    let modMoveSens = (g_globalZoom > 1.0 ) ? 
      g_movementSensitivity / g_globalZoom : 
      g_movementSensitivity;
    
    // console.log("moving animal");
    g_koalaPosX += ev.movementX * modMoveSens;
    g_koalaPosY -= ev.movementY * modMoveSens;
    g_koalaPosZ -= ev.movementX * modMoveSens;
  } else {
    // change the sensitivity of rotation based on how zoomed in you are
    let modRotSens = (g_globalZoom > 1.0 ) ? 
      g_rotateSensitivity / g_globalZoom : 
      g_rotateSensitivity;
    
    g_globalXAngle += modRotSens * ev.movementY;
    g_globalYAngle -= modRotSens * ev.movementX;
  }
}

function rotateAnimalHelper(axis, rotateValue) {
  if (axis === "x") {
    g_animalXAngle = (!(Number.isNaN(rotateValue))) ? rotateValue : 0;
  }
  else if (axis === "y") {
    g_animalYAngle = (!(Number.isNaN(rotateValue))) ? rotateValue : 0;
  }
  else if (axis === "z") {
    g_animalZAngle = (!(Number.isNaN(rotateValue))) ? rotateValue : 0;
  }
}

function renderAllShapes() {
  var startTime = performance.now();

  // fix zooming in and shapes clipping through
  var projectionMat = new Matrix4();
  projectionMat.setOrtho(1.0, -1.0, -1.0, 1.0, -5.0, 100.0);
  gl.uniformMatrix4fv(u_ProjectionMatrix, false, projectionMat.elements);

  var globalRotMat = new Matrix4()
    .scale(g_globalZoom, g_globalZoom, g_globalZoom)
    .rotate(g_globalXAngle, 1, 0, 0)
    .rotate(g_globalYAngle, 0, 1, 0)
    .rotate(g_globalZAngle, 0, 0, 1);
  gl.uniformMatrix4fv(u_GlobalRotateMatrix, false, globalRotMat.elements);
    
  // clear canvas
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  
  makeKoala();

  var duration = performance.now() - startTime;
  sendTextToHTML("ms:" + Math.floor(duration) + " fps:" + Math.floor(10000/duration), "numdot");
}

function sendTextToHTML(text, htmlID) {
  var htmlElm = document.getElementById(htmlID);
  if (!htmlElm) {
    console.log("Failed to get " + htmlID + " from HTML");
    return;
  }

  htmlElm.innerHTML = text;
}

// Redraw the canvas if g_redraw (not used no more) is true, loop to continuously check
// if g_redraw is true.
var g_startTime = performance.now() / 1000.0;
var g_seconds = performance.now() / 1000.0 - g_startTime;
function tick() {
  // console.log(performance.now())
  g_seconds = performance.now() / 1000.0 - g_startTime;

  updateAnimationAngle();

  updateEatingAnimation();
  
  renderAllShapes();
  
  requestAnimationFrame(tick);
}

// Default values to reset the koala 
// TODO: Get default values from html
function resetKoala() {
    g_koalaPosX = 0;
    g_koalaPosY = 0;
    g_koalaPosZ = 0;
    g_animalXAngle = 0.0;
    g_animalYAngle = 0.0;
    g_animalZAngle = 0.0;
    g_rotateUpperLeftArm = 10;
    g_rotateLowerLeftArm = -30;
    g_rotateLeftWristX = 0;
    g_rotateLeftWristY = 0;
    g_rotateLeftWristZ = -70;
    g_rotateLeftThumb1 = 5;
    g_rotateLeftThumb2 = 5;
    g_rotateLeftIndexFinger = 5;
    g_rotateLeftMiddleFinger = 5;
    g_rotateLeftPinkyFinger = 5;
    g_rotateUpperRightArm = 10;
    g_rotateLowerRightArm = -30;
    g_rotateRightWristX = 0;
    g_rotateRightWristY = 0;
    g_rotateRightWristZ = 70;
    g_rotateRightThumb1 = 5;
    g_rotateRightThumb2 = 5;
    g_rotateRightIndexFinger = 5;
    g_rotateRightMiddleFinger = 5;
    g_rotateRightPinkyFinger = 5;
    g_rotateHeadX = 0;
    g_rotateHeadY = 0;
    g_rotateHeadZ = 0;
    g_rotateLowerJawY = 0;
    g_rotateUpperLeftLeg = 10;
    g_rotateLowerLeftLeg = -30;
    g_rotateLeftAnkleX = 0;
    g_rotateLeftAnkleY = 0;
    g_rotateLeftAnkleZ = -70;
    g_rotateLeftToe1 = 5;
    g_rotateLeftToe2 = 5;
    g_rotateLeftToe3 = 5;
    g_rotateLeftToe4 = 5;
    g_rotateLeftToe5 = 5;
    g_rotateUpperRightLeg = 10;
    g_rotateLowerRightLeg = -30;
    g_rotateRightAnkleX = 0;
    g_rotateRightAnkleY = 0;
    g_rotateRightAnkleZ = 70;
    g_rotateRightToe1 = 5;
    g_rotateRightToe2 = 5;
    g_rotateRightToe3 = 5;
    g_rotateRightToe4 = 5;
    g_rotateRightToe5 = 5;
}
