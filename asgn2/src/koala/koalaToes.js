function makeKoalaToes(rootCubeMat, LEFT) {
    // Get correct rotation
    var rotateToe1 = LEFT ? g_rotateLeftToe1 : -g_rotateRightToe1;
    var rotateToe2 = LEFT ? g_rotateLeftToe2 : -g_rotateRightToe2;
    var rotateToe3 = LEFT ? g_rotateLeftToe3 : -g_rotateRightToe3;
    var rotateToe4 = LEFT ? g_rotateLeftToe4 : -g_rotateRightToe4;
    var rotateToe5 = LEFT ? g_rotateLeftToe5 : -g_rotateRightToe5;
    // FIRST TOE
    var fingyJoint1 = new Cube();
    fingyJoint1.color = g_koalaDarkerGreyColorMat;
    fingyJoint1.matrix = new Matrix4(rootCubeMat);
    fingyJoint1.matrix.translate(0.5 * g_koalaScaleX, 1.0 * g_koalaScaleY, 1.1 * g_koalaScaleZ);
    fingyJoint1.matrix.rotate(rotateToe1, 0, 1, 0);
    var fingyJoint1Mat = new Matrix4(fingyJoint1.matrix);
    fingyJoint1.matrix.scale(g_koalaScaleX * 0.25, g_koalaScaleY * 0.125, g_koalaScaleZ * 0.125);
    fingyJoint1.matrix.translate(-0.5, 0.0, -0.5);
    fingyJoint1.render();

    var thumbBone1 = new Cube();
    thumbBone1.color = g_yellow;
    thumbBone1.matrix = new Matrix4(fingyJoint1Mat);
    thumbBone1.matrix.translate(-0.07 * g_koalaScaleX, 0.03 * g_koalaScaleY, 0.06 * g_koalaScaleZ);
    var thumbBone1Mat = new Matrix4(thumbBone1.matrix);
    thumbBone1.matrix.scale(g_koalaScaleX * 0.125, g_koalaScaleY * 0.0625, g_koalaScaleZ * 0.4);
    thumbBone1.render();

    var thumbJoint1 = new Cube();
    thumbJoint1.color = g_koalaDarkerGreyColorMat;
    thumbJoint1.matrix = new Matrix4(fingyJoint1Mat);
    thumbJoint1.matrix.translate(0.0, 0.0, 0.5 * g_koalaScaleZ);
    thumbJoint1.matrix.rotate(rotateToe1 * 1.5, 0, 1, 0);
    var thumbJoint1Mat = new Matrix4(thumbJoint1.matrix);
    thumbJoint1.matrix.scale(g_koalaScaleX * 0.25, g_koalaScaleY * 0.125, g_koalaScaleZ * 0.125);
    thumbJoint1.matrix.translate(-0.5, 0.0, -0.5);
    thumbJoint1.render();

    var thumbBone2 = new Cube();
    thumbBone2.color = g_yellow;
    thumbBone2.matrix = new Matrix4(thumbJoint1Mat);
    thumbBone2.matrix.translate(-0.07 * g_koalaScaleX, 0.03 * g_koalaScaleY, 0.06 * g_koalaScaleZ);
    var thumbBone2Mat = new Matrix4(thumbBone2.matrix);
    thumbBone2.matrix.scale(g_koalaScaleX * 0.125, g_koalaScaleY * 0.0625, g_koalaScaleZ * 0.4);
    thumbBone2.render();

    var firstToe = new Cube();
    firstToe.color = g_koalaGreyColorMat;
    firstToe.matrix = new Matrix4(thumbBone1Mat);
    firstToe.matrix.translate(-0.2 * g_koalaScaleX, -0.05 * g_koalaScaleY, -0.01 * g_koalaScaleZ);
    firstToe.matrix.scale(0.5 * g_koalaScaleX, 0.2 * g_koalaScaleY, 0.45 * g_koalaScaleZ);
    firstToe.render();

    var firstToe2 = new Cube();
    firstToe2.color = g_koalaGreyColorMat;
    firstToe2.matrix = new Matrix4(thumbBone2Mat);
    firstToe2.matrix.translate(-0.2 * g_koalaScaleX, -0.05 * g_koalaScaleY, 0.0 * g_koalaScaleZ);
    firstToe2.matrix.scale(0.5 * g_koalaScaleX, 0.2 * g_koalaScaleY, 0.45 * g_koalaScaleZ);
    firstToe2.render();

    // SECOND TOE
    var fingyJoint2 = new Cube();
    fingyJoint2.color = g_koalaDarkerGreyColorMat;
    fingyJoint2.matrix = new Matrix4(rootCubeMat);
    fingyJoint2.matrix.translate(0.5 * g_koalaScaleX, 0.15 * g_koalaScaleY, 1.3 * g_koalaScaleZ);
    fingyJoint2.matrix.rotate(rotateToe2, 0, 0, 1);
    var fingyJoint2Mat = new Matrix4(fingyJoint2.matrix);
    fingyJoint2.matrix.scale(g_koalaScaleX * 0.25, g_koalaScaleY * 0.125, g_koalaScaleZ * 0.125);
    fingyJoint2.matrix.translate(-0.5, -0.5, 0.0);
    fingyJoint2.render();

    var secondThumbBone1 = new Cube();
    secondThumbBone1.color = g_yellow;
    secondThumbBone1.matrix = new Matrix4(fingyJoint2Mat);
    secondThumbBone1.matrix.translate(-0.06 * g_koalaScaleX, -0.46 * g_koalaScaleY, 0.03 * g_koalaScaleZ);
    var secondThumbBone1Mat = new Matrix4(secondThumbBone1.matrix);
    secondThumbBone1.matrix.scale(g_koalaScaleX * 0.125, g_koalaScaleY * 0.4, g_koalaScaleZ * 0.0625);
    secondThumbBone1.render();

    var thumbJoint1 = new Cube();
    thumbJoint1.color = g_koalaDarkerGreyColorMat;
    thumbJoint1.matrix = new Matrix4(fingyJoint2Mat);
    thumbJoint1.matrix.translate(0.0, -0.47 * g_koalaScaleY, 0.0);
    thumbJoint1.matrix.rotate(rotateToe2 * 1.3, 0, 0, 1);
    var thumbJoint1Mat = new Matrix4(thumbJoint1.matrix);
    thumbJoint1.matrix.scale(g_koalaScaleX * 0.25, g_koalaScaleY * 0.125, g_koalaScaleZ * 0.125);
    thumbJoint1.matrix.translate(-0.5, -0.5, 0.0);
    thumbJoint1.render();

    var secondThumbBone2 = new Cube();
    secondThumbBone2.color = g_yellow;
    secondThumbBone2.matrix = new Matrix4(thumbJoint1Mat);
    secondThumbBone2.matrix.translate(-0.07 * g_koalaScaleX, -0.46 * g_koalaScaleY, 0.03 * g_koalaScaleZ);
    var secondThumbBone2Mat = new Matrix4(secondThumbBone2.matrix);
    secondThumbBone2.matrix.scale(g_koalaScaleX * 0.125, g_koalaScaleY * 0.4, g_koalaScaleZ * 0.0625);
    secondThumbBone2.render();

    var thumbJoint2 = new Cube();
    thumbJoint2.color = g_koalaDarkerGreyColorMat;
    thumbJoint2.matrix = new Matrix4(thumbJoint1Mat);
    thumbJoint2.matrix.translate(0.0, -0.47 * g_koalaScaleY, 0.0);
    thumbJoint2.matrix.rotate(rotateToe2 * 1.3, 0, 0, 1);
    var thumbJoint2Mat = new Matrix4(thumbJoint2.matrix);
    thumbJoint2.matrix.scale(g_koalaScaleX * 0.25, g_koalaScaleY * 0.125, g_koalaScaleZ * 0.125);
    thumbJoint2.matrix.translate(-0.5, -0.5, 0.0);
    thumbJoint2.render();

    var secondThumbBone3 = new Cube();
    secondThumbBone3.color = g_yellow;
    secondThumbBone3.matrix = new Matrix4(thumbJoint2Mat);
    secondThumbBone3.matrix.translate(-0.07 * g_koalaScaleX, -0.46 * g_koalaScaleY, 0.03 * g_koalaScaleZ);
    var secondThumbBone3Mat = new Matrix4(secondThumbBone3.matrix);
    secondThumbBone3.matrix.scale(g_koalaScaleX * 0.125, g_koalaScaleY * 0.4, g_koalaScaleZ * 0.0625);
    secondThumbBone3.render();

    var secondToe = new Cube();
    secondToe.color = g_koalaGreyColorMat;
    secondToe.matrix = new Matrix4(secondThumbBone1Mat);
    secondToe.matrix.translate(-0.2 * g_koalaScaleX,0.0 * g_koalaScaleY, -0.065 * g_koalaScaleZ);
    secondToe.matrix.scale(0.5 * g_koalaScaleX, 0.45 * g_koalaScaleY, 0.2 * g_koalaScaleZ);
    secondToe.render();

    var secondToe2 = new Cube();
    secondToe2.color = g_koalaGreyColorMat;
    secondToe2.matrix = new Matrix4(secondThumbBone2Mat);
    secondToe2.matrix.translate(-0.2 * g_koalaScaleX, 0.0 * g_koalaScaleY, -0.065 * g_koalaScaleZ);
    secondToe2.matrix.scale(0.5 * g_koalaScaleX, 0.45 * g_koalaScaleY, 0.2 * g_koalaScaleZ);
    secondToe2.render();

    var secondToe3 = new Cube();
    secondToe3.color = g_koalaGreyColorMat;
    secondToe3.matrix = new Matrix4(secondThumbBone3Mat);
    secondToe3.matrix.translate(-0.2 * g_koalaScaleX, -0.01 * g_koalaScaleY, -0.065 * g_koalaScaleZ);
    secondToe3.matrix.scale(0.5 * g_koalaScaleX, 0.45 * g_koalaScaleY, 0.2 * g_koalaScaleZ);
    secondToe3.render();
    
    // THIRD TOE
    var fingyJoint3 = new Cube();
    fingyJoint3.color = g_koalaDarkerGreyColorMat;
    fingyJoint3.matrix = new Matrix4(rootCubeMat);
    fingyJoint3.matrix.translate(0.5 * g_koalaScaleX, 0.1 * g_koalaScaleY, 1.0 * g_koalaScaleZ);
    fingyJoint3.matrix.rotate(rotateToe3, 0, 0, 1);
    var fingyJoint3Mat = new Matrix4(fingyJoint3.matrix);
    fingyJoint3.matrix.scale(g_koalaScaleX * 0.25, g_koalaScaleY * 0.125, g_koalaScaleZ * 0.125);
    fingyJoint3.matrix.translate(-0.5, -0.5, 0.0);
    fingyJoint3.render();

    var indexBone1 = new Cube();
    indexBone1.color = g_yellow;
    indexBone1.matrix = new Matrix4(fingyJoint3Mat);
    indexBone1.matrix.translate(-0.06 * g_koalaScaleX, -0.46 * g_koalaScaleY, 0.03 * g_koalaScaleZ);
    var indexBone1Mat = new Matrix4(indexBone1.matrix);
    indexBone1.matrix.scale(g_koalaScaleX * 0.125, g_koalaScaleY * 0.4, g_koalaScaleZ * 0.0625);
    indexBone1.render();

    var indexJoint1 = new Cube();
    indexJoint1.color = g_koalaDarkerGreyColorMat;
    indexJoint1.matrix = new Matrix4(fingyJoint3Mat);
    indexJoint1.matrix.translate(0.0, -0.47 * g_koalaScaleY, 0.0);
    indexJoint1.matrix.rotate(rotateToe3 * 1.3, 0, 0, 1);
    var indexJoint1Mat = new Matrix4(indexJoint1.matrix);
    indexJoint1.matrix.scale(g_koalaScaleX * 0.25, g_koalaScaleY * 0.125, g_koalaScaleZ * 0.125);
    indexJoint1.matrix.translate(-0.5, -0.5, 0.0);
    indexJoint1.render();

    var indexBone2 = new Cube();
    indexBone2.color = g_yellow;
    indexBone2.matrix = new Matrix4(indexJoint1Mat);
    indexBone2.matrix.translate(-0.07 * g_koalaScaleX, -0.46 * g_koalaScaleY, 0.03 * g_koalaScaleZ);
    var indexBone2Mat = new Matrix4(indexBone2.matrix);
    indexBone2.matrix.scale(g_koalaScaleX * 0.125, g_koalaScaleY * 0.4, g_koalaScaleZ * 0.0625);
    indexBone2.render();

    var indexJoint2 = new Cube();
    indexJoint2.color = g_koalaDarkerGreyColorMat;
    indexJoint2.matrix = new Matrix4(indexJoint1Mat);
    indexJoint2.matrix.translate(0.0, -0.47 * g_koalaScaleY, 0.0);
    indexJoint2.matrix.rotate(rotateToe3 * 1.3, 0, 0, 1);
    var indexJoint2Mat = new Matrix4(indexJoint2.matrix);
    indexJoint2.matrix.scale(g_koalaScaleX * 0.25, g_koalaScaleY * 0.125, g_koalaScaleZ * 0.125);
    indexJoint2.matrix.translate(-0.5, -0.5, 0.0);
    indexJoint2.render();

    var indexBone3 = new Cube();
    indexBone3.color = g_yellow;
    indexBone3.matrix = new Matrix4(indexJoint2Mat);
    indexBone3.matrix.translate(-0.07 * g_koalaScaleX, -0.46 * g_koalaScaleY, 0.03 * g_koalaScaleZ);
    var indexBone3Mat = new Matrix4(indexBone3.matrix);
    indexBone3.matrix.scale(g_koalaScaleX * 0.125, g_koalaScaleY * 0.4, g_koalaScaleZ * 0.0625);
    indexBone3.render();

    var thirdtoe = new Cube();
    thirdtoe.color = g_koalaGreyColorMat;
    thirdtoe.matrix = new Matrix4(indexBone1Mat);
    thirdtoe.matrix.translate(-0.2 * g_koalaScaleX,0.0 * g_koalaScaleY, -0.065 * g_koalaScaleZ);
    thirdtoe.matrix.scale(0.5 * g_koalaScaleX, 0.45 * g_koalaScaleY, 0.2 * g_koalaScaleZ);
    thirdtoe.render();

    var thirdtoe2 = new Cube();
    thirdtoe2.color = g_koalaGreyColorMat;
    thirdtoe2.matrix = new Matrix4(indexBone2Mat);
    thirdtoe2.matrix.translate(-0.2 * g_koalaScaleX, 0.0 * g_koalaScaleY, -0.065 * g_koalaScaleZ);
    thirdtoe2.matrix.scale(0.5 * g_koalaScaleX, 0.45 * g_koalaScaleY, 0.2 * g_koalaScaleZ);
    thirdtoe2.render();

    var thirdtoe3 = new Cube();
    thirdtoe3.color = g_koalaGreyColorMat;
    thirdtoe3.matrix = new Matrix4(indexBone3Mat);
    thirdtoe3.matrix.translate(-0.2 * g_koalaScaleX, -0.01 * g_koalaScaleY, -0.065 * g_koalaScaleZ);
    thirdtoe3.matrix.scale(0.5 * g_koalaScaleX, 0.45 * g_koalaScaleY, 0.2 * g_koalaScaleZ);
    thirdtoe3.render();
    
    // FOURTH TOE
    var fingyJoint4 = new Cube();
    fingyJoint4.color = g_koalaDarkerGreyColorMat;
    fingyJoint4.matrix = new Matrix4(rootCubeMat);
    fingyJoint4.matrix.translate(0.5 * g_koalaScaleX, 0.01 * g_koalaScaleY, 0.47 * g_koalaScaleZ);
    fingyJoint4.matrix.rotate(90, 1, 0, 0);
    fingyJoint4.matrix.rotate(rotateToe4, 0, 1, 0);
    var fingyJoint4Mat = new Matrix4(fingyJoint4.matrix);
    fingyJoint4.matrix.scale(g_koalaScaleX * 0.25, g_koalaScaleY * 0.125, g_koalaScaleZ * 0.125);
    fingyJoint4.matrix.translate(-0.5, 0.0, -0.5);
    fingyJoint4.render();

    var middleBone1 = new Cube();
    middleBone1.color = g_yellow;
    middleBone1.matrix = new Matrix4(fingyJoint4Mat);
    middleBone1.matrix.translate(-0.07 * g_koalaScaleX, 0.03 * g_koalaScaleY, 0.06 * g_koalaScaleZ);
    var middleBone1Mat = new Matrix4(middleBone1.matrix);
    middleBone1.matrix.scale(g_koalaScaleX * 0.125, g_koalaScaleY * 0.0625, g_koalaScaleZ * 0.4);
    middleBone1.render();

    var middleJoint1 = new Cube();
    middleJoint1.color = g_koalaDarkerGreyColorMat;
    middleJoint1.matrix = new Matrix4(fingyJoint4Mat);
    middleJoint1.matrix.translate(0.0, 0.0, 0.5 * g_koalaScaleZ);
    middleJoint1.matrix.rotate(rotateToe4 * 1.5, 0, 1, 0);
    var middleJoint1Mat = new Matrix4(middleJoint1.matrix);
    middleJoint1.matrix.scale(g_koalaScaleX * 0.25, g_koalaScaleY * 0.125, g_koalaScaleZ * 0.125);
    middleJoint1.matrix.translate(-0.5, 0.0, -0.5);
    middleJoint1.render();

    var middleBone2 = new Cube();
    middleBone2.color = g_yellow;
    middleBone2.matrix = new Matrix4(middleJoint1Mat);
    middleBone2.matrix.translate(-0.07 * g_koalaScaleX, 0.03 * g_koalaScaleY, 0.06 * g_koalaScaleZ);
    var middleBone2Mat = new Matrix4(middleBone2.matrix);
    middleBone2.matrix.scale(g_koalaScaleX * 0.125, g_koalaScaleY * 0.0625, g_koalaScaleZ * 0.4);
    middleBone2.render();

    var middleJoint2 = new Cube();
    middleJoint2.color = g_koalaDarkerGreyColorMat;
    middleJoint2.matrix = new Matrix4(middleJoint1Mat);
    middleJoint2.matrix.translate(0.0, 0.0, 0.5 * g_koalaScaleZ);
    middleJoint2.matrix.rotate(rotateToe4 * 1.5, 0, 1, 0);
    var middleJoint2Mat = new Matrix4(middleJoint2.matrix);
    middleJoint2.matrix.scale(g_koalaScaleX * 0.25, g_koalaScaleY * 0.125, g_koalaScaleZ * 0.125);
    middleJoint2.matrix.translate(-0.5, 0.0, -0.5);
    middleJoint2.render();

    var middleBone3 = new Cube();
    middleBone3.color = g_yellow;
    middleBone3.matrix = new Matrix4(middleJoint2Mat);
    middleBone3.matrix.translate(-0.07 * g_koalaScaleX, 0.03 * g_koalaScaleY, 0.06 * g_koalaScaleZ);
    var middleBone3Mat = new Matrix4(middleBone3.matrix);
    middleBone3.matrix.scale(g_koalaScaleX * 0.125, g_koalaScaleY * 0.0625, g_koalaScaleZ * 0.4);
    middleBone3.render();

    var fourthToe = new Cube();
    fourthToe.color = g_koalaGreyColorMat;
    fourthToe.matrix = new Matrix4(middleBone1Mat);
    fourthToe.matrix.translate(-0.2 * g_koalaScaleX, -0.065 * g_koalaScaleY, -0.01 * g_koalaScaleZ);
    fourthToe.matrix.scale(0.5 * g_koalaScaleX, 0.2 * g_koalaScaleY, 0.5 * g_koalaScaleZ);
    fourthToe.render();

    var fourthToe2 = new Cube();
    fourthToe2.color = g_koalaGreyColorMat;
    fourthToe2.matrix = new Matrix4(middleBone2Mat);
    fourthToe2.matrix.translate(-0.2 * g_koalaScaleX, -0.065 * g_koalaScaleY, 0.01 * g_koalaScaleZ);
    fourthToe2.matrix.scale(0.5 * g_koalaScaleX, 0.2 * g_koalaScaleY, 0.5 * g_koalaScaleZ);
    fourthToe2.render();

    var fourthToe3 = new Cube();
    fourthToe3.color = g_koalaGreyColorMat;
    fourthToe3.matrix = new Matrix4(middleBone3Mat);
    fourthToe3.matrix.translate(-0.2 * g_koalaScaleX, -0.065 * g_koalaScaleY, 0.02 * g_koalaScaleZ);
    fourthToe3.matrix.scale(0.5 * g_koalaScaleX, 0.2 * g_koalaScaleY, 0.5 * g_koalaScaleZ);
    fourthToe3.render();
    
    // FIFTH TOE
    var fingyJoint5 = new Cube();
    fingyJoint5.color = g_koalaDarkerGreyColorMat;
    fingyJoint5.matrix = new Matrix4(rootCubeMat);
    fingyJoint5.matrix.translate(0.5 * g_koalaScaleX, 0.2 * g_koalaScaleY, -0.05 * g_koalaScaleZ);
    // fingyJoint5.matrix.rotate(-10, 0, 1, 0);
    fingyJoint5.matrix.rotate(rotateToe5, 0, 0, 1);
    var fingyJoint5Mat = new Matrix4(fingyJoint5.matrix);
    fingyJoint5.matrix.scale(g_koalaScaleX * 0.25, g_koalaScaleY * 0.125, g_koalaScaleZ * 0.125);
    fingyJoint5.matrix.translate(-0.5, -0.5, 0.0);
    fingyJoint5.render();

    var pinkyBone1 = new Cube();
    pinkyBone1.color = g_yellow;
    pinkyBone1.matrix = new Matrix4(fingyJoint5Mat);
    pinkyBone1.matrix.translate(-0.06 * g_koalaScaleX, -0.46 * g_koalaScaleY, 0.03 * g_koalaScaleZ);
    var pinkyBone1Mat = new Matrix4(pinkyBone1.matrix)
    pinkyBone1.matrix.scale(g_koalaScaleX * 0.125, g_koalaScaleY * 0.4, g_koalaScaleZ * 0.0625);
    pinkyBone1.render();

    var pinkyJoint1 = new Cube();
    pinkyJoint1.color = g_koalaDarkerGreyColorMat;
    pinkyJoint1.matrix = new Matrix4(fingyJoint5Mat);
    pinkyJoint1.matrix.translate(0.0, -0.47 * g_koalaScaleY, 0.0);
    pinkyJoint1.matrix.rotate(rotateToe5 * 1.3, 0, 0, 1);
    var pinkyJoint1Mat = new Matrix4(pinkyJoint1.matrix);
    pinkyJoint1.matrix.scale(g_koalaScaleX * 0.25, g_koalaScaleY * 0.125, g_koalaScaleZ * 0.125);
    pinkyJoint1.matrix.translate(-0.5, -0.5, 0.0);
    pinkyJoint1.render();

    var pinkyBone2 = new Cube();
    pinkyBone2.color = g_yellow;
    pinkyBone2.matrix = new Matrix4(pinkyJoint1Mat);
    pinkyBone2.matrix.translate(-0.07 * g_koalaScaleX, -0.46 * g_koalaScaleY, 0.03 * g_koalaScaleZ);
    var pinkyBone2Mat = new Matrix4(pinkyBone2.matrix)
    pinkyBone2.matrix.scale(g_koalaScaleX * 0.125, g_koalaScaleY * 0.4, g_koalaScaleZ * 0.0625);
    pinkyBone2.render();

    var pinkyJoint2 = new Cube();
    pinkyJoint2.color = g_koalaDarkerGreyColorMat;
    pinkyJoint2.matrix = new Matrix4(pinkyJoint1Mat);
    pinkyJoint2.matrix.translate(0.0, -0.47 * g_koalaScaleY, 0.0);
    pinkyJoint2.matrix.rotate(rotateToe5 * 1.3, 0, 0, 1);
    var pinkyJoint2Mat = new Matrix4(pinkyJoint2.matrix);
    pinkyJoint2.matrix.scale(g_koalaScaleX * 0.25, g_koalaScaleY * 0.125, g_koalaScaleZ * 0.125);
    pinkyJoint2.matrix.translate(-0.5, -0.5, 0.0);
    pinkyJoint2.render();

    var pinkyBone3 = new Cube();
    pinkyBone3.color = g_yellow;
    pinkyBone3.matrix = new Matrix4(pinkyJoint2Mat);
    pinkyBone3.matrix.translate(-0.07 * g_koalaScaleX, -0.46 * g_koalaScaleY, 0.03 * g_koalaScaleZ);
    var pinkyBone3Mat = new Matrix4(pinkyBone3.matrix)
    pinkyBone3.matrix.scale(g_koalaScaleX * 0.125, g_koalaScaleY * 0.4, g_koalaScaleZ * 0.0625);
    pinkyBone3.render();


    var fifthToe = new Cube();
    fifthToe.color = g_koalaGreyColorMat;
    fifthToe.matrix = new Matrix4(pinkyBone1Mat);
    fifthToe.matrix.translate(-0.2 * g_koalaScaleX,0.0 * g_koalaScaleY, -0.065 * g_koalaScaleZ);
    fifthToe.matrix.scale(0.5 * g_koalaScaleX, 0.45 * g_koalaScaleY, 0.2 * g_koalaScaleZ);
    fifthToe.render();

    var fifthToe2 = new Cube();
    fifthToe2.color = g_koalaGreyColorMat;
    fifthToe2.matrix = new Matrix4(pinkyBone2Mat);
    fifthToe2.matrix.translate(-0.2 * g_koalaScaleX, 0.0 * g_koalaScaleY, -0.065 * g_koalaScaleZ);
    fifthToe2.matrix.scale(0.5 * g_koalaScaleX, 0.45 * g_koalaScaleY, 0.2 * g_koalaScaleZ);
    fifthToe2.render();

    var fifthToe3 = new Cube();
    fifthToe3.color = g_koalaGreyColorMat;
    fifthToe3.matrix = new Matrix4(pinkyBone3Mat);
    fifthToe3.matrix.translate(-0.2 * g_koalaScaleX, -0.01 * g_koalaScaleY, -0.065 * g_koalaScaleZ);
    fifthToe3.matrix.scale(0.5 * g_koalaScaleX, 0.45 * g_koalaScaleY, 0.2 * g_koalaScaleZ);
    fifthToe3.render();
}
