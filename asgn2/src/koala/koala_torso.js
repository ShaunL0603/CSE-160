

function makeKoalaTorso(rootCubeMat) {
    var upperTorso1 = new Cube();
    upperTorso1.color = g_koalaGreyColorMat;
    upperTorso1.matrix = new Matrix4(rootCubeMat);
    upperTorso1.matrix.translate(-6.5 * g_koalaScaleX, -1.5 * g_koalaScaleY, -1.5 * g_koalaScaleZ);
    var upperTorso1Mat = new Matrix4(upperTorso1.matrix);
    upperTorso1.matrix.scale(g_koalaScaleX * 3.5, g_koalaScaleY * 3.25, g_koalaScaleZ * 3.0);
    upperTorso1.render();

    var upperTorso2 = new Cube();
    upperTorso2.color = g_koalaGreyColorMat;
    upperTorso2.matrix = new Matrix4(upperTorso1Mat);
    upperTorso2.matrix.translate(-2.0 * g_koalaScaleX, 0.1 * g_koalaScaleY, 0.1 * g_koalaScaleZ);
    var upperTorso2Mat = new Matrix4(upperTorso2.matrix);
    upperTorso2.matrix.scale(g_koalaScaleX * 2.0, g_koalaScaleY * 3.2, g_koalaScaleZ * 2.85);
    upperTorso2.render();

    var lowerTorso1 = new Cube();
    lowerTorso1.color = g_koalaGreyColorMat;
    lowerTorso1.matrix = new Matrix4(upperTorso1Mat);
    lowerTorso1.matrix.translate(9.5 * g_koalaScaleX, 0.17 * g_koalaScaleY, -0.13 * g_koalaScaleZ);
    var lowerTorso1Mat = new Matrix4(lowerTorso1.matrix);
    lowerTorso1.matrix.scale(g_koalaScaleX * 5.0, g_koalaScaleY * 3.25, g_koalaScaleZ * 3.25);
    lowerTorso1.render();

    var lowerTorso2 = new Cube();
    lowerTorso2.color = g_koalaGreyColorMat;
    lowerTorso2.matrix = new Matrix4(lowerTorso1Mat);
    lowerTorso2.matrix.translate(5 * g_koalaScaleX, -0.07 * g_koalaScaleY, 0.0);
    var lowerTorso2Mat = new Matrix4(lowerTorso2.matrix);
    lowerTorso2.matrix.scale(g_koalaScaleX * 4.0, g_koalaScaleY * 3.3, g_koalaScaleZ * 3.25);
    lowerTorso2.render();

    var backNeck1 = new Cube();
    backNeck1.color = g_koalaGreyColorMat;
    backNeck1.matrix = new Matrix4(upperTorso1Mat);
    backNeck1.matrix.translate(2.0 * g_koalaScaleX, 3.0 * g_koalaScaleY, 1.5 * g_koalaScaleZ);
    backNeck1.matrix.rotate(22.5, 0, 0, 1);
    backNeck1.matrix.scale(g_koalaScaleX * 2.0, g_koalaScaleY * 2.0, g_koalaScaleZ * 2.7);
    backNeck1.matrix.translate(-0.5, -0.5, -0.5);
    backNeck1.render();

    var backNeck2 = new Cube();
    backNeck2.color = g_koalaGreyColorMat;
    backNeck2.matrix = new Matrix4(upperTorso1Mat);
    backNeck2.matrix.translate(1.0 * g_koalaScaleX, 3.6 * g_koalaScaleY, 1.5 * g_koalaScaleZ);
    backNeck2.matrix.rotate(80, 0, 0, 1);
    backNeck2.matrix.scale(g_koalaScaleX * 2.5, g_koalaScaleY * 0.9, g_koalaScaleZ * 2.7);
    backNeck2.matrix.translate(-0.5, -0.5, -0.5);
    backNeck2.render();

    var leftSide = new Cube();
    leftSide.color = g_koalaGreyColorMat;
    leftSide.matrix = new Matrix4(upperTorso2Mat);
    leftSide.matrix.translate(0.1 * g_koalaScaleX, 0.72 * g_koalaScaleY, -1.3 * g_koalaScaleZ);
    leftSide.matrix.rotate(10, 1, 0, 0);
    leftSide.matrix.scale(2.0 * g_koalaScaleX, 2.8 * g_koalaScaleY, 1.3 * g_koalaScaleZ);
    leftSide.render();

    var leftSide2 = new Cube();
    leftSide2.color = g_koalaGreyColorMat;
    leftSide2.matrix = new Matrix4(upperTorso1Mat);
    leftSide2.matrix.translate(-0.99 * g_koalaScaleX, 0.67 * g_koalaScaleY, -1.23 * g_koalaScaleZ);
    leftSide2.matrix.rotate(10, 1, 0, 0);
    leftSide2.matrix.rotate(-10, 0, 0, 1);
    leftSide2.matrix.scale(3.5 * g_koalaScaleX, 3.0 * g_koalaScaleY, 1.3 * g_koalaScaleZ);
    leftSide2.render();

    var leftSide3 = new Cube();
    leftSide3.color = g_koalaGreyColorMat;
    leftSide3.matrix = new Matrix4(rootCubeMat);
    leftSide3.matrix.translate(-4.0 * g_koalaScaleX, 0.1 * g_koalaScaleY, -2.23 * g_koalaScaleZ);
    leftSide3.matrix.rotate(5, 1, 0, 0);
    var leftSide3Mat = new Matrix4(leftSide3.matrix);
    leftSide3.matrix.scale(7.0 * g_koalaScaleX, 1.75 * g_koalaScaleY, 1.3 * g_koalaScaleZ);
    leftSide3.render();

    var leftSide4 = new Cube();
    leftSide4.color = g_koalaGreyColorMat;
    leftSide4.matrix = new Matrix4(leftSide3Mat);
    leftSide4.matrix.translate(0.0 * g_koalaScaleX, -1.9 * g_koalaScaleY, 0.32 * g_koalaScaleZ);
    leftSide4.matrix.rotate(-10, 1, 0, 0);
    leftSide4.matrix.scale(7.0 * g_koalaScaleX, 1.95 * g_koalaScaleY, 1.3 * g_koalaScaleZ);
    leftSide4.render();

    var leftSide5 = new Cube();
    leftSide5.color = g_koalaGreyColorMat;
    leftSide5.matrix = new Matrix4(lowerTorso1Mat);
    leftSide5.matrix.translate(0.0 * g_koalaScaleX, 1.5 * g_koalaScaleY, -0.8 * g_koalaScaleZ);
    leftSide5.matrix.rotate(10, 1, 0, 0);
    leftSide5.matrix.rotate(5, 0, 1, 0);
    leftSide5.matrix.rotate(2, 0, 0, 1);
    var leftSide5Mat = new Matrix4(leftSide5.matrix);
    leftSide5.matrix.scale(2.6 * g_koalaScaleX, 1.95 * g_koalaScaleY, 1.0 * g_koalaScaleZ);
    leftSide5.render();

    var leftSide6 = new Cube();
    leftSide6.color = g_koalaGreyColorMat;
    leftSide6.matrix = new Matrix4(lowerTorso1Mat);
    leftSide6.matrix.translate(-0.15 * g_koalaScaleX, -0.55 * g_koalaScaleY, -0.4 * g_koalaScaleZ);
    leftSide6.matrix.rotate(-10, 1, 0, 0);
    leftSide6.matrix.rotate(5, 0, 1, 0);
    leftSide6.matrix.rotate(-2, 0, 0, 1);
    var leftSide6Mat = new Matrix4(leftSide6.matrix);
    leftSide6.matrix.scale(2.6 * g_koalaScaleX, 2.2 * g_koalaScaleY, 1.0 * g_koalaScaleZ);
    leftSide6.render();

    var leftSide7 = new Cube();
    leftSide7.color = g_koalaGreyColorMat;
    leftSide7.matrix = new Matrix4(leftSide5Mat);
    leftSide7.matrix.translate(2.2 * g_koalaScaleX, 0.0 * g_koalaScaleY, 0.0 * g_koalaScaleZ);
    leftSide7.matrix.rotate(-5, 0, 1, 0);
    leftSide7.matrix.rotate(-2, 0, 0, 1);
    leftSide7.matrix.scale(2.8 * g_koalaScaleX, 1.95 * g_koalaScaleY, 1.0 * g_koalaScaleZ);
    leftSide7.render();

    var leftSide8 = new Cube();
    leftSide8.color = g_koalaGreyColorMat;
    leftSide8.matrix = new Matrix4(leftSide6Mat);
    leftSide8.matrix.translate(2.6 * g_koalaScaleX, 0.0 * g_koalaScaleY, 0.0 * g_koalaScaleZ);
    leftSide8.matrix.rotate(-5, 0, 1, 0);
    leftSide8.matrix.rotate(2, 0, 0, 1);
    leftSide8.matrix.scale(2.6 * g_koalaScaleX, 2.2 * g_koalaScaleY, 1.0 * g_koalaScaleZ);
    leftSide8.render();

    var leftBehind = new Cube();
    leftBehind.color = g_green;
    leftBehind.matrix = new Matrix4(rootCubeMat);
    leftBehind.matrix.translate(13.0 * g_koalaScaleX, 0.0 * g_koalaScaleY, -1.5 * g_koalaScaleZ);
    var leftBehindMat = new Matrix4(leftBehind.matrix);
    leftBehind.matrix.scale(1.0 * g_koalaScaleX, 0.5 * g_koalaScaleY, 0.5 * g_koalaScaleZ);
    leftBehind.render();

    var leftBehind2 = new Cube();
    leftBehind2.color = g_koalaGreyColorMat;
    leftBehind2.matrix = new Matrix4(leftBehindMat);
    leftBehind2.matrix.translate(-5.1 * g_koalaScaleX, 0.7 * g_koalaScaleY, -1.0 * g_koalaScaleZ);
    leftBehind2.matrix.rotate(10, 1, 0, 0);
    var leftBehind2Mat = new Matrix4(leftBehind2.matrix);
    leftBehind2.matrix.scale(4.1 * g_koalaScaleX, 1.5 * g_koalaScaleY, 1.3 * g_koalaScaleZ);
    leftBehind2.render();

    var leftBehind3 = new Cube();
    leftBehind3.color = g_koalaGreyColorMat;
    leftBehind3.matrix = new Matrix4(leftBehind2Mat);
    leftBehind3.matrix.translate(-0.01 * g_koalaScaleX, -0.69 * g_koalaScaleY, 0.11 * g_koalaScaleZ);
    leftBehind3.matrix.rotate(-10, 1, 0, 0);
    leftBehind3.matrix.scale(4.1 * g_koalaScaleX, 0.7 * g_koalaScaleY, 1.3 * g_koalaScaleZ);
    leftBehind3.render();

    var leftBehind4 = new Cube();
    leftBehind4.color = g_koalaGreyColorMat;
    leftBehind4.matrix = new Matrix4(leftBehindMat);
    leftBehind4.matrix.translate(-5.1 * g_koalaScaleX, -1.9 * g_koalaScaleY, -0.67 * g_koalaScaleZ);
    leftBehind4.matrix.rotate(-10, 1, 0, 0);
    leftBehind4.matrix.scale(4.1 * g_koalaScaleX, 2.0 * g_koalaScaleY, 1.3 * g_koalaScaleZ);
    leftBehind4.render();

    var belly = new Cube();
    belly.color = g_koalaWhiteColorMat;
    belly.matrix = new Matrix4(rootCubeMat);
    belly.matrix.translate(-5.0 * g_koalaScaleX, -2.0 * g_koalaScaleY, -2.0 * g_koalaScaleZ);
    belly.matrix.scale(8.0 * g_koalaScaleX, 0.5 * g_koalaScaleY, 3.2 * g_koalaScaleZ);
    belly.render();

    // var rightBehind2 = new Cube();
    // rightBehind2.color = g_green;
    // rightBehind2.matrix = new Matrix4(rootCubeMat);
    // rightBehind2.matrix.translate(13.0 * g_koalaScaleX, 0.0 * g_koalaScaleY, 1.5 * g_koalaScaleZ);
    // rightBehind2.matrix.scale(1.0 * g_koalaScaleX, 0.5 * g_koalaScaleY, 0.5 * g_koalaScaleZ);
    // rightBehind2.render();
}