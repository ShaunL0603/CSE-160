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
  uniform sampler2D u_Sampler0;
  uniform int u_whichTexture;

  void main() {
    if (u_whichTexture == -2) {
      gl_FragColor = u_FragColor; // use color
    } else if (u_whichTexture == -1) {
      gl_FragColor = vec4(v_UV, 1.0, 1.0); //use UV debug color
    } else if (u_whichTexture == 0) {
      gl_FragColor = texture2D(u_Sampler0, v_UV); // use texture0
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
var u_FragColor;
var u_ModelMatrix;
var u_ProjectionMatrix;
var u_ViewMatrix;
var u_GlobalRotationMatrix;
var u_FragColor;
var u_Sampler0;
var u_whichTexture;
var u_Sampler0;

let g_startTime = performance.now() / 1000.0;
let g_seconds = performance.now() / 1000.0 - g_startTime;
let g_globalXAngle = 0.0;
let g_globalYAngle = 0.0;
let g_globalZAngle = 0.0;

const g_defaultCamSpeed = 0.01;
const g_defaultCamRotSpeed = 0.05;

function main() {
  // sets up canvas and gl variables
  setupWebGL();
  // set up GLSL shader programs and connect GLSL variables
  connectVariablesToGLSL();
  
  canvas.addEventListener("click", () => { canvas.requestPointerLock(); });
  document.onmousemove = (ev) => { 
    if (document.pointerLockElement === canvas) {
      if (Math.abs(ev.movementX) > 300 || Math.abs(ev.movementY) > 300) return;
      g_camera.panCamera(-ev.movementX, ev.movementY);
    }
  };

  document.addEventListener("keydown", (ev) => { updateKeyDown(ev); });
  document.addEventListener("keyup", (ev) => { updateKeyUp(ev); });

  // Create global verts and buffers for cube, do once
  createCubeVertices();
  createCubeBuffers();
  initTextures();

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

  resizeCanvas(canvas);

  gl.enable(gl.DEPTH_TEST);
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
  
  // Get the storage locations
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

  // Get the storage location of u_Sampler
  u_Sampler0 = gl.getUniformLocation(gl.program, 'u_Sampler0');
  if (!u_Sampler0) {
    console.log('Failed to get the storage location of u_Sampler0');
    return false;
  }

  u_whichTexture = gl.getUniformLocation(gl.program, 'u_whichTexture');
  if (!u_whichTexture) {
    console.log('Failed to get the storage location of u_whichTexture');
    return false;
  }
}

function initTextures() {
  var skyImage = new Image();  // Create the image object
  if (!skyImage) {
    console.log('Failed to create the image object');
    return false;
  }
  // Register the event handler to be called on loading an image
  skyImage.onload = function() { loadTexture(skyImage); };
  // Tell the browser to load the sky image
  skyImage.src = "assets/sky_cloud.jpg";

  var groundImage = new Image();
  if (!groundImage) {
    console.log('Failed to create the image object');
    return false;
  }

  skyImage.onload = function() { loadTexture(skyImage); };
  groundImage.src = "assets/uv_grid_opengl.jpg";

  return true;
}

function loadTexture(image) {
  var texture = gl.createTexture();   // Create a texture object
  if (!texture) {
    console.log('Failed to create the texture object');
    return false;
  }
  
  gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1); // Flip the image's y axis
  // Enable texture unit0
  gl.activeTexture(gl.TEXTURE0);
  // Bind the texture object to the target
  gl.bindTexture(gl.TEXTURE_2D, texture);

  // Set the texture parameters
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  // Set the texture image
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, image);
  
  // Set the texture unit 0 to the sampler
  gl.uniform1i(u_Sampler0, 0);

  console.log("Finished lodaing texture");
}

var g_camera = new Camera();
function renderAllShapes() {
  var startTime = performance.now();

  // clear canvas
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

  gl.uniformMatrix4fv(u_ProjectionMatrix, false, g_camera.projectionMatrix.elements);
  gl.uniformMatrix4fv(u_ViewMatrix, false, g_camera.viewMatrix.elements);

  var globalRotMat = new Matrix4()
    .rotate(g_globalXAngle, 1, 0, 0)
    .rotate(g_globalYAngle, 0, 1, 0)
  gl.uniformMatrix4fv(u_GlobalRotationMatrix, false, globalRotMat.elements);

  var skybox = new Cube();
  skybox.color = [0.0, 0.0, 1.0, 1.0];
  skybox.matrix.translate(-5.0, -5.0, -5.0);
  skybox.matrix.scale(10.0, 10.0, 10.0);
  skybox .render();

  var ground = new Cube();
  ground.color = [0.2, 0.5, 0.2, 1.0];
  ground.textureNum = 0;
  ground.matrix.translate(-5.1, -1.0, -5.1);
  ground.matrix.scale(10.2, 0.2, 10.2);
  ground.render();

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
function tick() {
  g_seconds = performance.now() / 1000.0 - g_startTime;
  
  g_camera.speed = (g_keys["shift"]) ? g_defaultCamSpeed * 5 : g_defaultCamSpeed;
  g_camera.moveCamera(g_keys);
  renderAllShapes();
  requestAnimationFrame(tick);
}
