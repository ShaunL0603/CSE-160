function makeKoalaFingys(rootCubeMat, LEFT) {
    // Get correct rotation
    var rotateThumb1 = LEFT ? g_rotateLeftThumb1 : -g_rotateRightThumb1;
    var rotateThumb2 = LEFT ? g_rotateLeftThumb2 : -g_rotateRightThumb2;
    var rotateIndexFinger = LEFT ? g_rotateLeftIndexFinger : -g_rotateRightIndexFinger;
    var rotateMiddleFinger = LEFT ? g_rotateLeftMiddleFinger : -g_rotateRightMiddleFinger;
    var rotatePinkyFinger = LEFT ? g_rotateLeftPinkyFinger : -g_rotateRightPinkyFinger;
    // FIRST THUMB
    var fingyJoint1 = new Cube();
    fingyJoint1.color = g_koalaDarkerGreyColorMat;
    fingyJoint1.matrix = new Matrix4(rootCubeMat);
    fingyJoint1.matrix.translate(0.5 * g_koalaScaleX, 1.0 * g_koalaScaleY, 1.1 * g_koalaScaleZ);
    fingyJoint1.matrix.rotate(rotateThumb1, 0, 1, 0);
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
    thumbJoint1.matrix.rotate(rotateThumb1 * 1.5, 0, 1, 0);
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

    // var leftUpperFirstJoint = new Cube();
    // leftUpperFirstJoint.color = g_koalaDarkerGreyColorMat;
    // leftUpperFirstJoint.matrix = new Matrix4(thumbBone1Mat);
    // leftUpperFirstJoint.matrix.translate(-0.07 * g_koalaScaleX, -0.035 * g_koalaScaleY, -0.08 * g_koalaScaleZ);
    // leftUpperFirstJoint.matrix.scale(0.3 * g_koalaScaleX, 0.145 * g_koalaScaleY, 0.135 * g_koalaScaleZ);
    // leftUpperFirstJoint.render();

    var firstThumb = new Cube();
    firstThumb.color = g_koalaGreyColorMat;
    firstThumb.matrix = new Matrix4(thumbBone1Mat);
    firstThumb.matrix.translate(-0.2 * g_koalaScaleX, -0.05 * g_koalaScaleY, -0.01 * g_koalaScaleZ);
    firstThumb.matrix.scale(0.5 * g_koalaScaleX, 0.2 * g_koalaScaleY, 0.45 * g_koalaScaleZ);
    firstThumb.render();

    var firstThumb2 = new Cube();
    firstThumb2.color = g_koalaGreyColorMat;
    firstThumb2.matrix = new Matrix4(thumbBone2Mat);
    firstThumb2.matrix.translate(-0.2 * g_koalaScaleX, -0.05 * g_koalaScaleY, 0.0 * g_koalaScaleZ);
    firstThumb2.matrix.scale(0.5 * g_koalaScaleX, 0.2 * g_koalaScaleY, 0.45 * g_koalaScaleZ);
    firstThumb2.render();

    // SECOND THUMB OR ANOTHER FINGER
    var fingyJoint2 = new Cube();
    fingyJoint2.color = g_koalaDarkerGreyColorMat;
    fingyJoint2.matrix = new Matrix4(rootCubeMat);
    fingyJoint2.matrix.translate(0.5 * g_koalaScaleX, 0.5 * g_koalaScaleY, 1.1 * g_koalaScaleZ);
    fingyJoint2.matrix.rotate(20, 1, 0, 0);
    fingyJoint2.matrix.rotate(rotateThumb2, 0, 1, 0);
    var fingyJoint2Mat = new Matrix4(fingyJoint2.matrix);
    fingyJoint2.matrix.scale(g_koalaScaleX * 0.25, g_koalaScaleY * 0.125, g_koalaScaleZ * 0.125);
    fingyJoint2.matrix.translate(-0.5, 0.0, -0.5);
    fingyJoint2.render();

    var secondThumbBone1 = new Cube();
    secondThumbBone1.color = g_yellow;
    secondThumbBone1.matrix = new Matrix4(fingyJoint2Mat);
    secondThumbBone1.matrix.translate(-0.07 * g_koalaScaleX, 0.03 * g_koalaScaleY, 0.06 * g_koalaScaleZ);
    var secondThumbBone1Mat = new Matrix4(secondThumbBone1.matrix);
    secondThumbBone1.matrix.scale(g_koalaScaleX * 0.125, g_koalaScaleY * 0.0625, 0.5 * g_koalaScaleZ);
    secondThumbBone1.render();

    var thumbJoint2 = new Cube();
    thumbJoint2.color = g_koalaDarkerGreyColorMat;
    thumbJoint2.matrix = new Matrix4(fingyJoint2Mat);
    thumbJoint2.matrix.translate(0.0, 0.0, 0.6 * g_koalaScaleZ);
    thumbJoint2.matrix.rotate(rotateThumb2 * 1.5, 0, 1, 0);
    var thumbJoint2Mat = new Matrix4(thumbJoint2.matrix);
    thumbJoint2.matrix.scale(g_koalaScaleX * 0.25, g_koalaScaleY * 0.125, g_koalaScaleZ * 0.125);
    thumbJoint2.matrix.translate(-0.5, 0.0, -0.5);
    thumbJoint2.render();

    var secondThumbBone2 = new Cube();
    secondThumbBone2.color = g_yellow;
    secondThumbBone2.matrix = new Matrix4(thumbJoint2Mat);
    secondThumbBone2.matrix.translate(-0.07 * g_koalaScaleX, 0.03 * g_koalaScaleY, 0.06 * g_koalaScaleZ);
    var secondThumbBone2Mat = new Matrix4(secondThumbBone2.matrix);
    secondThumbBone2.matrix.scale(g_koalaScaleX * 0.125, g_koalaScaleY * 0.0625, g_koalaScaleZ * 0.5);
    secondThumbBone2.render();

    var secondThumb = new Cube();
    secondThumb.color = g_koalaGreyColorMat;
    secondThumb.matrix = new Matrix4(secondThumbBone1Mat);
    secondThumb.matrix.translate(-0.2 * g_koalaScaleX, -0.05 * g_koalaScaleY, -0.01 * g_koalaScaleZ);
    secondThumb.matrix.scale(0.5 * g_koalaScaleX, 0.2 * g_koalaScaleY, 0.5 * g_koalaScaleZ);
    secondThumb.render();

    var secondThumb2 = new Cube();
    secondThumb2.color = g_koalaGreyColorMat;
    secondThumb2.matrix = new Matrix4(secondThumbBone2Mat);
    secondThumb2.matrix.translate(-0.2 * g_koalaScaleX, -0.05 * g_koalaScaleY, 0.01 * g_koalaScaleZ);
    secondThumb2.matrix.scale(0.5 * g_koalaScaleX, 0.2 * g_koalaScaleY, 0.5 * g_koalaScaleZ);
    secondThumb2.render();

    // INDEX? FINGER
    var fingyJoint3 = new Cube();
    fingyJoint3.color = g_koalaDarkerGreyColorMat;
    fingyJoint3.matrix = new Matrix4(rootCubeMat);
    fingyJoint3.matrix.translate(0.5 * g_koalaScaleX, 0.0 * g_koalaScaleY, 1.0 * g_koalaScaleZ);
    fingyJoint3.matrix.rotate(rotateIndexFinger, 0, 0, 1);
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
    indexJoint1.matrix.rotate(rotateIndexFinger * 1.3, 0, 0, 1);
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
    indexJoint2.matrix.rotate(rotateIndexFinger * 1.3, 0, 0, 1);
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

    var index = new Cube();
    index.color = g_koalaGreyColorMat;
    index.matrix = new Matrix4(indexBone1Mat);
    index.matrix.translate(-0.2 * g_koalaScaleX,0.0 * g_koalaScaleY, -0.065 * g_koalaScaleZ);
    index.matrix.scale(0.5 * g_koalaScaleX, 0.45 * g_koalaScaleY, 0.2 * g_koalaScaleZ);
    index.render();

    var index2 = new Cube();
    index2.color = g_koalaGreyColorMat;
    index2.matrix = new Matrix4(indexBone2Mat);
    index2.matrix.translate(-0.2 * g_koalaScaleX, 0.0 * g_koalaScaleY, -0.065 * g_koalaScaleZ);
    index2.matrix.scale(0.5 * g_koalaScaleX, 0.45 * g_koalaScaleY, 0.2 * g_koalaScaleZ);
    index2.render();

    var index3 = new Cube();
    index3.color = g_koalaGreyColorMat;
    index3.matrix = new Matrix4(indexBone3Mat);
    index3.matrix.translate(-0.2 * g_koalaScaleX, -0.01 * g_koalaScaleY, -0.065 * g_koalaScaleZ);
    index3.matrix.scale(0.5 * g_koalaScaleX, 0.45 * g_koalaScaleY, 0.2 * g_koalaScaleZ);
    index3.render();

    // MIDDLE? FINGER
    var fingyJoint4 = new Cube();
    fingyJoint4.color = g_koalaDarkerGreyColorMat;
    fingyJoint4.matrix = new Matrix4(rootCubeMat);
    fingyJoint4.matrix.translate(0.5 * g_koalaScaleX, 0.0 * g_koalaScaleY, 0.47 * g_koalaScaleZ);
    // fingyJoint4.matrix.rotate(-10, 0, 1, 0);
    fingyJoint4.matrix.rotate(rotateMiddleFinger, 0, 0, 1);
    var fingyJoint4Mat = new Matrix4(fingyJoint4.matrix);
    fingyJoint4.matrix.scale(g_koalaScaleX * 0.25, g_koalaScaleY * 0.125, g_koalaScaleZ * 0.125);
    fingyJoint4.matrix.translate(-0.5, -0.5, 0.0);
    fingyJoint4.render();

    var middleBone1 = new Cube();
    middleBone1.color = g_yellow;
    middleBone1.matrix = new Matrix4(fingyJoint4Mat);
    middleBone1.matrix.translate(-0.06 * g_koalaScaleX, -0.46 * g_koalaScaleY, 0.03 * g_koalaScaleZ);
    var middleBone1Mat = new Matrix4(middleBone1.matrix);
    middleBone1.matrix.scale(g_koalaScaleX * 0.125, g_koalaScaleY * 0.4, g_koalaScaleZ * 0.0625);
    middleBone1.render();

    var middleJoint1 = new Cube();
    middleJoint1.color = g_koalaDarkerGreyColorMat;
    middleJoint1.matrix = new Matrix4(fingyJoint4Mat);
    middleJoint1.matrix.translate(0.0, -0.47 * g_koalaScaleY, 0.0);
    middleJoint1.matrix.rotate(rotateMiddleFinger * 1.3, 0, 0, 1);
    var middleJoint1Mat = new Matrix4(middleJoint1.matrix);
    middleJoint1.matrix.scale(g_koalaScaleX * 0.25, g_koalaScaleY * 0.125, g_koalaScaleZ * 0.125);
    middleJoint1.matrix.translate(-0.5, -0.5, 0.0);
    middleJoint1.render();

    var middleBone2 = new Cube();
    middleBone2.color = g_yellow;
    middleBone2.matrix = new Matrix4(middleJoint1Mat);
    middleBone2.matrix.translate(-0.07 * g_koalaScaleX, -0.46 * g_koalaScaleY, 0.03 * g_koalaScaleZ);
    var middleBone2Mat = new Matrix4(middleBone2.matrix);
    middleBone2.matrix.scale(g_koalaScaleX * 0.125, g_koalaScaleY * 0.4, g_koalaScaleZ * 0.0625);
    middleBone2.render();

    var middleJoint2 = new Cube();
    middleJoint2.color = g_koalaDarkerGreyColorMat;
    middleJoint2.matrix = new Matrix4(middleJoint1Mat);
    middleJoint2.matrix.translate(0.0, -0.47 * g_koalaScaleY, 0.0);
    middleJoint2.matrix.rotate(rotateMiddleFinger * 1.3, 0, 0, 1);
    var middleJoint2Mat = new Matrix4(middleJoint2.matrix);
    middleJoint2.matrix.scale(g_koalaScaleX * 0.25, g_koalaScaleY * 0.125, g_koalaScaleZ * 0.125);
    middleJoint2.matrix.translate(-0.5, -0.5, 0.0);
    middleJoint2.render();

    var middleBone3 = new Cube();
    middleBone3.color = g_yellow;
    middleBone3.matrix = new Matrix4(middleJoint2Mat);
    middleBone3.matrix.translate(-0.07 * g_koalaScaleX, -0.46 * g_koalaScaleY, 0.03 * g_koalaScaleZ);
    var middleBone3Mat = new Matrix4(middleBone3.matrix);
    middleBone3.matrix.scale(g_koalaScaleX * 0.125, g_koalaScaleY * 0.4, g_koalaScaleZ * 0.0625);
    middleBone3.render();

    var middleFinger = new Cube();
    middleFinger.color = g_koalaGreyColorMat;
    middleFinger.matrix = new Matrix4(middleBone1Mat);
    middleFinger.matrix.translate(-0.2 * g_koalaScaleX,0.0 * g_koalaScaleY, -0.065 * g_koalaScaleZ);
    middleFinger.matrix.scale(0.5 * g_koalaScaleX, 0.45 * g_koalaScaleY, 0.2 * g_koalaScaleZ);
    middleFinger.render();

    var middleFinger2 = new Cube();
    middleFinger2.color = g_koalaGreyColorMat;
    middleFinger2.matrix = new Matrix4(middleBone2Mat);
    middleFinger2.matrix.translate(-0.2 * g_koalaScaleX, 0.0 * g_koalaScaleY, -0.065 * g_koalaScaleZ);
    middleFinger2.matrix.scale(0.5 * g_koalaScaleX, 0.45 * g_koalaScaleY, 0.2 * g_koalaScaleZ);
    middleFinger2.render();

    var middleFinger3 = new Cube();
    middleFinger3.color = g_koalaGreyColorMat;
    middleFinger3.matrix = new Matrix4(middleBone3Mat);
    middleFinger3.matrix.translate(-0.2 * g_koalaScaleX, -0.01 * g_koalaScaleY, -0.065 * g_koalaScaleZ);
    middleFinger3.matrix.scale(0.5 * g_koalaScaleX, 0.45 * g_koalaScaleY, 0.2 * g_koalaScaleZ);
    middleFinger3.render();

    // PINKY? FINGER
    var fingyJoint5 = new Cube();
    fingyJoint5.color = g_koalaDarkerGreyColorMat;
    fingyJoint5.matrix = new Matrix4(rootCubeMat);
    fingyJoint5.matrix.translate(0.5 * g_koalaScaleX, 0.0 * g_koalaScaleY, -0.05 * g_koalaScaleZ);
    fingyJoint5.matrix.rotate(rotatePinkyFinger, 0, 0, 1);
    var fingyJoint5Mat = new Matrix4(fingyJoint5.matrix);
    fingyJoint5.matrix.scale(g_koalaScaleX * 0.25, g_koalaScaleY * 0.125, g_koalaScaleZ * 0.125);
    fingyJoint5.matrix.translate(-0.5, -0.5, 0.0);
    fingyJoint5.render();

    var pinkyBone1 = new Cube();
    pinkyBone1.color = g_yellow;
    pinkyBone1.matrix = new Matrix4(fingyJoint5Mat);
    pinkyBone1.matrix.translate(-0.06 * g_koalaScaleX, -0.46 * g_koalaScaleY, 0.03 * g_koalaScaleZ);
    var pinkyBone1Mat = new Matrix4(pinkyBone1.matrix);
    pinkyBone1.matrix.scale(g_koalaScaleX * 0.125, g_koalaScaleY * 0.4, g_koalaScaleZ * 0.0625);
    pinkyBone1.render();

    var pinkyJoint1 = new Cube();
    pinkyJoint1.color = g_koalaDarkerGreyColorMat;
    pinkyJoint1.matrix = new Matrix4(fingyJoint5Mat);
    pinkyJoint1.matrix.translate(0.0, -0.47 * g_koalaScaleY, 0.0);
    pinkyJoint1.matrix.rotate(rotatePinkyFinger * 1.3, 0, 0, 1);
    var pinkyJoint1Mat = new Matrix4(pinkyJoint1.matrix);
    pinkyJoint1.matrix.scale(g_koalaScaleX * 0.25, g_koalaScaleY * 0.125, g_koalaScaleZ * 0.125);
    pinkyJoint1.matrix.translate(-0.5, -0.5, 0.0);
    pinkyJoint1.render();

    var pinkyBone2 = new Cube();
    pinkyBone2.color = g_yellow;
    pinkyBone2.matrix = new Matrix4(pinkyJoint1Mat);
    pinkyBone2.matrix.translate(-0.07 * g_koalaScaleX, -0.46 * g_koalaScaleY, 0.03 * g_koalaScaleZ);
    var pinkyBone2Mat = new Matrix4(pinkyBone2.matrix);
    pinkyBone2.matrix.scale(g_koalaScaleX * 0.125, g_koalaScaleY * 0.4, g_koalaScaleZ * 0.0625);
    pinkyBone2.render();

    var pinkyJoint2 = new Cube();
    pinkyJoint2.color = g_koalaDarkerGreyColorMat;
    pinkyJoint2.matrix = new Matrix4(pinkyJoint1Mat);
    pinkyJoint2.matrix.translate(0.0, -0.47 * g_koalaScaleY, 0.0);
    pinkyJoint2.matrix.rotate(rotatePinkyFinger * 1.3, 0, 0, 1);
    var pinkyJoint2Mat = new Matrix4(pinkyJoint2.matrix);
    pinkyJoint2.matrix.scale(g_koalaScaleX * 0.25, g_koalaScaleY * 0.125, g_koalaScaleZ * 0.125);
    pinkyJoint2.matrix.translate(-0.5, -0.5, 0.0);
    pinkyJoint2.render();

    var pinkyBone3 = new Cube();
    pinkyBone3.color = g_yellow;
    pinkyBone3.matrix = new Matrix4(pinkyJoint2Mat);
    pinkyBone3.matrix.translate(-0.07 * g_koalaScaleX, -0.46 * g_koalaScaleY, 0.03 * g_koalaScaleZ);
    var pinkyBone3Mat = new Matrix4(pinkyBone3.matrix);
    pinkyBone3.matrix.scale(g_koalaScaleX * 0.125, g_koalaScaleY * 0.4, g_koalaScaleZ * 0.0625);
    pinkyBone3.render();

    var pinkyFinger = new Cube();
    pinkyFinger.color = g_koalaGreyColorMat;
    pinkyFinger.matrix = new Matrix4(pinkyBone1Mat);
    pinkyFinger.matrix.translate(-0.2 * g_koalaScaleX,0.0 * g_koalaScaleY, -0.065 * g_koalaScaleZ);
    pinkyFinger.matrix.scale(0.5 * g_koalaScaleX, 0.45 * g_koalaScaleY, 0.2 * g_koalaScaleZ);
    pinkyFinger.render();

    var pinkyFinger2 = new Cube();
    pinkyFinger2.color = g_koalaGreyColorMat;
    pinkyFinger2.matrix = new Matrix4(pinkyBone2Mat);
    pinkyFinger2.matrix.translate(-0.2 * g_koalaScaleX, 0.0 * g_koalaScaleY, -0.065 * g_koalaScaleZ);
    pinkyFinger2.matrix.scale(0.5 * g_koalaScaleX, 0.45 * g_koalaScaleY, 0.2 * g_koalaScaleZ);
    pinkyFinger2.render();

    var pinkyFinger3 = new Cube();
    pinkyFinger3.color = g_koalaGreyColorMat;
    pinkyFinger3.matrix = new Matrix4(pinkyBone3Mat);
    pinkyFinger3.matrix.translate(-0.2 * g_koalaScaleX, -0.01 * g_koalaScaleY, -0.065 * g_koalaScaleZ);
    pinkyFinger3.matrix.scale(0.5 * g_koalaScaleX, 0.45 * g_koalaScaleY, 0.2 * g_koalaScaleZ);
    pinkyFinger3.render();
}
