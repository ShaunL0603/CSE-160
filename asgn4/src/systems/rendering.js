function renderAllShapes() {
    // clear canvas
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    gl.uniformMatrix4fv(u_ProjectionMatrix, false, g_camera.projectionMatrix.elements);
    gl.uniformMatrix4fv(u_ViewMatrix, false, g_camera.viewMatrix.elements);

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
        // Main rendering
        handleRespawning();
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