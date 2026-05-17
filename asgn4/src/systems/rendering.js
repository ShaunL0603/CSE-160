function renderAllShapes() {
    // First render shadows to texture
    if (g_toggleShadows) renderShadows();
    // switch back to HTML canvas
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    // Reset viewport to canvas size
    gl.viewport(0, 0, canvas.width, canvas.height);
    // clear canvas
    // gl.clearColor(0.0, 0.5, 0.0, 1.0); // debugging
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    // Use main shader program
    gl.useProgram(g_mainProgram);
    // Take the texture we just drew when rendering shadows, and hand it to the Main Shader
    gl.activeTexture(gl.TEXTURE5); // texture unit 5 for sun shadows
    gl.bindTexture(gl.TEXTURE_2D, g_shadowMapFBO.texture);
    gl.uniform1i(u_ShadowMapSampler, 5);
    // Passing Sun's camera matrices to the Main Shader as well
    // Main shader needs to know where the sun was to align the image properly
    gl.uniformMatrix4fv(u_LightViewMatrix, false, g_sunViewMatrix.elements);
    gl.uniformMatrix4fv(u_LightProjMatrix, false, g_sunProjMatrix.elements);

    gl.uniformMatrix4fv(u_ProjectionMatrix, false, g_camera.projectionMatrix.elements);
    gl.uniformMatrix4fv(u_ViewMatrix, false, g_camera.viewMatrix.elements);
    gl.uniform1i(u_LightOn, g_LightOn ? 1 : 0);
    gl.uniform1i(u_FlashlightOn, g_FlashlightOn ? 1 : 0);
    gl.uniform1i(u_ShadowsOn, g_toggleShadows ? 1 : 0);
    gl.uniform3f(u_LightPos, g_sunPos[0], g_sunPos[1], g_sunPos[2]);
    gl.uniform3f(u_CameraPos, g_camera.eye.elements[0], g_camera.eye.elements[1], g_camera.eye.elements[2]);
    gl.uniform3f(u_CameraAtPos, g_camera.at.elements[0], g_camera.at.elements[1], g_camera.at.elements[2]);
    gl.uniform3f(u_LightColor, 2.0, 1.9, 1.5);

    if (g_currMap == RANDOM && g_mergedMapVertBuffer) renderMap();

    // Start rendering all objects in global world obj list
    for (let i = 0; i < g_worldObjs.length; ++i) {
        let obj = g_worldObjs[i];
        
        // Only render objects that are active
        if (obj.active) {
            // Don't render transparent objects (hitbox)
            if (obj.color && obj.color[3] == 0.0) continue;
            // skip objects outside camera's vision
            if (!isObjVisible(obj)) continue;
            
            obj.render();
        }
    }
}

/**
 * Cone culling, don't render anything behind the camera
 * along with any obj beyond the 60 degree fov of the camera
 * @param {*} obj object to do culling math on
 * @returns boolean, is obj within camera fov
 */
function isObjVisible(obj) {
    // avoid objects with empty/no pos array (like ground)
    if (!obj.pos) return true;
    let maxDrawDist = 100.0;

    // get direction vector
    let dx = obj.pos[0] - g_camera.eye.elements[0];
    let dy = obj.pos[1] - g_camera.eye.elements[1];
    let dz = obj.pos[2] - g_camera.eye.elements[2];

    // first check if the distance squared is greater than our
    // max distance squared to avoid unnecessary math
    let distSqr = dx*dx + dy*dy + dz*dz;
    if (distSqr > maxDrawDist*maxDrawDist) return false;

    let dist = Math.sqrt(distSqr);
    // if the distance is less than 1 then obj is right next to camera
    if (dist < 1.0) return true;

    let invDist = 1 / dist; // divide once multiply a bunch later
    // normalize vector pointing to object
    g_tempVec.elements[0] = dx * invDist;
    g_tempVec.elements[1] = dy * invDist;
    g_tempVec.elements[2] = dz * invDist;
    let dotProduct = Vector3.dot(g_tempVec, g_camera.forwardVec);

    let paddingAngle = g_camera.fov;
    let threshold = Math.cos(paddingAngle * degToRad);
    return dotProduct >= threshold;
}

function renderShadows() {
    // First update sun camera
    updateSunCamera();
    // Bind the shadow framebuffer
    gl.bindFramebuffer(gl.FRAMEBUFFER, g_shadowMapFBO.fbo);
    // Set the viewport to the size of the shadow map
    gl.viewport(0, 0, g_shadowMapFBO.width, g_shadowMapFBO.height);
    // Clear the depth buffer
    gl.clear(gl.DEPTH_BUFFER_BIT);
    // Use shadow shader
    gl.useProgram(g_shadowProgram);
    
    // pass sun's camera matrices to shadow shader
    gl.uniformMatrix4fv(u_ShadowLightViewMatrix, false, g_sunViewMatrix.elements);
    gl.uniformMatrix4fv(u_ShadowLightProjMatrix, false, g_sunProjMatrix.elements);

    // Draw geometry
    if (g_currMap === RANDOM) drawMapShadows();
    drawObjsShadows();
}

function drawMapShadows() {
    if (!g_mergedMapVertBuffer) return;

    // Setting the Model Matrix
    gl.uniformMatrix4fv(u_ShadowModelMatrix, false, identityMat.elements);

    // Bind position buffer
    gl.bindBuffer(gl.ARRAY_BUFFER, g_mergedMapVertBuffer);
    gl.vertexAttribPointer(a_ShadowPosition, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(a_ShadowPosition);

    gl.drawArrays(gl.TRIANGLES, 0, randMapIndices);
}

function drawObjsShadows() {
    for (let i = 0; i < g_worldObjs.length; ++i) {
        let obj = g_worldObjs[i];
        if (!obj.active) continue;
        // Don't render shadows for light sources
        if (obj.type === "sun" || obj.type === "flashlight") continue;
        // Don't render transparent objects (hitbox)
        if (obj.color && obj.color[3] == 0.0) continue;
        // Setting the Model Matrix
        gl.uniformMatrix4fv(u_ShadowModelMatrix, false, obj.matrix.elements);

        // Bind position buffer
        var currBuffer;
        let currVertCount = 0;
        // Apparently instanceof can be more costly but use it anyways
        if (renderCubeShadows.includes(obj.type)) {
            currBuffer = g_cubeVertBuffer;
            currVertCount = cubeVertLen;
        } else if (renderSphereShadows.includes(obj.type)) {
            currBuffer = g_sphereVertBuffer;
            currVertCount = g_sphereVertices.length / 3;
        } else if (obj.type === "customModel") {
            if (!obj.loaded) continue; // don't try to render shadow if model isn't loaded yet
            currBuffer = obj.vertBuffer;
            currVertCount = obj.vertexCount;
        } else {
            // console.warn("Error: unrecognized obj type in shadow rendering", obj);
            continue;
        }

        gl.bindBuffer(gl.ARRAY_BUFFER, currBuffer);
        gl.vertexAttribPointer(a_ShadowPosition, 3, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(a_ShadowPosition);
        gl.drawArrays(gl.TRIANGLES, 0, currVertCount);
    }
}

function updateAnimationAngles() {
    // Circular path for light cube
    angle += 0.001;
    if (angle > Math.PI * 2) angle = 0;

    let newx = cx + radius * Math.cos(angle);
    let newy = cy + (radius * Math.sin(angle)) * Math.cos(tilt);
    let newz = cz + (radius * Math.sin(angle)) * Math.sin(tilt);

    g_sunPos[0] = newx;
    g_sunPos[1] = newy;
    g_sunPos[2] = newz;
    g_sun.matrix.setTranslate(g_sunPos[0], g_sunPos[1], g_sunPos[2]);
    g_sun.matrix.scale(g_sunScale, g_sunScale, g_sunScale);
}

function moveFlashlight() {
    g_flashlight.matrix.setTranslate(
        g_camera.eye.elements[0], 
        g_camera.eye.elements[1],
        g_camera.eye.elements[2]
    );
    g_flashlight.matrix.scale(g_flScale, g_flScale, g_flScale);
}