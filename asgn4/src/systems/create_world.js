function createWorld() {
    g_skybox = new Sphere();
    g_skybox.type = "sky";
    g_skybox.color = [0.0, 0.0, 1.0, 1.0];
    g_skybox.texture = t_SKY;
    g_skybox.pos = null;
    g_skybox.matrix.scale(1000.0, 1000.0, 1000.0);
    g_worldObjs.push(g_skybox);

    g_ground = new Cube();
    g_ground.type = "ground";
    g_ground.color = [0.2, 0.5, 0.2, 1.0];
    g_ground.texture = t_GROUND;
    g_ground.UVScale = 5.0;
    g_ground.matrix.translate(-20.0, -0.2, -20.0);
    g_ground.matrix.scale(40, 0.2, 40);
    g_worldObjs.push(g_ground);

    g_light = new Sphere();
    g_light.type = "light";
    g_light.color = [1.0, 1.0, 0.0, 1.0];
    g_light.texture = t_COLOR;
    g_light.matrix.translate(
        g_lightPos[0], 
        g_lightPos[1], 
        g_lightPos[2]
    );
    g_light.pos = g_lightPos;
    g_light.matrix.scale(g_lightScale, g_lightScale, g_lightScale);
    g_worldObjs.push(g_light);

    // Default map to load to
    createRange();
    createTargetsForRange();
}