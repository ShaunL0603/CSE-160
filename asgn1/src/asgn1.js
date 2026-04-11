// ColoredPoint.js (c) 2012 matsuda Modified by Shaun Lagon, CSE 160
// Vertex shader program
var VSHADER_SOURCE =
  `
  precision mediump float;
  attribute vec4 a_Position;
  uniform float u_Size;
  void main()
  {
    gl_Position = a_Position;
    gl_PointSize = u_Size;
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
var u_Size;

// Constants
const TRIANGLE = 0;
const SQUARE = 1;
const CIRCLE = 2;
// Constants for scaling x or y values
const minScale = 0.5;
const maxScale = 5;

// Globals related to UI elements
let g_canvasColor = [0.0, 0.0, 0.0, 1.0];
let g_ShapesList = [];
let g_selectedShape = null;
let g_selectedType = TRIANGLE;
let g_selectedColor = [1.0, 0.0, 0.0, 1.0];
let g_selectedSize = 10;
let g_selectedSegments = 10;
let g_selectedScaleX = 1.0;
let g_selectedScaleY = 1.0;
let g_dragMode = false;
let g_lastCoords = [null, null];
let g_deleteMode = false;

function main() {
  // sets up canvas and gl variables
  setupWebGL();
  // set up GLSL shader programs and connect GLSL variables
  connectVarialbesToGLSL();
  // Set up actions for the HTML UI elements
  addActionsForHTMLUI();
  
  // Register function (event handler) to be called on a mouse press
  canvas.onmousedown = click;
  canvas.onmousemove = function(ev) { if (ev.buttons == 1) { click(ev) }; };

  clearCanvas([0.0, 0.0, 0.0, 1.0]);
}

function setupWebGL()
{
  // Retrieve <canvas> element
  canvas = document.getElementById('webgl');
  
  // Get the rendering context for WebGL
  gl = canvas.getContext("webgl", { preserveDrawingBuffer: true, premultipliedAlpha: false });
  if (!gl) {
    console.log('Failed to get the rendering context for WebGL');
    return;
  }

  gl.enable(gl.BLEND);
  gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
}

function connectVarialbesToGLSL() {
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
  
  u_Size = gl.getUniformLocation(gl.program, 'u_Size');
  if (!u_Size) {
    console.log('Failed to get the storage location of u_Size');
    return;
  }
}

function addActionsForHTMLUI() {
  
  // Add actions for the shape selection buttons
  document.getElementById('squareButton').onclick = function() { g_selectedType = SQUARE; };
  document.getElementById('triangleButton').onclick = function() { g_selectedType = TRIANGLE; };
  document.getElementById('circleButton').onclick = function() { g_selectedType = CIRCLE; };

  // Add actions for the color selection sliders and display text on page
  document.getElementById('rgbaValue').innerText = `rgba(${document.getElementById('redSlider').value}, ${document.getElementById('greenSlider').value}, ${document.getElementById('blueSlider').value}, ${document.getElementById('alphaSlider').value})`;
  document.getElementById('redSlider').addEventListener('input', function() { 
    g_selectedColor[0] = this.value/100; 
    document.getElementById('rgbaValue').innerText = `rgba(${this.value}, ${document.getElementById('greenSlider').value}, ${document.getElementById('blueSlider').value}, ${document.getElementById('alphaSlider').value})`;
  });
  document.getElementById('greenSlider').addEventListener('input', function() { 
    g_selectedColor[1] = this.value/100; 
    document.getElementById('rgbaValue').innerText = `rgba(${document.getElementById('redSlider').value}, ${this.value}, ${document.getElementById('blueSlider').value}, ${document.getElementById('alphaSlider').value})`;
  });
  document.getElementById('blueSlider').addEventListener('input', function() { 
    g_selectedColor[2] = this.value/100; 
    document.getElementById('rgbaValue').innerText = `rgba(${document.getElementById('redSlider').value}, ${document.getElementById('greenSlider').value}, ${this.value}, ${document.getElementById('alphaSlider').value})`;
  });
  document.getElementById('alphaSlider').addEventListener('input', function() {
    g_selectedColor[3] = this.value/100;;
    document.getElementById('rgbaValue').innerText = `rgba(${document.getElementById('redSlider').value}, ${document.getElementById('greenSlider').value}, ${document.getElementById('blueSlider').value}, ${this.value})`;
  })
  
  // Add actions for the color selection sliders of canvas and display text on page
  document.getElementById('rgbaValueForCanvas').innerText = `rgba(${document.getElementById('redSliderForCanvas').value}, ${document.getElementById('greenSliderForCanvas').value}, ${document.getElementById('blueSliderForCanvas').value}, ${document.getElementById('alphaSliderForCanvas').value})`;
  document.getElementById('redSliderForCanvas').addEventListener('input', function() { 
    g_canvasColor[0] = this.value/100; 
    document.getElementById('rgbaValueForCanvas').innerText = `rgba(${this.value}, ${document.getElementById('greenSliderForCanvas').value}, ${document.getElementById('blueSliderForCanvas').value}, ${document.getElementById('alphaSliderForCanvas').value})`;
  });
  document.getElementById('greenSliderForCanvas').addEventListener('input', function() { 
    g_canvasColor[1] = this.value/100; 
    document.getElementById('rgbaValueForCanvas').innerText = `rgba(${document.getElementById('redSliderForCanvas').value}, ${this.value}, ${document.getElementById('blueSliderForCanvas').value}, ${document.getElementById('alphaSliderForCanvas').value})`;
  });
  document.getElementById('blueSliderForCanvas').addEventListener('input', function() { 
    g_canvasColor[2] = this.value/100; 
    document.getElementById('rgbaValueForCanvas').innerText = `rgba(${document.getElementById('redSliderForCanvas').value}, ${document.getElementById('greenSliderForCanvas').value}, ${this.value}, ${document.getElementById('alphaSliderForCanvas').value})`;
  });
  document.getElementById('alphaSliderForCanvas').addEventListener('input', function() { 
    g_canvasColor[3] = this.value/100; 
    document.getElementById('rgbaValueForCanvas').innerText = `rgba(${document.getElementById('redSliderForCanvas').value}, ${document.getElementById('greenSliderForCanvas').value}, ${document.getElementById('blueSliderForCanvas').value}, ${this.value})`;
  });

  // Add action to change the canvas color
  document.getElementById('changeCanvasColor').onclick = function() { clearCanvas(g_canvasColor); };
  
  // Add action for the size selection slider
  document.getElementById('sizeSlider').addEventListener('mouseup', function() { g_selectedSize = this.value; });
  document.getElementById('sizeValue').innerText = document.getElementById('sizeSlider').value;
  document.getElementById('sizeSlider').addEventListener('input', function() { document.getElementById('sizeValue').innerText = this.value; });
  
  // Add action for the circle segment selection slider
  document.getElementById('segmentSlider').addEventListener('mouseup', function() { g_selectedSegments = this.value; });
  document.getElementById('segmentValue').innerText = document.getElementById('segmentSlider').value;
  document.getElementById('segmentSlider').addEventListener('input', function() { document.getElementById('segmentValue').innerText = this.value; });
  
  // Add action for the clear canvas button
  document.getElementById('clearButton').onclick = function() { g_ShapesList = []; renderAllShapes(); };
  
  // Add actions for cursor modes
  document.getElementById('dragModeCheckbox').addEventListener('change', function() { g_dragMode = this.checked; });
  document.getElementById('deleteModeCheckbox').addEventListener('change', function() { g_deleteMode = this.checked; });

  // Add actions for the scale shape number inputs
  document.getElementById('scaleXSlider').addEventListener('input', function() { g_selectedScaleX = checkScaleValue(Number(this.value)); });
  document.getElementById('scaleYSlider').addEventListener('input', function() { g_selectedScaleY = checkScaleValue(Number(this.value)); });
}

function click(ev) {
  
  // Extract the event click and return it in WebGL coordinates
  [x, y] = convertCoordinatesEventToGL(ev);

  if (g_deleteMode) {
    // Check if the click is inside any shape and if so, delete that shape
    for (let i = g_ShapesList.length - 1; i >= 0; i--) {
      if (g_ShapesList[i].contains(x, y)) {
        g_ShapesList.splice(i, 1);
        renderAllShapes();
        return;
      }
    }
  }
  
  if (!g_dragMode && !g_deleteMode) {

    if (!checkDistance()) {
      return;
    }
    // Create and store the new shape
    let shapeType;
    if ( g_selectedType == TRIANGLE) {
      shapeType = new Triangle();
    } else if ( g_selectedType == SQUARE) {
      shapeType = new Square();
    } else if ( g_selectedType == CIRCLE) {
      shapeType = new Circle();
      shapeType.segments = g_selectedSegments;
    }
    shapeType.position = [x, y];
    shapeType.color = g_selectedColor.slice();
    shapeType.size = g_selectedSize;
    shapeType.scaleX = g_selectedScaleX;
    shapeType.scaleY = g_selectedScaleY;
    g_ShapesList.push(shapeType);

  } else {
    // Check if the click is inside any shape and if so, update the position of that shape to the cursor position
    for (let i = g_ShapesList.length - 1; i >= 0; i--) {
      if (g_ShapesList[i].contains(x, y)) {
        g_ShapesList[i].position = [x, y];
        break;
      }
    }
  }

  renderAllShapes();
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
  // Clear <canvas>
  gl.clear(gl.COLOR_BUFFER_BIT);
  
  var len = g_ShapesList.length;
  for(var i = 0; i < len; i++) {
    g_ShapesList[i].render();
  }
}

function clearCanvas(canvasColor) {
  // Specify the color for clearing <canvas>
  gl.clearColor(canvasColor[0], canvasColor[1], canvasColor[2], canvasColor[3]);
  
  // Clear <canvas>
  gl.clear(gl.COLOR_BUFFER_BIT);
  
  if (g_ShapesList.length > 0) {
    renderAllShapes();
  }
}

// Prevent creating a new shape if the click is too close to the last created shape
function checkDistance() {
    if (g_lastCoords[0] !== null) {
      let dx = x- g_lastCoords[0];
      let dy = y - g_lastCoords[1];
      let distance = Math.sqrt(dx*dx + dy*dy);
      
      // Calculate distance between shapes and take their size into account
      let minDistance = (g_selectedSize / 200.0) * 0.75;
      if (distance < minDistance) {
        return false;
      }
    }
    g_lastCoords = [x, y];
    return true;
}

function checkScaleValue(scaler) {
  if (scaler > 5) {
    return maxScale;
  } else if (scaler < 0.5) {
    return minScale;
  }

  return scaler; // default
}