function initFramebufferObject(shadowWidth, shadowHeight) {
    // Enabling Depth Texture Extension
    var ext = gl.getExtension("WEBGL_depth_texture");
    if (!ext) {
        console.error("Your browser does not support WEBGL_depth_texture");
        return null;
    };

    // Create custom Framebuffer
    var framebuffer = gl.createFramebuffer();

    // Create the Texture object that will act as our "Canvas"
    var depthTexture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, depthTexture);
    
    // Allocate memory for the texture (Note the use of gl.DEPTH_COMPONENT)
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.DEPTH_COMPONENT, shadowWidth, shadowHeight, 0, gl.DEPTH_COMPONENT, gl.UNSIGNED_SHORT, null);

    // Set texture filtering parameters
    // Shadows don't need smooth blending, so we use NEAREST
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
    
    // Clamp to edge so shadows don't repeat infinitely outside light's view
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

    // Attach the Texture to the Framebuffer
    gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffer);
    gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.TEXTURE_2D, depthTexture, 0);

    // Check if the FBO is configured correctly
    var FBO = gl.checkFramebufferStatus(gl.FRAMEBUFFER);
    if (FBO !== gl.FRAMEBUFFER_COMPLETE) {
        console.error("Framebuffer object is incomplete: " + FBO.toString());
        return null;
    }

    // Unbind them to return WebGL to its default "draw to screen" state
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    gl.bindTexture(gl.TEXTURE_2D, null);

    // Return an object holding our new tools so we can use them later
    return {
        fbo: framebuffer,
        texture: depthTexture,
        width: shadowWidth,
        height: shadowHeight
    };
}

function createShadowFBOs() {
    // Defining reslution of shadow map for sun and flashlight
    let sunOffscreenWidth = 4096;
    let sunOffscreenHeight = 4096;
    
    g_shadowMapFBO = initFramebufferObject(sunOffscreenWidth, sunOffscreenHeight);
    if (!g_shadowMapFBO) {
        console.error("Failed to initialize Framebuffer Object for shadow mapping.");
        return -1;
    }
}

function updateSunCamera() {
    // Projection (Sun's "Lens")
    // Defining the size of the shadow bounding box
    let boxSize = 20.0;
    let centerY = 1.5;
    let centerZ = 0.0;
    if (g_currMap === RANGE) {
        centerY = 5.0;
        centerZ = -5.0;
    }
    if (g_currMap === RANDOM) boxSize = g_currMapSize * 1.5;
    
    g_sunProjMatrix.setOrtho(-boxSize, boxSize, -boxSize, boxSize, 0.1, 250.0);

    // The View (Positioning the Sun)
    g_sunViewMatrix.setLookAt(
        g_sunPos[0], g_sunPos[1], g_sunPos[2],  // Eye: Where the sun currently is
        0.0, centerY, centerZ,                  // Target: Looking directly at the center of the map
        0.0, 1.0, 0.0                           // Up: Y-axis is up
    );
}