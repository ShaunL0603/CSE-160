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

// Global variables for interacting
let g_globalXAngle = 0;
let g_globalYAngle = 0;
let g_globalZAngle = 0;
let g_redraw = false;
let g_globalZoom = 0.1;
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

    g_globalZoom = Math.max(0.1, Math.min(5.0, g_globalZoom));

    g_redraw = true;
    renderAllShapes();
  }, { passive: false });

  gl.clearColor(0.0, 0.0, 0.0, 1.0);
  
  renderAllShapes();
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
  
  // Get the storage location of u_FragColor
  // u_FragColor = gl.getUniformLocation(gl.program, 'u_FragColor');
  // if (!u_FragColor) {
  //   console.log('Failed to get the storage location of u_FragColor');
  //   return;
  // }

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
    // console.log("moving animal");
    g_koalaPosX -= ev.movementX * g_movementSensitivity;
    g_koalaPosY -= ev.movementY * g_movementSensitivity;
    g_koalaPosZ -= ev.movementX * g_movementSensitivity;

  } else {
    g_globalXAngle -= g_rotateSensitivity * ev.movementY;
    g_globalYAngle -= g_rotateSensitivity * ev.movementX;
  }

  g_redraw = true;
  renderAllShapes();
}

function rotateAnimal(axis, rotateValue) {
  if (axis === "x") {
    g_animalXAngle = (!(Number.isNaN(rotateValue))) ? rotateValue : 0;
  }
  else if (axis === "y") {
    g_animalYAngle = (!(Number.isNaN(rotateValue))) ? rotateValue : 0;
  }
  else if (axis === "z") {
    g_animalZAngle = (!(Number.isNaN(rotateValue))) ? rotateValue : 0;
  }
  g_redraw = true;
  renderAllShapes();
}

function renderAllShapes() {
  var startTime = performance.now();

  var projectionMat = new Matrix4();
  projectionMat.setOrtho(1.0, -1.0, -1.0, 1.0, -100.0, 100.0);
  gl.uniformMatrix4fv(u_ProjectionMatrix, false, projectionMat.elements);

  var globalRotMat = new Matrix4()
    .scale(g_globalZoom, g_globalZoom, g_globalZoom)
    .rotate(g_globalXAngle, 1, 0, 0)
    .rotate(g_globalYAngle, 0, 1, 0)
    .rotate(g_globalZAngle, 0, 0, 1);
  gl.uniformMatrix4fv(u_GlobalRotateMatrix, false, globalRotMat.elements);
    
  // clear canvas
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

  // var base = new Cube();
  // base.color = [0.0, 0.3, 0.03, 1.0];
  // base.matrix.setTranslate(0.0, 0.0, 0.0);
  // base.matrix.rotate(0.0, 1.0, 0.0, 0.0);
  // base.matrix.translate(-3.0 ,-0.5 , -3.0);
  // base.matrix.scale(6.0, 0.4, 6.0);
  // base.render();
  
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

// Redraw the canvas if g_redraw is true, loop to continuously check
// if g_redraw is true.
function tick() {
  //console.log(performance.now())
  if (g_redraw) {
    renderAllShapes();
    g_redraw = false;
  }
  requestAnimationFrame(tick);
}