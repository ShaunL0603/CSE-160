function createWorld() {
    skybox = new Sphere();
    skybox.type = "sky";
    skybox.color = [0.0, 0.0, 1.0, 1.0];
    skybox.texture = t_SKY;
    skybox.pos = null;
    skybox.matrix.scale(150.0, 150.0, 150.0);
    skybox.normalMat.setInverseOf(skybox.matrix).transpose();
    g_worldObjs.push(skybox);

    ground = new Cube();
    ground.type = "ground";
    ground.color = [0.2, 0.5, 0.2, 1.0];
    ground.texture = t_GROUND;
    ground.UVScale = 5.0;
    ground.matrix.translate(-20.0, -0.2, -20.0);
    ground.matrix.scale(40, 0.2, 40);
    ground.normalMat.setInverseOf(ground.matrix).transpose();
    g_worldObjs.push(ground);

    g_sun = new Sphere();
    g_sun.type = "sun";
    g_sun.color = [1.0, 1.0, 0.0, 1.0];
    g_sun.texture = t_COLOR;
    g_sun.showTexture = false;
    g_sun.matrix.translate(
        g_sunPos[0], 
        g_sunPos[1], 
        g_sunPos[2]
    );
    g_sun.matrix.scale(g_sunScale, g_sunScale, g_sunScale);
    g_sun.pos = null;
    g_worldObjs.push(g_sun);

    g_flashlight = new Sphere();
    g_flashlight.type = "flashLight";
    g_flashlight.color = [1.0, 0.0, 0.0, 0.0];
    g_flashlight.texture = t_COLOR;
    g_flashlight.showTexture = false;
    g_flashlight.matrix.translate(
        g_camera.eye.elements[0], 
        g_camera.eye.elements[1],
        g_camera.eye.elements[2]
    );
    g_flashlight.matrix.scale(g_flScale, g_flScale, g_flScale);
    g_flashlight.pos = null;
    g_worldObjs.push(g_flashlight);

    // Default map to load to
    createRange();
    createTargetsForRange();
}