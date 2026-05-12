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

    a_Normal = gl.getAttribLocation(gl.program, "a_Normal");
    if (a_UV < 0) {
        console.log("Failed to get storage location of a_Normal");
        return -1;
    }

    // Get uniform storage locations
    u_FragColor = gl.getUniformLocation(gl.program, "u_FragColor");
    if (!u_FragColor) {
        console.log('Failed to get the storage location of u_FragColor');
        return -1;
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

    u_Sampler4 = gl.getUniformLocation(gl.program, 'u_Sampler4');
    if (!u_Sampler4) {
        console.log('Failed to get the storage location of u_Sampler4');
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