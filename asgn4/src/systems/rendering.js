function renderAllShapes() {
    // clear canvas
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    gl.uniformMatrix4fv(u_ProjectionMatrix, false, g_camera.projectionMatrix.elements);
    gl.uniformMatrix4fv(u_ViewMatrix, false, g_camera.viewMatrix.elements);
    gl.uniform1i(u_LightOn, g_LightOn ? 1 : 0);
    gl.uniform3f(u_LightPos, g_sunPos[0], g_sunPos[1], g_sunPos[2]);
    gl.uniform3f(u_CameraPos, g_camera.eye.elements[0], g_camera.eye.elements[1], g_camera.eye.elements[2]);
    gl.uniform3f(u_LightColor, 2.0, 1.9, 1.5);

    if (g_currMap == RANDOM && g_mergedMapVertBuffer) {
        renderMap();
    }

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

let shadowMat = new Matrix4();
function renderMapShadows() {
    // Force solid color mode and pass the shadow color
    gl.uniform1i(u_WhichTexture, t_COLOR);
    gl.uniform4f(u_FragColor, 0.0, 0.0, 0.0, 0.8);

    // Create an identity matrix, then squash it using the light position
    shadowMat.dropShadowDirectionally(
        0, 1, 0, 
        0, 0, 0, 
        g_sunPos[0], g_sunPos[1], g_sunPos[2]
    );
    
    // Pass the squashed matrix to the shader
    gl.uniformMatrix4fv(u_ModelMatrix, false, shadowMat.elements);

    // Bind position buffer and draw! (No need to bind UVs/Normals for shadows)
    gl.bindBuffer(gl.ARRAY_BUFFER, g_mergedMapVertBuffer);
    gl.vertexAttribPointer(a_Position, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(a_Position);

    gl.drawArrays(gl.TRIANGLES, 0, g_mergedMapVerts.length / 3);
}

// Redraw the canvas
function tick() {
    let now = performance.now();
    let elapsed = now - g_lastFrameTime;
    let frameInterval = 1000.0 * g_invFPSCap;
    
    g_camera.speed = (g_keys["shift"]) ? g_camSpeed * g_camSpeedMult : g_camSpeed;
    g_camera.moveCamera(g_keys);

    if (elapsed > frameInterval) {
        g_lastFrameTime = now - (elapsed % frameInterval);
        g_seconds = (now * 0.001) - g_startTime;

        resizeCanvas(canvas);
        // Main rendering
        handleRespawning();
        if (g_toggleLightPath) updateAnimationAngles();
        moveFlashlight();
        renderAllShapes();
        
        if (now - g_lastFPSUpdateTime > 500) {
            let fps = Math.round(1000.0 / elapsed);
            let msPerFrame = Math.round(elapsed);
            
            let text = `ms: ${msPerFrame} fps: ${fps} / ${g_fpsCap}`;
            sendTextToHTML(text, "numdot");
            g_lastFPSUpdateTime = now;
        }
    };
    requestAnimationFrame(tick);
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
    moveLight();
}

function moveFlashlight() {
    g_flashlight.matrix.setTranslate(
        g_camera.eye.elements[0], 
        g_camera.eye.elements[1],
        g_camera.eye.elements[2]
    );
    g_flashlight.matrix.scale(g_flScale, g_flScale, g_flScale);
}

function moveLight() {
    let x = g_sunPos[0];
    let y = g_sunPos[1];
    let z = g_sunPos[2];

    g_sun.matrix.setTranslate(x, y, z);
    g_sun.matrix.scale(g_sunScale, g_sunScale, g_sunScale);
}
