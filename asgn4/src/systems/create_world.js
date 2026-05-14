function createWorld() {
    g_skybox = new Sphere();
    g_skybox.type = "sky";
    g_skybox.color = [0.0, 0.0, 1.0, 1.0];
    g_skybox.texture = t_SKY;
    g_skybox.pos = null;
    g_skybox.matrix.scale(1000.0, 1000.0, 1000.0);
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

    // Default map to load to
    createRange();
    createTargetsForRange();
}