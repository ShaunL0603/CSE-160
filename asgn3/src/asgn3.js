// ColoredPoint.js (c) 2012 matsuda Modified by Shaun Lagon, CSE 160
// Vertex shader program
var VSHADER_SOURCE =
  `
  precision mediump float;

  attribute vec4 a_Position;
  attribute vec2 a_UV;

  varying vec2 v_UV;

  uniform mat4 u_ModelMatrix;
  uniform mat4 u_GlobalRotationMatrix;
  uniform mat4 u_ViewMatrix;
  uniform mat4 u_ProjectionMatrix;

  void main()
  {
    gl_Position = u_ProjectionMatrix * u_ViewMatrix * u_GlobalRotationMatrix *  u_ModelMatrix * a_Position;
    v_UV = a_UV;
  }
  `;

// Fragment shader program
var FSHADER_SOURCE =
  `
  precision mediump float;

  varying vec2 v_UV;

  uniform vec4 u_FragColor;

  void main() {
    gl_FragColor = u_FragColor;
    gl_FragColor = vec4(v_UV, 1.0, 1.0);
  }
  `;

// Global variables
var canvas;
var gl;
var a_Position;
var a_UV;
var u_FragColor;
var u_ModelMatrix;
var u_ProjectionMatrix;
var u_ViewMatrix;
var u_GlobalRotationMatrix;
var u_FragColor;

let g_globalXAngle = 0.0;
let g_globalYAngle = 0.0;
let g_globalZAngle = 0.0;

function main() {
  // sets up canvas and gl variables
  setupWebGL();
  // set up GLSL shader programs and connect GLSL variables
  connectVariablesToGLSL();

  canvas.onmousedown = click;
  canvas.onmousemove = function(ev) { if(ev.buttons == 1) { click(ev); } };

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
    console.log("Failed to intialize shaders.");
    return -1;
  }
  
  // Get the storage location of a_Position
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

  u_GlobalRotationMatrix = gl.getUniformLocation(gl.program, "u_GlobalRotationMatrix");
  if (!u_GlobalRotationMatrix) {
    console.log("Failed to get the storage location of u_GlobalRotationMatrix");
    return -1;
  }

  u_ViewMatrix = gl.getUniformLocation(gl.program, "u_ViewMatrix");
  if (!u_ViewMatrix) {
    console.log("Failed to get the storage location of u_ViewMatrix");
    return -1;
  }
}

function click(ev) {
  g_globalXAngle += ev.movementY;
  g_globalYAngle -= ev.movementX;
}

let g_eye = [0.0, 0.0, 3.0];
let g_at = [0.0, 0.0, -100.0];
let g_up = [0.0, 1.0, 0.0];

function renderAllShapes() {
  var startTime = performance.now();

  // clear canvas
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

  var projMat = new Matrix4();
  projMat.setPerspective(90, canvas.width / canvas.height, 0.1, 100);
  gl.uniformMatrix4fv(u_ProjectionMatrix, false, projMat.elements);

  var viewMat = new Matrix4();
  viewMat.setLookAt(g_eye[0],g_eye[1],g_eye[2], g_at[0],g_at[1],g_at[2], g_up[0],g_up[1],g_up[2]);
  gl.uniformMatrix4fv(u_ViewMatrix, false, viewMat.elements);

  var globalRotMat = new Matrix4()
    .rotate(g_globalXAngle, 1, 0, 0)
    .rotate(g_globalYAngle, 0, 1, 0)
  gl.uniformMatrix4fv(u_GlobalRotationMatrix, false, globalRotMat.elements);

  var cube = new Cube();
  cube.color = [0.0, 0.0, 1.0, 1.0];
  cube.matrix.translate(0.0, 0.0, 0.0);
  cube.matrix.scale(1.0, 1.0, 1.0);
  cube.render();
  

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
  g_seconds = performance.now() / 1000.0 - g_startTime;

  renderAllShapes();
  requestAnimationFrame(tick);
}
