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

// Global constants
const WALK = "walk"; // used for lastAnimation variable
const EAT = "eat"; // used for lastAnimtion variable

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
var lastAnimation; // rememer what the last animation that was played before stop
let g_walkAnimation = false;
let g_eatingAnimation = false;

// Global variables for interacting
let g_globalXAngle = 0;
let g_globalYAngle = 0;
let g_globalZAngle = 0;
let g_globalZoom = 0.15;
let g_rotateSensitivity = 0.2;
let g_movementSensitivity = 0.01;

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
        
          g_walkAnimation = !g_walkAnimation;

          if (g_walkAnimation) {
            g_eatingAnimation = false;
            resetKoala();
          }
      }
  });

  gl.clearColor(0.0, 0.0, 0.0, 1.0);
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
  if (ev.ctrlKey) {
    // change the sensitivity of movement based on how zoomed in you are
    let modMoveSens = (g_globalZoom > 1.0 ) ? 
      g_movementSensitivity / g_globalZoom : 
      g_movementSensitivity;
    
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

  if (ev.shiftKey) {
      g_eatingAnimation = !g_eatingAnimation;

      if (g_eatingAnimation) {
        g_walkAnimation = false;
        resetKoala();
      }
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

// Redraw the canvas
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
