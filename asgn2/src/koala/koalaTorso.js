function makeKoalaTorso(rootCubeMat) {
    var upperTorso1 = new Cube();
    upperTorso1.color = g_koalaGreyColorMat;
    upperTorso1.matrix = new Matrix4(rootCubeMat);
    upperTorso1.matrix.translate(-9.75, -4.275, -4.5);
    var upperTorso1Mat = new Matrix4(upperTorso1.matrix);
    upperTorso1.matrix.scale(g_koalaScaleX * 3.5, g_koalaScaleY * 3.25, g_koalaScaleZ * 3.0);
    upperTorso1.render();

    var upperTorso2 = new Cube();
    upperTorso2.color = g_koalaGreyColorMat;
    upperTorso2.matrix = new Matrix4(upperTorso1Mat);
    upperTorso2.matrix.translate(-3.0, 0.35, 0.2);
    upperTorso2.matrix.scale(g_koalaScaleX * 2.0, g_koalaScaleY * 3.2, g_koalaScaleZ * 2.85);
    upperTorso2.render();

    var lowerTorso1 = new Cube();
    lowerTorso1.color = g_koalaGreyColorMat;
    lowerTorso1.matrix = new Matrix4(rootCubeMat);
    lowerTorso1.matrix.translate(4.5, -4.075, -4.875);
    var lowerTorso1Mat = new Matrix4(lowerTorso1.matrix);
    lowerTorso1.matrix.scale(g_koalaScaleX * 5.0, g_koalaScaleY * 3.25, g_koalaScaleZ * 3.25);
    lowerTorso1.render();

    var lowerTorso2 = new Cube();
    lowerTorso2.color = g_koalaGreyColorMat;
    lowerTorso2.matrix = new Matrix4(lowerTorso1Mat);
    lowerTorso2.matrix.translate(7.5, -0.2, 0.0);
    lowerTorso2.matrix.scale(g_koalaScaleX * 4.0, g_koalaScaleY * 3.3, g_koalaScaleZ * 3.25);
    lowerTorso2.render();

    var backNeck1 = new Cube();
    backNeck1.color = g_koalaGreyColorMat;
    backNeck1.matrix = new Matrix4(rootCubeMat);
    backNeck1.matrix.translate(-7.0, 5.0, 0.0);
    backNeck1.matrix.rotate(22.5, 0, 0, 1);
    backNeck1.matrix.scale(g_koalaScaleX * 2.0, g_koalaScaleY * 2.0, g_koalaScaleZ * 2.7);
    backNeck1.matrix.translate(-0.5, -0.5, -0.5);
    backNeck1.render();

    var backNeck2 = new Cube();
    backNeck2.color = g_koalaGreyColorMat;
    backNeck2.matrix = new Matrix4(rootCubeMat);
    backNeck2.matrix.translate(-8.1, 6.7, 0.0);
    backNeck2.matrix.rotate(80, 0, 0, 1);
    backNeck2.matrix.scale(g_koalaScaleX * 2.5, g_koalaScaleY * 0.7, g_koalaScaleZ * 2.7);
    backNeck2.matrix.translate(-0.5, -0.5, -0.5);
    backNeck2.render();

    // var backNeck3 = new Cube();
    // backNeck3.color = g_koalaGreyColorMat;
    // backNeck3.matrix = new Matrix4(rootCubeMat);
    // backNeck3.matrix.translate(-8.8, 7.1, 0.0);
    // backNeck3.matrix.rotate(90, 0, 0, 1);
    // backNeck3.matrix.scale(g_koalaScaleX * 2.5, g_koalaScaleY * 0.61, g_koalaScaleZ * 2.7);
    // backNeck3.matrix.translate(-0.5, -0.5, -0.5);
    // backNeck3.render();
}