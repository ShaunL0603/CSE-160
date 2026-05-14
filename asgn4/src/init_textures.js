function initTextures() {
    var debugImg = new Image();
    if (!debugImg) {
        console.log('Failed to create the image object');
        return -1;
    }
    debugImg.onload = function() { loadTexture(debugImg, u_Sampler0, 0, gl.TEXTURE0); };
    debugImg.src = "assets/textures/uv_grid_opengl.jpg";

    var skyImage = new Image();  // Create the image object
    if (!skyImage) {
        console.log('Failed to create the image object');
        return -1;
    }
    // Register the event handler to be called on loading an image
    skyImage.onload = function() { loadTexture(skyImage, u_Sampler1, 1, gl.TEXTURE1); };
    // Tell the browser to load the sky image
    skyImage.src = "assets/textures/sky_cloud.jpg";

    var groundImage = new Image();
    if (!groundImage) {
        console.log("Failed to create the image object");
        return -1;
    }

    groundImage.onload = function() { loadTexture(groundImage, u_Sampler2, 2, gl.TEXTURE2); };
    groundImage.src = "assets/textures/asphalt_02_diff_4k.jpg";

    var wallImg = new Image();
    if (!wallImg) {
        console.log("Failed to create the image object");
        return -1;
    }

    wallImg.onload = function() { loadTexture(wallImg, u_Sampler3, 3, gl.TEXTURE3); };
    wallImg.src = "assets/textures/concrete_slab_wall_02_diff_4k.jpg";

    var wallImg2 = new Image();
    if (!wallImg2) {
        console.log("Failed to create the image object");
        return -1;
    }

    wallImg2.onload = function() { loadTexture(wallImg2, u_Sampler4, 4, gl.TEXTURE4); };
    wallImg2.src = "assets/textures/concrete_tile_facade_disp_4k.png";
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

    // Set the texture image
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, image);

    gl.generateMipmap(gl.TEXTURE_2D);
    
    gl.useProgram(g_mainProgram);
    // Set the texture unit 0 to the sampler
    gl.uniform1i(sampler, texUnit);
}