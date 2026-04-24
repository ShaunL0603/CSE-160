function makeKoalaFace(rootCubeMat) {
    makeEars(rootCubeMat);

    var leftEye = new Sphere();
    leftEye.color = g_koalaBlackColorMat;
    leftEye.matrix = new Matrix4(rootCubeMat);
    leftEye.matrix.translate(-3.2 * g_koalaScaleX, 0.0 * g_koalaScaleY, 0.0 * g_koalaScaleZ);
    var leftEyeMat = new Matrix4(leftEye.matrix);
    leftEye.matrix.scale(0.66 * g_koalaScaleX, 0.33 * g_koalaScaleY, 0.33 * g_koalaScaleZ);
    leftEye.render();

    // Left Eyelid
    var rightEye = new Sphere();
    rightEye.color = g_koalaBlackColorMat;
    rightEye.matrix = new Matrix4(rootCubeMat);
    rightEye.matrix.translate(-3.2 * g_koalaScaleX, 0.0 * g_koalaScaleY, 2.6 * g_koalaScaleZ);
    var rightEyeMat = new Matrix4(rightEye.matrix);
    rightEye.matrix.scale(0.66 * g_koalaScaleX, 0.33 * g_koalaScaleY, 0.33 * g_koalaScaleZ);
    rightEye.render();

    var leftEyelid1 = new Cube();
    leftEyelid1.color = g_koalaLighterGreyColorMat;
    leftEyelid1.matrix = new Matrix4(leftEyeMat);
    leftEyelid1.matrix.translate(-0.5 * g_koalaScaleX, 0.25 * g_koalaScaleY, -0.15 * g_koalaScaleZ);
    var leftEyelid1Mat = new Matrix4(leftEyelid1.matrix);
    leftEyelid1.matrix.scale(0.8 * g_koalaScaleX, 0.12 * g_koalaScaleY, 0.4 * g_koalaScaleZ);
    // leftEyelid1.matrix.translate(-0.5, -0.5, -0.5);
    leftEyelid1.render();

    var leftEyelid2 = new Cube();
    leftEyelid2.color = g_koalaLighterGreyColorMat;
    leftEyelid2.matrix = new Matrix4(leftEyelid1Mat);
    leftEyelid2.matrix.translate(0.96 * g_koalaScaleX, -0.03 * g_koalaScaleY, 0.2 * g_koalaScaleZ);
    leftEyelid2.matrix.rotate(-45, 0, 0, 1);
    var leftEyelid2Mat = new Matrix4(leftEyelid2.matrix);
    leftEyelid2.matrix.scale(0.6 * g_koalaScaleX, 0.12 * g_koalaScaleY, 0.4 * g_koalaScaleZ);
    leftEyelid2.matrix.translate(-0.5, -0.5, -0.5);
    leftEyelid2.render();

    var leftEyelid3 = new Cube();
    leftEyelid3.color = g_koalaLighterGreyColorMat;
    leftEyelid3.matrix = new Matrix4(leftEyelid2Mat);
    leftEyelid3.matrix.translate(0.4 * g_koalaScaleX, -0.09 * g_koalaScaleY, 0.0 * g_koalaScaleZ);
    leftEyelid3.matrix.rotate(-45, 0, 0, 1);
    var leftEyelid3Mat = new Matrix4(leftEyelid3.matrix);
    leftEyelid3.matrix.scale(0.6 * g_koalaScaleX, 0.12 * g_koalaScaleY, 0.4 * g_koalaScaleZ);
    leftEyelid3.matrix.translate(-0.5, -0.5, -0.5);
    leftEyelid3.render();

    var leftEyelid4 = new Cube();
    leftEyelid4.color = g_koalaLighterGreyColorMat;
    leftEyelid4.matrix = new Matrix4(leftEyelid3Mat);
    leftEyelid4.matrix.translate(0.4 * g_koalaScaleX, -0.09 * g_koalaScaleY, 0.0 * g_koalaScaleZ);
    leftEyelid4.matrix.rotate(-45, 0, 0, 1);
    var leftEyelid4Mat = new Matrix4(leftEyelid4.matrix);
    leftEyelid4.matrix.scale(0.6 * g_koalaScaleX, 0.12 * g_koalaScaleY, 0.4 * g_koalaScaleZ);
    leftEyelid4.matrix.translate(-0.5, -0.5, -0.5);
    leftEyelid4.render();

    var leftEyelid5 = new Cube();
    leftEyelid5.color = g_koalaLighterGreyColorMat;
    leftEyelid5.matrix = new Matrix4(leftEyelid4Mat);
    leftEyelid5.matrix.translate(0.4 * g_koalaScaleX, -0.09 * g_koalaScaleY, 0.0 * g_koalaScaleZ);
    leftEyelid5.matrix.rotate(-45, 0, 0, 1);
    leftEyelid5.matrix.rotate(7, 1, 0, 0);
    var leftEyelid5Mat = new Matrix4(leftEyelid5.matrix);
    leftEyelid5.matrix.scale(0.6 * g_koalaScaleX, 0.12 * g_koalaScaleY, 0.4 * g_koalaScaleZ);
    leftEyelid5.matrix.translate(-0.5, -0.5, -0.5);
    leftEyelid5.render();

    var leftEyelid6 = new Cube();
    leftEyelid6.color = g_koalaLighterGreyColorMat;
    leftEyelid6.matrix = new Matrix4(leftEyelid5Mat);
    leftEyelid6.matrix.translate(0.51 * g_koalaScaleX, -0.09 * g_koalaScaleY, 0.02 * g_koalaScaleZ);
    leftEyelid6.matrix.rotate(-15, 0, 0, 1);
    leftEyelid6.matrix.rotate(15, 1, 0, 0);
    var leftEyelid6Mat = new Matrix4(leftEyelid6.matrix);
    leftEyelid6.matrix.scale(0.6 * g_koalaScaleX, 0.12 * g_koalaScaleY, 0.4 * g_koalaScaleZ);
    leftEyelid6.matrix.translate(-0.5, -0.5, -0.5);
    leftEyelid6.render();

    var leftEyelid7 = new Cube();
    leftEyelid7.color = g_koalaDarkerGreyColorMat;
    leftEyelid7.matrix = new Matrix4(leftEyelid6Mat);
    leftEyelid7.matrix.translate(0.17 * g_koalaScaleX, -0.25 * g_koalaScaleY, 0.13 * g_koalaScaleZ);
    leftEyelid7.matrix.rotate(-22, 1, 0, 0);
    leftEyelid7.matrix.rotate(-90, 0, 0, 1);
    leftEyelid7.matrix.scale(0.9 * g_koalaScaleX, 0.15 * g_koalaScaleY, 0.07 * g_koalaScaleZ);
    leftEyelid7.matrix.translate(-0.5, -0.5, -0.5);
    leftEyelid7.render();

    //* Right Eyelid
    var rightEyelid1 = new Cube();
    rightEyelid1.color = g_koalaLighterGreyColorMat;
    rightEyelid1.matrix = new Matrix4(rightEyeMat);
    rightEyelid1.matrix.translate(-0.5 * g_koalaScaleX, 0.25 * g_koalaScaleY, -0.15 * g_koalaScaleZ);
    var rightEyelid1Mat = new Matrix4(rightEyelid1.matrix);
    rightEyelid1.matrix.scale(0.8 * g_koalaScaleX, 0.12 * g_koalaScaleY, 0.4 * g_koalaScaleZ);
    rightEyelid1.render();

    var rightEyelid2 = new Cube();
    rightEyelid2.color = g_koalaLighterGreyColorMat;
    rightEyelid2.matrix = new Matrix4(rightEyelid1Mat);
    rightEyelid2.matrix.translate(0.96 * g_koalaScaleX, -0.03 * g_koalaScaleY, 0.2 * g_koalaScaleZ);
    rightEyelid2.matrix.rotate(-45, 0, 0, 1);
    var rightEyelid2Mat = new Matrix4(rightEyelid2.matrix);
    rightEyelid2.matrix.scale(0.6 * g_koalaScaleX, 0.12 * g_koalaScaleY, 0.4 * g_koalaScaleZ);
    rightEyelid2.matrix.translate(-0.5, -0.5, -0.5);
    rightEyelid2.render();

    var rightEyelid3 = new Cube();
    rightEyelid3.color = g_koalaLighterGreyColorMat;
    rightEyelid3.matrix = new Matrix4(rightEyelid2Mat);
    rightEyelid3.matrix.translate(0.4 * g_koalaScaleX, -0.09 * g_koalaScaleY, 0.0 * g_koalaScaleZ);
    rightEyelid3.matrix.rotate(-45, 0, 0, 1);
    var rightEyelid3Mat = new Matrix4(rightEyelid3.matrix);
    rightEyelid3.matrix.scale(0.6 * g_koalaScaleX, 0.12 * g_koalaScaleY, 0.4 * g_koalaScaleZ);
    rightEyelid3.matrix.translate(-0.5, -0.5, -0.5);
    rightEyelid3.render();

    var rightEyelid4 = new Cube();
    rightEyelid4.color = g_koalaLighterGreyColorMat;
    rightEyelid4.matrix = new Matrix4(rightEyelid3Mat);
    rightEyelid4.matrix.translate(0.4 * g_koalaScaleX, -0.09 * g_koalaScaleY, 0.0 * g_koalaScaleZ);
    rightEyelid4.matrix.rotate(-45, 0, 0, 1);
    var rightEyelid4Mat = new Matrix4(rightEyelid4.matrix);
    rightEyelid4.matrix.scale(0.6 * g_koalaScaleX, 0.12 * g_koalaScaleY, 0.4 * g_koalaScaleZ);
    rightEyelid4.matrix.translate(-0.5, -0.5, -0.5);
    rightEyelid4.render();

    var rightEyelid5 = new Cube();
    rightEyelid5.color = g_koalaLighterGreyColorMat;
    rightEyelid5.matrix = new Matrix4(rightEyelid4Mat);
    rightEyelid5.matrix.translate(0.4 * g_koalaScaleX, -0.09 * g_koalaScaleY, 0.0 * g_koalaScaleZ);
    rightEyelid5.matrix.rotate(-45, 0, 0, 1);
    rightEyelid5.matrix.rotate(-10, 1, 0, 0);
    var rightEyelid5Mat = new Matrix4(rightEyelid5.matrix);
    rightEyelid5.matrix.scale(0.6 * g_koalaScaleX, 0.12 * g_koalaScaleY, 0.4 * g_koalaScaleZ);
    rightEyelid5.matrix.translate(-0.5, -0.5, -0.5);
    rightEyelid5.render();

    var rightEyelid6 = new Cube();
    rightEyelid6.color = g_koalaLighterGreyColorMat;
    rightEyelid6.matrix = new Matrix4(rightEyelid5Mat);
    rightEyelid6.matrix.translate(0.51 * g_koalaScaleX, -0.09 * g_koalaScaleY, -0.1 * g_koalaScaleZ);
    rightEyelid6.matrix.rotate(-15, 0, 0, 1);
    rightEyelid6.matrix.rotate(-10, 0, 1, 0);
    rightEyelid6.matrix.rotate(-10, 1, 0, 0);
    var rightEyelid6Mat = new Matrix4(rightEyelid6.matrix);
    rightEyelid6.matrix.scale(0.6 * g_koalaScaleX, 0.12 * g_koalaScaleY, 0.4 * g_koalaScaleZ);
    rightEyelid6.matrix.translate(-0.5, -0.5, -0.5);
    rightEyelid6.render();

    var rightEyelid7 = new Cube();
    rightEyelid7.color = g_koalaDarkerGreyColorMat;
    rightEyelid7.matrix = new Matrix4(rightEyelid6Mat);
    rightEyelid7.matrix.translate(0.17 * g_koalaScaleX, -0.25 * g_koalaScaleY, -0.15 * g_koalaScaleZ);
    rightEyelid7.matrix.rotate(20, 1, 0, 0);
    rightEyelid7.matrix.rotate(10, 0, 1, 0);
    rightEyelid7.matrix.rotate(-90, 0, 0, 1);
    rightEyelid7.matrix.scale(0.9 * g_koalaScaleX, 0.15 * g_koalaScaleY, 0.07 * g_koalaScaleZ);
    rightEyelid7.matrix.translate(-0.5, -0.5, -0.5);
    rightEyelid7.render();

    var nose = new Cube();
    nose.color = g_koalaBlackColorMat;
    nose.matrix = new Matrix4(rootCubeMat);
    nose.matrix.translate(-3.5 * g_koalaScaleX, -1.9 * g_koalaScaleY, 1.0 * g_koalaScaleZ);
    nose.matrix.rotate(45, 0, 0, 1);
    nose.matrix.scale(2.67 * g_koalaScaleX, 1.78 * g_koalaScaleY, 0.6 * g_koalaScaleZ);
    nose.render();
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