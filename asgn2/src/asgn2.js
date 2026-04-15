// ColoredPoint.js (c) 2012 matsuda Modified by Shaun Lagon, CSE 160
// Vertex shader program
var VSHADER_SOURCE =
  `
  precision mediump float;
  attribute vec4 a_Position;
  uniform mat4 u_ModelMatrix;
  uniform mat4 u_GlobalRotateMatrix;
  void main()
  {
    gl_Position = u_GlobalRotateMatrix * u_ModelMatrix * a_Position;
  }
  `;

// Fragment shader program
var FSHADER_SOURCE =
  `
  precision mediump float;
  uniform vec4 u_FragColor;
  void main() {
    gl_FragColor = u_FragColor;
  }
  `;

// Global variables
var canvas;
var gl;
var a_Position;
var u_FragColor;
var u_ModelMatrix;
var u_GlobalRotateMatrix;

// Global variables
let g_globalXAngle = 0.0;
let g_globalYAngle = 0.0;
let g_globalZAngle = 0.0;
let g_redraw = false;

function main() {
  // sets up canvas and gl variables
  setupWebGL();
  // set up GLSL shader programs and connect GLSL variables
  connectVariablesToGLSL();
  // Set up actions for the HTML UI elements
  addActionsForHtmlUI();

  canvas.onmousedown = click;
  canvas.onmousemove = function(ev) { if(ev.buttons == 1) { click(ev); } };

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
  u_FragColor = gl.getUniformLocation(gl.program, 'u_FragColor');
  if (!u_FragColor) {
    console.log('Failed to get the storage location of u_FragColor');
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
}

function addActionsForHtmlUI() {
  document.getElementById("angleXSlider").addEventListener("mousemove", function() { g_globalXAngle = this.value; g_redraw = true; renderAllShapes(); });
  document.getElementById("angleYSlider").addEventListener("mousemove", function() { g_globalYAngle = this.value; g_redraw = true; renderAllShapes(); });
  document.getElementById("angleZSlider").addEventListener("mousemove", function() { g_globalZAngle = this.value; g_redraw = true; renderAllShapes(); });

  document.getElementById("angleXSlider").addEventListener("input", function() { document.getElementById("angleXValue").textContent = this.value; });
  document.getElementById("angleYSlider").addEventListener("input", function() { document.getElementById("angleYValue").textContent = this.value; });
  document.getElementById("angleZSlider").addEventListener("input", function() { document.getElementById("angleZValue").textContent = this.value; });
}

function click(ev) {
  var [x, y] = convertCoordinatesEventToGL(ev);
  //console.log([x, y]);
}

function convertCoordinatesEventToGL(ev) {
  var x = ev.clientX; // x coordinate of a mouse pointer
  var y = ev.clientY; // y coordinate of a mouse pointer
  var rect = ev.target.getBoundingClientRect();
  
  x = ((x - rect.left) - canvas.width/2)/(canvas.width/2);
  y = (canvas.height/2 - (y - rect.top))/(canvas.height/2);

  return ([x, y]);
}

function renderAllShapes() {

  var startTime = performance.now();

  var globalRotMat = new Matrix4().rotate(g_globalXAngle, 1, 0, 0).rotate(g_globalYAngle, 0, 1, 0).rotate(g_globalZAngle, 0, 0, 1);
  gl.uniformMatrix4fv(u_GlobalRotateMatrix, false, globalRotMat.elements);
  
  // clear canvas
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

  var body = new Cube();
  body.color = [1.0, 0.0, 0.0, 1.0];
  body.matrix.translate(-0.25, -0.5, 0.0);
  body.matrix.scale(0.5, 1, 0.5);
  body.render();

  var left = new Cube();
  left.color = [1.0, 1.0, 0.0, 1.0];
  left.matrix.translate(0.8, 0.0, 0.0);
  left.matrix.rotate(45, 0, 0, 1);
  left.matrix.scale(0.25, 0.7, 0.5);
  left.render();

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