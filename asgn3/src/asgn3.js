// ColoredPoint.js (c) 2012 matsuda Modified by Shaun Lagon, CSE 160
function main() {
    // sets up canvas and gl variables
    setupWebGL();
    // set up GLSL shader programs and connect GLSL variables
    connectVariablesToGLSL();
    // Sets up html actions
    htmlActions();
    // document and canvas event listeners
    handleEvents();

    // Create global verts and buffers for cube, do once
    createCubeVertices();
    createCubeBuffers();
    // Create global spheer verts n buffers
    createSphereVertices(10);
    createSphereBuffers();

    initTextures();

    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    createWorld();
    requestAnimationFrame(tick);
}

function setupWebGL() {
    // Retrieve <canvas> element
    canvas = document.getElementById('webgl');
    
    // Get the rendering context for WebGL
    gl = canvas.getContext("webgl", { preserveDrawingBuffer: true });
    if (!gl) {
        console.log('Failed to get the rendering context for WebGL');
        return;
    }

    g_camera = new Camera();
    resizeCanvas(canvas);

    gl.enable(gl.DEPTH_TEST);
    // Enable alpha blending
    gl.enable(gl.BLEND);
    // Tell WebGL how to mix the transparent color with the background
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
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
    
    // Get attribute storage locations
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

    // Get uniform storage locations
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

    u_ViewMatrix = gl.getUniformLocation(gl.program, "u_ViewMatrix");
    if (!u_ViewMatrix) {
        console.log("Failed to get the storage location of u_ViewMatrix");
        return -1;
    }
    
    u_Sampler0 = gl.getUniformLocation(gl.program, 'u_Sampler0');
    if (!u_Sampler0) {
        console.log('Failed to get the storage location of u_Sampler0');
        return -1;
    }

    u_Sampler1 = gl.getUniformLocation(gl.program, 'u_Sampler1');
    if (!u_Sampler1) {
        console.log('Failed to get the storage location of u_Sampler1');
        return -1;
    }

    u_Sampler2 = gl.getUniformLocation(gl.program, 'u_Sampler2');
    if (!u_Sampler2) {
        console.log('Failed to get the storage location of u_Sampler2');
        return -1;
    }

    u_Sampler3 = gl.getUniformLocation(gl.program, 'u_Sampler3');
    if (!u_Sampler3) {
        console.log('Failed to get the storage location of u_Sampler3');
        return -1;
    }

    u_whichTexture = gl.getUniformLocation(gl.program, 'u_whichTexture');
    if (!u_whichTexture) {
        console.log('Failed to get the storage location of u_whichTexture');
        return -1;
    }

    u_UVScale = gl.getUniformLocation(gl.program, 'u_UVScale');
    if (!u_UVScale) {
        console.log('Failed to get the storage location of u_UVScale');
        return -1;
    }
}

function initTextures() {
    var debugImg = new Image();
    if (!debugImg) {
        console.log('Failed to create the image object');
        return -1;
    }
    debugImg.onload = function() { loadTexture(debugImg, u_Sampler0, 0, gl.TEXTURE0); };
    debugImg.src = "assets/uv_grid_opengl.jpg";

    var skyImage = new Image();  // Create the image object
    if (!skyImage) {
        console.log('Failed to create the image object');
        return -1;
    }
    // Register the event handler to be called on loading an image
    skyImage.onload = function() { loadTexture(skyImage, u_Sampler1, 1, gl.TEXTURE1); };
    // Tell the browser to load the sky image
    skyImage.src = "assets/sky_cloud.jpg";

    var groundImage = new Image();
    if (!groundImage) {
        console.log("Failed to create the image object");
        return -1;
    }

    groundImage.onload = function() { loadTexture(groundImage, u_Sampler2, 2, gl.TEXTURE2); };
    groundImage.src = "assets/asphalt_02_diff_4k.jpg";

    var wallImg = new Image();
    if (!wallImg) {
        console.log("Failed to create the image object");
        return -1;
    }

    wallImg.onload = function() { loadTexture(wallImg, u_Sampler3, 3, gl.TEXTURE3); };
    wallImg.src = "assets/concrete_slab_wall_02_diff_4k.jpg";
}

function loadTexture(image, sampler, texUnit, glTex) {
    var texture = gl.createTexture();   // Create a texture object
    if (!texture) {
        console.log('Failed to create the texture object');
        return false;
    }
    
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1); // Flip the image's y axis
    // Enable texture unit0
    gl.activeTexture(glTex);
    // Bind the texture object to the target
    gl.bindTexture(gl.TEXTURE_2D, texture);

    // Set the texture parameters
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);

    // gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.MIRRORED_REPEAT);
    // gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.MIRRORED_REPEAT);

    // Set the texture image
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, image);

    gl.generateMipmap(gl.TEXTURE_2D);
    
    // Set the texture unit 0 to the sampler
    gl.uniform1i(sampler, texUnit);
}

function renderAllShapes() {
    // clear canvas
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    gl.uniformMatrix4fv(u_ProjectionMatrix, false, g_camera.projectionMatrix.elements);
    gl.uniformMatrix4fv(u_ViewMatrix, false, g_camera.viewMatrix.elements);

    // Start rendering all objects in global world obj list
    for (let i = 0; i < g_worldObjs.length; ++i) {
        let obj = g_worldObjs[i];
        obj.render();
    }
}

// Redraw the canvas
function tick() {
    let now = performance.now();
    let elapsed = now - g_lastFrameTime;
    let frameInterval = 1000.0 * g_fracFPSCap;

    if (elapsed > frameInterval) {
        g_lastFrameTime = now - (elapsed % frameInterval);
        
        g_seconds = (now * 0.001) - g_startTime;
        
        g_camera.speed = (g_keys["shift"]) ? g_defaultCamSpeed * g_camSpeedMult : g_defaultCamSpeed;
        g_camera.moveCamera(g_keys);
        renderAllShapes();

        let fps = Math.round(1000.0 / elapsed);
        let msPerFrame = Math.round(elapsed);
        sendTextToHTML("ms: " + msPerFrame + " fps: " + fps + " / " + g_fpsCap, "numdot");
    };
    requestAnimationFrame(tick);
}
