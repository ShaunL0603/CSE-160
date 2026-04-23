function makeKoalaFace(rootCubeMat) {
    makeEars(rootCubeMat);

    // var leftEye = new Sphere();
    // leftEye.color = g_koalaBlackColorMat;
    // leftEye.matrix = new Matrix4(rootCubeMat);
    // leftEye.matrix.translate(-6.0, 0.0, 1.0);
    // leftEye.matrix.scale(1.0, 1.0, 1.0);
    // leftEye.render();

    // var rightEye = new Sphere();
    // rightEye.color = g_koalaBlackColorMat;
    // rightEye.matrix = new Matrix4(rootCubeMat);
    // rightEye.matrix.translate(-6.0, 0.0, 6.8);
    // rightEye.matrix.scale(1.0, 1.0, 1.0);
    // rightEye.render();
}

function makeEars(rootCubeMat) {
    //* Left Ear
    var leftEar1 = new Cube();
    leftEar1.color = g_koalaGreyColorMat;
    leftEar1.matrix = new Matrix4(rootCubeMat);
    leftEar1.matrix.translate(0.0, 4.5, -5.5);
    var leftEar1Mat = new Matrix4(leftEar1.matrix);
    leftEar1.matrix.scale(1.0, 1.0, 5.5);
    leftEar1.render();

    var leftEar2 = new Cube();
    leftEar2.color = g_koalaGreyColorMat;
    leftEar2.matrix = new Matrix4(leftEar1Mat);
    leftEar2.matrix.translate(0.5, -1.0, -1.0);
    leftEar2.matrix.scale(1.0, 1.0, 7.0);
    leftEar2.render();

    var leftEar3 = new Cube();
    leftEar3.color = g_koalaGreyColorMat;
    leftEar3.matrix = new Matrix4(leftEar1Mat);
    leftEar3.matrix.translate(1.0, -2.0, -1.5);
    leftEar3.matrix.scale(1.0, 1.0, 7.5);
    leftEar3.render();

    var leftEar3 = new Cube();
    leftEar3.color = g_koalaGreyColorMat;
    leftEar3.matrix = new Matrix4(leftEar1Mat);
    leftEar3.matrix.translate(1.0, -4.0, -2.0);
    leftEar3.matrix.scale(1.0, 2.0, 8.5);
    leftEar3.render();

    var leftEar4 = new Cube();
    leftEar4.color = g_koalaGreyColorMat;
    leftEar4.matrix = new Matrix4(leftEar1Mat);
    leftEar4.matrix.translate(1.0, -5.0, -2.0);
    leftEar4.matrix.scale(1.0, 1.0, 8.0);
    leftEar4.render();

    var leftEar5 = new Cube();
    leftEar5.color = g_koalaGreyColorMat;
    leftEar5.matrix = new Matrix4(leftEar1Mat);
    leftEar5.matrix.translate(1.0, -6.0, -1.5);
    leftEar5.matrix.scale(1.0, 1.0, 7.5);
    leftEar5.render();

    var leftEar6 = new Cube();
    leftEar6.color = g_koalaGreyColorMat;
    leftEar6.matrix = new Matrix4(leftEar1Mat);
    leftEar6.matrix.translate(0.5, -7.0, -1.0);
    leftEar6.matrix.scale(1.0, 1.0, 7.0);
    leftEar6.render();

    var leftEar7 = new Cube();
    leftEar7.color = g_koalaGreyColorMat;
    leftEar7.matrix = new Matrix4(leftEar1Mat);
    leftEar7.matrix.translate(0.0, -7.7, -0.92);
    leftEar7.matrix.rotate(-5, 1, 0, 0);
    leftEar7.matrix.scale(1.0, 1.0, 6.5);
    leftEar7.render();

    var leftEar8 = new Cube();
    leftEar8.color = g_koalaGreyColorMat;
    leftEar8.matrix = new Matrix4(leftEar1Mat);
    leftEar8.matrix.translate(0.0, -1.7, 5.5);
    leftEar8.matrix.rotate(-10, 1, 0, 0);
    leftEar8.matrix.scale(1.0, 2.5, 1.0);
    leftEar8.render();

    var leftEar9 = new Cube();
    leftEar9.color = g_koalaGreyColorMat;
    leftEar9.matrix = new Matrix4(leftEar1Mat);
    leftEar9.matrix.translate(0.0, -0.4, -1.4);
    leftEar9.matrix.rotate(45, 1, 0, 0);
    leftEar9.matrix.scale(1.0, 2.0, 1.0);
    leftEar9.render();

    var leftEar10 = new Cube();
    leftEar10.color = g_koalaGreyColorMat;
    leftEar10.matrix = new Matrix4(leftEar1Mat);
    leftEar10.matrix.translate(0.0, -3.0, -2.0);
    leftEar10.matrix.rotate(10, 1, 0, 0);
    leftEar10.matrix.scale(1.0, 3.0, 1.0);
    leftEar10.render();

    var leftEar11 = new Cube();
    leftEar11.color = g_koalaGreyColorMat;
    leftEar11.matrix = new Matrix4(leftEar1Mat);
    leftEar11.matrix.translate(0.0, -5.0, -2.0);
    leftEar11.matrix.scale(1.0, 3.0, 1.0);
    leftEar11.render();

    var leftEar12 = new Cube();
    leftEar12.color = g_koalaGreyColorMat;
    leftEar12.matrix = new Matrix4(leftEar1Mat);
    leftEar12.matrix.translate(0.0, -7.9, -1.3);
    leftEar12.matrix.rotate(-15, 1, 0, 0);
    leftEar12.matrix.scale(1.0, 3.0, 1.0);
    leftEar12.render();

    var leftInnerEar = new Cube();
    leftInnerEar.color = g_koalaWhiteColorMat;
    leftInnerEar.matrix = new Matrix4(leftEar1Mat);
    leftInnerEar.matrix.translate(0.35, -7.0, -1.0);
    leftInnerEar.matrix.scale(0.3, 7.0, 6.6);
    leftInnerEar.render();

    //* Right Ear
    var rightEar1 = new Cube();
    rightEar1.color = g_koalaGreyColorMat;
    rightEar1.matrix = new Matrix4(rootCubeMat);
    rightEar1.matrix.translate(0.0, 4.5, 13.5);
    rightEar1.matrix.rotate(180, 0, 1, 0);
    var rightEar1Mat = new Matrix4(rightEar1.matrix);
    rightEar1.matrix.scale(1.0, 1.0, 5.5);
    rightEar1.render();

    var rightEar2 = new Cube();
    rightEar2.color = g_koalaGreyColorMat;
    rightEar2.matrix = new Matrix4(rightEar1Mat);
    rightEar2.matrix.translate(-0.5, -1.0, -1.0);
    rightEar2.matrix.scale(1.0, 1.0, 7.0);
    rightEar2.render();

    var rightEar3 = new Cube();
    rightEar3.color = g_koalaGreyColorMat;
    rightEar3.matrix = new Matrix4(rightEar1Mat);
    rightEar3.matrix.translate(-1.0, -2.0, -1.5);
    rightEar3.matrix.scale(1.0, 1.0, 7.5);
    rightEar3.render();

    var rightEar4 = new Cube();
    rightEar4.color = g_koalaGreyColorMat;
    rightEar4.matrix = new Matrix4(rightEar1Mat);
    rightEar4.matrix.translate(-1.0, -4.0, -2.0);
    rightEar4.matrix.scale(1.0, 2.0, 8.5);
    rightEar4.render();

    var rightEar5 = new Cube();
    rightEar5.color = g_koalaGreyColorMat;
    rightEar5.matrix = new Matrix4(rightEar1Mat);
    rightEar5.matrix.translate(-1.0, -5.0, -2.0);
    rightEar5.matrix.scale(1.0, 1.0, 8.0);
    rightEar5.render();

    var rightEar6 = new Cube();
    rightEar6.color = g_koalaGreyColorMat;
    rightEar6.matrix = new Matrix4(rightEar1Mat);
    rightEar6.matrix.translate(-1.0, -6.0, -1.5);
    rightEar6.matrix.scale(1.0, 1.0, 7.5);
    rightEar6.render();

    var rightEar7 = new Cube();
    rightEar7.color = g_koalaGreyColorMat;
    rightEar7.matrix = new Matrix4(rightEar1Mat);
    rightEar7.matrix.translate(-0.5, -7.0, -1.0);
    rightEar7.matrix.scale(1.0, 1.0, 7.0);
    rightEar7.render();

    var rightEar8 = new Cube();
    rightEar8.color = g_koalaGreyColorMat;
    rightEar8.matrix = new Matrix4(rightEar1Mat);
    rightEar8.matrix.translate(0.0, -7.7, -0.92);
    rightEar8.matrix.rotate(-5, 1, 0, 0);
    rightEar8.matrix.scale(1.0, 1.0, 6.5);
    rightEar8.render();

    var rightEar9 = new Cube();
    rightEar9.color = g_koalaGreyColorMat;
    rightEar9.matrix = new Matrix4(rightEar1Mat);
    rightEar9.matrix.translate(0.0, -1.7, 5.5);
    rightEar9.matrix.rotate(-10, 1, 0, 0);
    rightEar9.matrix.scale(1.0, 2.5, 1.0);
    rightEar9.render();

    var rightEar10 = new Cube();
    rightEar10.color = g_koalaGreyColorMat;
    rightEar10.matrix = new Matrix4(rightEar1Mat);
    rightEar10.matrix.translate(0.0, -0.4, -1.4);
    rightEar10.matrix.rotate(45, 1, 0, 0);
    rightEar10.matrix.scale(1.0, 2.0, 1.0);
    rightEar10.render();

    var rightEar11 = new Cube();
    rightEar11.color = g_koalaGreyColorMat;
    rightEar11.matrix = new Matrix4(rightEar1Mat);
    rightEar11.matrix.translate(0.0, -3.0, -2.0);
    rightEar11.matrix.rotate(10, 1, 0, 0);
    rightEar11.matrix.scale(1.0, 3.0, 1.0);
    rightEar11.render();

    var rightEar12 = new Cube();
    rightEar12.color = g_koalaGreyColorMat;
    rightEar12.matrix = new Matrix4(rightEar1Mat);
    rightEar12.matrix.translate(0.0, -5.0, -2.0);
    rightEar12.matrix.scale(1.0, 3.0, 1.0);
    rightEar12.render();

    var rightEar13 = new Cube();
    rightEar13.color = g_koalaGreyColorMat;
    rightEar13.matrix = new Matrix4(rightEar1Mat);
    rightEar13.matrix.translate(0.0, -7.9, -1.3);
    rightEar13.matrix.rotate(-15, 1, 0, 0);
    rightEar13.matrix.scale(1.0, 3.0, 1.0);
    rightEar13.render();

    var rightInnerEar = new Cube();
    rightInnerEar.color = g_koalaWhiteColorMat;
    rightInnerEar.matrix = new Matrix4(rightEar1Mat);
    rightInnerEar.matrix.translate(0.35, -7.0, -1.0);
    rightInnerEar.matrix.scale(0.3, 7.0, 6.6);
    rightInnerEar.render();
}