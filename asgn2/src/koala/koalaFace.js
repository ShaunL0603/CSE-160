function makeKoalaFace(rootCubeMat) {
    makeEars(rootCubeMat);

    var leftEye = new Sphere();
    leftEye.color = g_koalaBlackColorMat;
    leftEye.matrix = new Matrix4(rootCubeMat);
    leftEye.matrix.translate(-4.0 * g_koalaScaleX, 0.0 * g_koalaScaleY, 0.33 * g_koalaScaleZ);
    leftEye.matrix.scale(0.33 * g_koalaScaleX, 0.33 * g_koalaScaleY, 0.33 * g_koalaScaleZ);
    leftEye.render();

    var rightEye = new Sphere();
    rightEye.color = g_koalaBlackColorMat;
    rightEye.matrix = new Matrix4(rootCubeMat);
    rightEye.matrix.translate(-4.0 * g_koalaScaleX, 0.0 * g_koalaScaleY, 2.27 * g_koalaScaleZ);
    rightEye.matrix.scale(0.33 * g_koalaScaleX, 0.33 * g_koalaScaleY, 0.33 * g_koalaScaleZ);
    rightEye.render();
}

function makeEars(rootCubeMat) {
    //* Left Ear
    var leftEar1 = new Cube();
    leftEar1.color = g_koalaGreyColorMat;
    leftEar1.matrix = new Matrix4(rootCubeMat);
    leftEar1.matrix.translate(0.0, 1.5 * g_koalaScaleY, -1.83 * g_koalaScaleZ);
    var leftEar1Mat = new Matrix4(leftEar1.matrix);
    leftEar1.matrix.scale(0.67 * g_koalaScaleX, 0.33 * g_koalaScaleY, 1.83 * g_koalaScaleZ);
    leftEar1.render();

    var leftEar2 = new Cube();
    leftEar2.color = g_koalaGreyColorMat;
    leftEar2.matrix = new Matrix4(leftEar1Mat);
    leftEar2.matrix.translate(0.33 * g_koalaScaleX, -0.33 * g_koalaScaleY, -0.33 * g_koalaScaleZ);
    leftEar2.matrix.scale(0.67 * g_koalaScaleX, 0.33 * g_koalaScaleY, 2.33 * g_koalaScaleZ);
    leftEar2.render();

    var leftEar3 = new Cube();
    leftEar3.color = g_koalaGreyColorMat;
    leftEar3.matrix = new Matrix4(leftEar1Mat);
    leftEar3.matrix.translate(0.33 * g_koalaScaleX, -0.67 * g_koalaScaleY, -0.5 * g_koalaScaleZ);
    leftEar3.matrix.scale(0.67 * g_koalaScaleX, 0.33 * g_koalaScaleY, 2.5 * g_koalaScaleZ);
    leftEar3.render();

    var leftEar4 = new Cube();
    leftEar4.color = g_koalaGreyColorMat;
    leftEar4.matrix = new Matrix4(leftEar1Mat);
    leftEar4.matrix.translate(0.33 * g_koalaScaleX, -1.67 * g_koalaScaleY, -0.67 * g_koalaScaleZ);
    leftEar4.matrix.scale(0.67 * g_koalaScaleX, 0.33 * g_koalaScaleY, 2.67 * g_koalaScaleZ);
    leftEar4.render();

    var leftEar5 = new Cube();
    leftEar5.color = g_koalaGreyColorMat;
    leftEar5.matrix = new Matrix4(leftEar1Mat);
    leftEar5.matrix.translate(0.33 * g_koalaScaleX, -2.0 * g_koalaScaleY, -0.5 * g_koalaScaleZ);
    leftEar5.matrix.scale(0.67 * g_koalaScaleX, 0.33 * g_koalaScaleY, 2.5 * g_koalaScaleZ);
    leftEar5.render();

    var leftEar6 = new Cube();
    leftEar6.color = g_koalaGreyColorMat;
    leftEar6.matrix = new Matrix4(leftEar1Mat);
    leftEar6.matrix.translate(0.33 * g_koalaScaleX, -2.33 * g_koalaScaleY, -0.33 * g_koalaScaleZ);
    leftEar6.matrix.scale(0.67 * g_koalaScaleX, 0.33 * g_koalaScaleY, 2.33 * g_koalaScaleZ);
    leftEar6.render();

    var leftEar7 = new Cube();
    leftEar7.color = g_koalaGreyColorMat;
    leftEar7.matrix = new Matrix4(leftEar1Mat);
    leftEar7.matrix.translate(0.0, -2.57 * g_koalaScaleY, -0.31 * g_koalaScaleZ);
    leftEar7.matrix.rotate(-5, 1, 0, 0);
    leftEar7.matrix.scale(0.67 * g_koalaScaleX, 0.33 * g_koalaScaleY, 2.17 * g_koalaScaleZ);
    leftEar7.render();

    var leftEar8 = new Cube();
    leftEar8.color = g_koalaGreyColorMat;
    leftEar8.matrix = new Matrix4(leftEar1Mat);
    leftEar8.matrix.translate(0.0, -0.57 * g_koalaScaleY, 1.83 * g_koalaScaleZ);
    leftEar8.matrix.rotate(-10, 1, 0, 0);
    leftEar8.matrix.scale(0.67 * g_koalaScaleX, 0.83 * g_koalaScaleY, 0.33 * g_koalaScaleZ);
    leftEar8.render();

    var leftEar9 = new Cube();
    leftEar9.color = g_koalaGreyColorMat;
    leftEar9.matrix = new Matrix4(leftEar1Mat);
    leftEar9.matrix.translate(0.0, -0.13 * g_koalaScaleX, -0.47 * g_koalaScaleZ);
    leftEar9.matrix.rotate(45, 1, 0, 0);
    leftEar9.matrix.scale(0.67 * g_koalaScaleX, 0.67 * g_koalaScaleY, 0.33 * g_koalaScaleZ);
    leftEar9.render();

    var leftEar10 = new Cube();
    leftEar10.color = g_koalaGreyColorMat;
    leftEar10.matrix = new Matrix4(leftEar1Mat);
    leftEar10.matrix.translate(0.0, -1.0 * g_koalaScaleY, -0.67 * g_koalaScaleZ);
    leftEar10.matrix.rotate(10, 1, 0, 0);
    leftEar10.matrix.scale(0.67 * g_koalaScaleX, 1.0 * g_koalaScaleY, 0.33 * g_koalaScaleZ);
    leftEar10.render();

    var leftEar11 = new Cube();
    leftEar11.color = g_koalaGreyColorMat;
    leftEar11.matrix = new Matrix4(leftEar1Mat);
    leftEar11.matrix.translate(0.0, -1.67 * g_koalaScaleY, -0.67 * g_koalaScaleZ);
    leftEar11.matrix.scale(0.67 * g_koalaScaleX, 1.0 * g_koalaScaleY, 0.33 * g_koalaScaleZ);
    leftEar11.render();

    var leftEar12 = new Cube();
    leftEar12.color = g_koalaGreyColorMat;
    leftEar12.matrix = new Matrix4(leftEar1Mat);
    leftEar12.matrix.translate(0.0, -2.63 * g_koalaScaleY, -0.43 * g_koalaScaleZ);
    leftEar12.matrix.rotate(-15, 1, 0, 0);
    leftEar12.matrix.scale(0.67 * g_koalaScaleX, 1.0 * g_koalaScaleY, 0.33 * g_koalaScaleZ);
    leftEar12.render();

    var leftEar13 = new Cube();
    leftEar13.color = g_koalaGreyColorMat;
    leftEar13.matrix = new Matrix4(leftEar1Mat);
    leftEar13.matrix.translate(0.33 * g_koalaScaleX, -1.33 * g_koalaScaleY, -0.67 * g_koalaScaleZ);
    leftEar13.matrix.scale(0.67 * g_koalaScaleX, 0.67 * g_koalaScaleY, 2.83 * g_koalaScaleZ);
    leftEar13.render();

    var leftInnerEar = new Cube();
    leftInnerEar.color = g_koalaWhiteColorMat;
    leftInnerEar.matrix = new Matrix4(leftEar1Mat);
    leftInnerEar.matrix.translate(0.23 * g_koalaScaleX, -2.33 * g_koalaScaleY, -0.33 * g_koalaScaleZ);
    leftInnerEar.matrix.scale(0.2 * g_koalaScaleX, 2.33 * g_koalaScaleY, 2.2 * g_koalaScaleZ);
    leftInnerEar.render();

    //* Right Ear
    var rightEar1 = new Cube();
    rightEar1.color = g_koalaGreyColorMat;
    rightEar1.matrix = new Matrix4(rootCubeMat);
    rightEar1.matrix.translate(0.67 * g_koalaScaleX, 1.5 * g_koalaScaleY, 4.5 * g_koalaScaleZ);
    rightEar1.matrix.rotate(180, 0, 1, 0);
    var rightEar1Mat = new Matrix4(rightEar1.matrix);
    rightEar1.matrix.scale(0.67 * g_koalaScaleX, 0.33 * g_koalaScaleY, 1.83 * g_koalaScaleZ);
    rightEar1.render();

    var rightEar2 = new Cube();
    rightEar2.color = g_koalaGreyColorMat;
    rightEar2.matrix = new Matrix4(rightEar1Mat);
    rightEar2.matrix.translate(-0.33 * g_koalaScaleX, -0.33 * g_koalaScaleY, -0.33 * g_koalaScaleZ);
    rightEar2.matrix.scale(0.67 * g_koalaScaleX, 0.33 * g_koalaScaleY, 2.33 * g_koalaScaleZ);
    rightEar2.render();

    var rightEar3 = new Cube();
    rightEar3.color = g_koalaGreyColorMat;
    rightEar3.matrix = new Matrix4(rightEar1Mat);
    rightEar3.matrix.translate(-0.33 * g_koalaScaleX, -0.67 * g_koalaScaleY, -0.5 * g_koalaScaleY);
    rightEar3.matrix.scale(0.67 * g_koalaScaleX, 0.33 * g_koalaScaleY, 2.5 * g_koalaScaleZ);
    rightEar3.render();

    var rightEar4 = new Cube();
    rightEar4.color = g_koalaGreyColorMat;
    rightEar4.matrix = new Matrix4(rightEar1Mat);
    rightEar4.matrix.translate(-0.67 * g_koalaScaleX, -1.33 * g_koalaScaleY, -0.67 * g_koalaScaleZ);
    rightEar4.matrix.scale(0.67 * g_koalaScaleX, 0.67 * g_koalaScaleY, 2.83 * g_koalaScaleZ);
    rightEar4.render();

    var rightEar5 = new Cube();
    rightEar5.color = g_koalaGreyColorMat;
    rightEar5.matrix = new Matrix4(rightEar1Mat);
    rightEar5.matrix.translate(-0.67 * g_koalaScaleX, -2.0 * g_koalaScaleY, -0.6 * g_koalaScaleZ);
    rightEar5.matrix.scale(0.67 * g_koalaScaleX, 0.67 * g_koalaScaleY, 2.4 * g_koalaScaleZ);
    rightEar5.render();

    var rightEar6 = new Cube();
    rightEar6.color = g_koalaGreyColorMat;
    rightEar6.matrix = new Matrix4(rightEar1Mat);
    rightEar6.matrix.translate(-0.67 * g_koalaScaleX, -2.33 * g_koalaScaleY, -0.33 * g_koalaScaleZ);
    rightEar6.matrix.scale(0.67 * g_koalaScaleX, 0.33 * g_koalaScaleY, 2.33 * g_koalaScaleZ);
    rightEar6.render();

    var rightEar7 = new Cube();
    rightEar7.color = g_koalaGreyColorMat;
    rightEar7.matrix = new Matrix4(rightEar1Mat);
    rightEar7.matrix.translate(-0.33 * g_koalaScaleX, -2.33 * g_koalaScaleY, -0.33 * g_koalaScaleZ);
    rightEar7.matrix.scale(0.67 * g_koalaScaleX, 0.33 * g_koalaScaleY, 2.17 * g_koalaScaleZ);
    rightEar7.render();

    var rightEar8 = new Cube();
    rightEar8.color = g_koalaGreyColorMat;
    rightEar8.matrix = new Matrix4(rightEar1Mat);
    rightEar8.matrix.translate(0.0, -2.57 * g_koalaScaleY, -0.31 * g_koalaScaleZ);
    rightEar8.matrix.rotate(-5, 1, 0, 0);
    rightEar8.matrix.scale(0.67 * g_koalaScaleX, 0.33 * g_koalaScaleY, 2.17 * g_koalaScaleZ);
    rightEar8.render();

    var rightEar9 = new Cube();
    rightEar9.color = g_koalaGreyColorMat;
    rightEar9.matrix = new Matrix4(rightEar1Mat);
    rightEar9.matrix.translate(0.0, -0.57 * g_koalaScaleY, 1.83 * g_koalaScaleZ);
    rightEar9.matrix.rotate(-10, 1, 0, 0);
    rightEar9.matrix.scale(0.67 * g_koalaScaleX, 0.83 * g_koalaScaleY, 0.33 * g_koalaScaleZ);
    rightEar9.render();

    var rightEar10 = new Cube();
    rightEar10.color = g_koalaGreyColorMat;
    rightEar10.matrix = new Matrix4(rightEar1Mat);
    rightEar10.matrix.translate(0.0, -0.13 * g_koalaScaleY, -0.47 * g_koalaScaleZ);
    rightEar10.matrix.rotate(45, 1, 0, 0);
    rightEar10.matrix.scale(0.67 * g_koalaScaleX, 0.67 * g_koalaScaleY, 0.33 * g_koalaScaleZ);
    rightEar10.render();

    var rightEar11 = new Cube();
    rightEar11.color = g_koalaGreyColorMat;
    rightEar11.matrix = new Matrix4(rightEar1Mat);
    rightEar11.matrix.translate(0.0, -1.0 * g_koalaScaleY, -0.67 * g_koalaScaleZ);
    rightEar11.matrix.rotate(10, 1, 0, 0);
    rightEar11.matrix.scale(0.67 * g_koalaScaleX, 1.0 * g_koalaScaleY, 0.33 * g_koalaScaleZ);
    rightEar11.render();

    var rightEar12 = new Cube();
    rightEar12.color = g_koalaGreyColorMat;
    rightEar12.matrix = new Matrix4(rightEar1Mat);
    rightEar12.matrix.translate(0.0, -1.67 * g_koalaScaleY, -0.67 * g_koalaScaleZ);
    rightEar12.matrix.scale(0.67 * g_koalaScaleX, 1.0 * g_koalaScaleY, 0.33 * g_koalaScaleZ);
    rightEar12.render();

    var rightEar13 = new Cube();
    rightEar13.color = g_koalaGreyColorMat;
    rightEar13.matrix = new Matrix4(rightEar1Mat);
    rightEar13.matrix.translate(0.0, -2.63 * g_koalaScaleY, -0.43 * g_koalaScaleZ);
    rightEar13.matrix.rotate(-15, 1, 0, 0);
    rightEar13.matrix.scale(0.67 * g_koalaScaleX, 1.0 * g_koalaScaleY, 0.33 * g_koalaScaleZ);
    rightEar13.render();

    var rightInnerEar = new Cube();
    rightInnerEar.color = g_koalaWhiteColorMat;
    rightInnerEar.matrix = new Matrix4(rightEar1Mat);
    rightInnerEar.matrix.translate(0.23 * g_koalaScaleX, -2.33 * g_koalaScaleY, -0.33 * g_koalaScaleZ);
    rightInnerEar.matrix.scale(0.2 * g_koalaScaleX, 2.33 * g_koalaScaleY, 2.2 * g_koalaScaleZ);
    rightInnerEar.render();
}