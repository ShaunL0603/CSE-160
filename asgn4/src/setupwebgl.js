function setupWebGL() {
    // Retrieve <canvas> element
    canvas = document.getElementById('webgl');
    
    // Get the rendering context for WebGL
    gl = canvas.getContext("webgl", { preserveDrawingBuffer: true });
    if (!gl) {
        console.log('Failed to get the rendering context for WebGL');
        return;
    }

    createPrograms();
    g_camera = new Camera();
    resizeCanvas(canvas);

    gl.enable(gl.DEPTH_TEST);
    // Enable alpha blending
    gl.enable(gl.BLEND);
    // Tell WebGL how to mix the transparent color with the background
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
}

function createPrograms() {
    // compile main shader program
    g_mainProgram = createProgram(gl, VSHADER_SOURCE, FSHADER_SOURCE);
    // compile shadow shader program
    g_shadowProgram = createProgram(gl, VSHADER_SOURCE_SHADOW, SHADOW_FSHADER_SOURCE);
    // compile flashlight shadow shader program
    g_FLShadowProgram = createProgram(gl, VSHADER_SOURCE_SHADOW_FL, SHADOW_FL_FSHADER_SOURCE);
    if (!g_mainProgram || !g_shadowProgram || !g_FLShadowProgram) {
        console.log('Failed to create shader programs.');
        return;
    }

    // Tell WebGL to start by using the main program
    gl.useProgram(g_mainProgram);
    gl.program = g_mainProgram;
}

function connectVariablesToGLSL() {
    gl.useProgram(g_mainProgram);
    gl.program = g_mainProgram;
    
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
    if (a_Normal < 0) {
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
    u_NormalMatrix = gl.getUniformLocation(gl.program, "u_NormalMatrix");
    if (!u_NormalMatrix) {
        console.log("Failed to get the storage location of u_NormalMatrix");
        return -1;
    }

    // --- VECS ---
    u_LightPos = gl.getUniformLocation(gl.program, 'u_LightPos');
    if (!u_LightPos) {
        console.log('Failed to get the storage location of u_LightPos');
        return -1;
    }
    u_CameraPos = gl.getUniformLocation(gl.program, 'u_CameraPos');
    if (!u_CameraPos) {
        console.log('Failed to get the storage location of u_CameraPos');
        return -1;
    }
    u_CameraAtPos = gl.getUniformLocation(gl.program, 'u_CameraAtPos');
    if (!u_CameraAtPos) {
        console.log('Failed to get the storage location of u_CameraAtPos');
        return -1;
    }
    u_LightColor = gl.getUniformLocation(gl.program, 'u_LightColor');
    if (!u_LightColor) {
        console.log('Failed to get the storage location of u_LightColor');
        return -1;
    }
    
    // --- TEXUTRE SAMPLERS ---
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

    // --- NUMBERS ---
    u_UVScale = gl.getUniformLocation(gl.program, 'u_UVScale');
    if (!u_UVScale) {
        console.log('Failed to get the storage location of u_UVScale');
        return -1;
    }
    u_Shininess = gl.getUniformLocation(gl.program, 'u_Shininess');
    if (!u_Shininess) {
        console.log('Failed to get the storage location of u_Shininess');
        return -1;
    }

    // --- BOOLS ---
    u_ShowNormals = gl.getUniformLocation(gl.program, 'u_ShowNormals');
    if (!u_ShowNormals) {
        console.log('Failed to get the storage location of u_ShowNormals');
        return -1;
    }
    u_ShowTexture = gl.getUniformLocation(gl.program, 'u_ShowTexture');
    if (!u_ShowTexture) {
        console.log('Failed to get the storage location of u_ShowTexture');
        return -1;
    }
    u_WhichTexture = gl.getUniformLocation(gl.program, 'u_WhichTexture');
    if (!u_WhichTexture) {
        console.log('Failed to get the storage location of u_WhichTexture');
        return -1;
    }
    u_LightOn = gl.getUniformLocation(gl.program, 'u_LightOn');
    if (!u_LightOn) {
        console.log('Failed to get the storage location of u_LightOn');
        return -1;
    }
    u_FlashlightOn = gl.getUniformLocation(gl.program, 'u_FlashlightOn');
    if (!u_FlashlightOn) {
        console.log('Failed to get the storage location of u_FlashlightOn');
        return -1;
    }
    u_ShadowsOn = gl.getUniformLocation(gl.program, 'u_ShadowsOn');
    if (!u_ShadowsOn) {
        console.log('Failed to get the storage location of u_ShadowsOn');
        return -1;
    }

    // --- FOR SHADOWS ---
        // --- SHADOW MAP FOR SUN ---
        u_LightViewMatrix = gl.getUniformLocation(gl.program, 'u_LightViewMatrix');
        if (!u_LightViewMatrix) {
            console.log('Failed to get the storage location of u_LightViewMatrix');
            return -1;
        }
        u_LightProjMatrix = gl.getUniformLocation(gl.program, 'u_LightProjMatrix');
        if (!u_LightProjMatrix) {
            console.log('Failed to get the storage location of u_LightProjMatrix');
            return -1;
        }
        u_ShadowMapSampler = gl.getUniformLocation(gl.program, 'u_ShadowMapSampler');
        if (!u_ShadowMapSampler) {
            console.log('Failed to get the storage location of u_ShadowMapSampler');
            return -1;
        }
        // --- SHADOW MAP FOR FLASHLIGHT ---
        u_FLLightViewMatrix = gl.getUniformLocation(gl.program, 'u_FLLightViewMatrix');
        if (!u_FLLightViewMatrix) {
            console.log('Failed to get the storage location of u_FLLightViewMatrix for flashlight shadow map');
            return -1;
        }
        u_FLLightProjMatrix = gl.getUniformLocation(gl.program, 'u_FLLightProjMatrix');
        if (!u_FLLightProjMatrix) {
            console.log('Failed to get the storage location of u_FLLightProjMatrix for flashlight shadow map');
            return -1;
        }
        u_ShadowFLMapSampler = gl.getUniformLocation(gl.program, 'u_ShadowFLMapSampler');
        if (!u_ShadowFLMapSampler) {
            console.log('Failed to get the storage location of u_ShadowFLMapSampler for flashlight shadow map');
            return -1;
        }
}

function getShadowLocations() {
    // temporarily set WebGL to the shadow program
    gl.useProgram(g_shadowProgram);
    gl.program = g_shadowProgram;

    // --- SHADOW MAP FOR SUN ---
    // Get attribute storage locations
    a_ShadowPosition = gl.getAttribLocation(gl.program, "a_Position");
    if (a_ShadowPosition < 0) {
        console.log("Failed to get the storage location of a_Position");
        return -1;
    }
    // Get uniform storage locations
    u_ShadowModelMatrix = gl.getUniformLocation(gl.program, "u_ModelMatrix");
    if (!u_ShadowModelMatrix) {
        console.log("Failed to get the storage location of u_ModelMatrix");
        return -1;
    }
    u_ShadowLightViewMatrix = gl.getUniformLocation(gl.program, "u_LightViewMatrix");
    if (!u_ShadowLightViewMatrix) {
        console.log("Failed to get the storage location of u_LightViewMatrix");
        return -1;
    }
    u_ShadowLightProjMatrix = gl.getUniformLocation(gl.program, "u_LightProjMatrix");
    if (!u_ShadowLightProjMatrix) {
        console.log("Failed to get the storage location of u_LightProjMatrix");
        return -1;
    }

    gl.useProgram(g_FLShadowProgram);
    gl.program = g_FLShadowProgram;
    // --- SHADOW MAP FOR FLASHLIGHT ---
    a_ShadowFLPosition = gl.getAttribLocation(gl.program, "a_ShadowFLPosition");
    if (a_ShadowFLPosition < 0) {
        console.log("Failed to get the storage location of a_ShadowFLPosition for flashlight shadow map");
        return -1;
    }
    u_ShadowFLModelMatrix = gl.getUniformLocation(gl.program, "u_ShadowFLModelMatrix");
    if (!u_ShadowFLModelMatrix) {
        console.log("Failed to get the storage location of u_ShadowFLModelMatrix for flashlight shadow map");
        return -1;
    }
    u_ShadowFLLightViewMatrix = gl.getUniformLocation(gl.program, "u_ShadowFLLightViewMatrix");
    if (!u_ShadowFLLightViewMatrix) {
        console.log("Failed to get the storage location of u_ShadowFLLightViewMatrix for flashlight shadow map");
        return -1;
    }
    u_ShadowFLLightProjMatrix = gl.getUniformLocation(gl.program, "u_ShadowFLLightProjMatrix");
    if (!u_ShadowFLLightProjMatrix) {
        console.log("Failed to get the storage location of u_ShadowFLLightProjMatrix for flashlight shadow map");
        return -1;
    }

    // switch back to main program
    gl.useProgram(g_mainProgram);
    gl.program = g_mainProgram;
}