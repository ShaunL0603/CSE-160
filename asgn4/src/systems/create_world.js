function createWorld() {
    g_skybox = new Sphere();
    g_skybox.type = "sky";
    g_skybox.color = [0.0, 0.0, 1.0, 1.0];
    g_skybox.texture = t_SKY;
    g_skybox.pos = null;
    g_skybox.matrix.scale(150.0, 150.0, 150.0);
    g_skybox.normalMat.setInverseOf(g_skybox.matrix).transpose();
    g_worldObjs.push(g_skybox);

    g_ground = new Cube();
    g_ground.type = "ground";
    g_ground.color = [0.2, 0.5, 0.2, 1.0];
    g_ground.texture = t_GROUND;
    g_ground.UVScale = 5.0;
    g_ground.matrix.translate(-20.0, -0.2, -20.0);
    g_ground.matrix.scale(40, 0.2, 40);
    g_ground.normalMat.setInverseOf(g_ground.matrix).transpose();
    g_worldObjs.push(g_ground);

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

    bears = new CustomModel();
    bears.subtype = "bears";
    bears.matrix.translate(0.0, 0.0, 5.0);
    bears.loadOBJ("../objects/customObjs/WeBareBears/bears.obj");
    g_worldObjs.push(bears);


    // Default map to load to
    createRange();
    createTargetsForRange();
}