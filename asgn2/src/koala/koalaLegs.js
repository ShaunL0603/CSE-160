function makeKoalaLegs(rootCubeMat) {
    // LEFT LEG CUBES
    var leftHipJoint = new Cube();
    leftHipJoint.color = g_green;
    leftHipJoint.matrix = new Matrix4(rootCubeMat);
    leftHipJoint.matrix.translate(13.3 * g_koalaScaleX, 0.0, -1.83 * g_koalaScaleZ);
    leftHipJoint.matrix.rotate(g_rotateUpperLeftLeg, 0, 0, 1);
    var leftHipJointMat = new Matrix4(leftHipJoint.matrix);
    leftHipJoint.matrix.scale(g_koalaScaleX * 2.0, g_koalaScaleY * 1.0, g_koalaScaleZ * 1.0);
    leftHipJoint.matrix.translate(-0.5, -0.5, -0.5);
    leftHipJoint.render();

    var upperLeftLegBone = new Cube();
    upperLeftLegBone.color = g_yellow;
    upperLeftLegBone.matrix = new Matrix4(leftHipJointMat);
    upperLeftLegBone.matrix.translate(-0.5 * g_koalaScaleX, -2.0 * g_koalaScaleY, -0.25 * g_koalaScaleZ)
    upperLeftLegBone.matrix.scale(g_koalaScaleX * 1.0, g_koalaScaleY * 1.5, g_koalaScaleZ * 0.5);
    upperLeftLegBone.render();

    var leftKneeJoint = new Cube();
    leftKneeJoint.color = g_green;
    leftKneeJoint.matrix = new Matrix4(leftHipJointMat);
    leftKneeJoint.matrix.translate(0.0, -2.0 * g_koalaScaleY, 0.0);
    leftKneeJoint.matrix.rotate(g_rotateLowerLeftLeg, 0, 0, 1);
    var leftKneeJointMat = new Matrix4(leftKneeJoint.matrix);
    leftKneeJoint.matrix.scale(g_koalaScaleX * 1.5, g_koalaScaleY * 0.9, g_koalaScaleZ * 0.9);
    leftKneeJoint.matrix.translate(-0.5, -0.5, -0.5);
    leftKneeJoint.render();

    var lowerLeftLegBone = new Cube();
    lowerLeftLegBone.color = g_yellow;
    lowerLeftLegBone.matrix = new Matrix4(leftKneeJointMat);
    lowerLeftLegBone.matrix.translate(-0.5 * g_koalaScaleX, -2.9 * g_koalaScaleY, -0.25 * g_koalaScaleZ)
    lowerLeftLegBone.matrix.scale(g_koalaScaleX * 1.0, g_koalaScaleY * 2.5, g_koalaScaleZ * 0.5);
    lowerLeftLegBone.render();

    var leftAnkleJoint = new Cube();
    leftAnkleJoint.color = g_green;
    leftAnkleJoint.matrix = new Matrix4(leftKneeJointMat);
    leftAnkleJoint.matrix.translate(0.0, -2.9 * g_koalaScaleY, 0.0);
    leftAnkleJoint.matrix.rotate(g_rotateLeftAnkleX, 1, 0, 0);
    leftAnkleJoint.matrix.rotate(g_rotateLeftAnkleY, 0, 1, 0);
    leftAnkleJoint.matrix.rotate(g_rotateLeftAnkleZ, 0, 0, 1);
    var leftAnkleJointMat = new Matrix4(leftAnkleJoint.matrix);
    leftAnkleJoint.matrix.scale(g_koalaScaleX * 1.2, g_koalaScaleY * 0.8, g_koalaScaleZ * 0.8);
    leftAnkleJoint.matrix.translate(-0.5, -0.5, -0.5);
    leftAnkleJoint.render();

    var leftFoot = new Cube();
    leftFoot.color = g_koalaGreyColorMat;
    leftFoot.matrix = new Matrix4(leftAnkleJointMat);
    leftFoot.matrix.translate(-0.5 * g_koalaScaleX, -1.33 * g_koalaScaleY, -0.55 * g_koalaScaleZ);
    var leftFootMat = new Matrix4(leftFoot.matrix);
    leftFoot.matrix.scale(g_koalaScaleX * 1.0, g_koalaScaleY * 1.2, g_koalaScaleZ * 1.1);
    leftFoot.render();

    //* LEFT LEG CUBES
    var leftUpperLeg1 = new Cube();
    leftUpperLeg1.color = g_koalaGreyColorMat;
    leftUpperLeg1.matrix = new Matrix4(leftHipJointMat);
    leftUpperLeg1.matrix.translate(-2.0 * g_koalaScaleX, -0.5 * g_koalaScaleY, -0.75 * g_koalaScaleZ);
    var leftUpperLeg1Mat = new Matrix4(leftUpperLeg1.matrix);
    leftUpperLeg1.matrix.scale(4.0 * g_koalaScaleX, 1.5 * g_koalaScaleY, 1.5 * g_koalaScaleZ);
    leftUpperLeg1.render();

    var leftUpperLeg2 = new Cube();
    leftUpperLeg2.color = g_koalaGreyColorMat;
    leftUpperLeg2.matrix = new Matrix4(leftUpperLeg1Mat);
    leftUpperLeg2.matrix.translate(0.25 * g_koalaScaleX, -1.2 * g_koalaScaleY, 0.13 * g_koalaScaleZ);
    leftUpperLeg2.matrix.scale(3.5 * g_koalaScaleX, 1.7 * g_koalaScaleY, 1.25 * g_koalaScaleZ);
    leftUpperLeg2.render();

    var rightKnee = new Cube();
    rightKnee.color = g_koalaDarkerGreyColorMat;
    rightKnee.matrix = new Matrix4(leftKneeJointMat);
    rightKnee.matrix.translate(-1.0 * g_koalaScaleX, 0.0 * g_koalaScaleY, -0.5 * g_koalaScaleZ);
    rightKnee.matrix.scale(2.0 * g_koalaScaleX, 0.6 * g_koalaScaleY, 1. * g_koalaScaleZ);
    rightKnee.render();

    var LeftLowerLeg1 = new Cube();
    LeftLowerLeg1.color = g_koalaGreyColorMat;
    LeftLowerLeg1.matrix = new Matrix4(leftKneeJointMat);
    LeftLowerLeg1.matrix.translate(-1.0 * g_koalaScaleX, -1.5 * g_koalaScaleY, -0.5 * g_koalaScaleZ);
    var LeftLowerLeg1Mat = new Matrix4(LeftLowerLeg1.matrix);
    LeftLowerLeg1.matrix.scale(2.0 * g_koalaScaleX, 1.5 * g_koalaScaleY, 1.0 * g_koalaScaleZ);
    LeftLowerLeg1.render();

    var LeftLowerLeg2 = new Cube();
    LeftLowerLeg2.color = g_koalaGreyColorMat;
    LeftLowerLeg2.matrix = new Matrix4(LeftLowerLeg1Mat);
    LeftLowerLeg2.matrix.translate(0.1 * g_koalaScaleX, -1.6 * g_koalaScaleY, 0.1 * g_koalaScaleZ);
    LeftLowerLeg2.matrix.scale(1.8 * g_koalaScaleX, 1.6 * g_koalaScaleY, 0.8 * g_koalaScaleZ);
    LeftLowerLeg2.render();

    var leftAnkle = new Cube();
    leftAnkle.color = g_koalaDarkerGreyColorMat;
    leftAnkle.matrix = new Matrix4(leftAnkleJointMat);
    leftAnkle.matrix.translate(-0.5 * g_koalaScaleX, -0.4 * g_koalaScaleY, -0.35 * g_koalaScaleZ);
    leftAnkle.matrix.scale(1.0 * g_koalaScaleX, 0.7 * g_koalaScaleY, 0.7 * g_koalaScaleZ);
    leftAnkle.render();

    makeKoalaToes(leftFootMat, LEFT);

    // RIGHT LEG CUBES
    // reflecting left leg
    var rightHipJoint = new Cube();
    rightHipJoint.color = g_green;
    rightHipJoint.matrix = new Matrix4(rootCubeMat);
    rightHipJoint.matrix.translate(13.3 * g_koalaScaleX, 0.0, 1.83 * g_koalaScaleZ);
    rightHipJoint.matrix.rotate(g_rotateUpperRightLeg, 0, 0, 1);
    var rightHipJointMat = new Matrix4(rightHipJoint.matrix);
    rightHipJoint.matrix.scale(g_koalaScaleX * 2.0, g_koalaScaleY * 1.0, g_koalaScaleZ * 1.0);
    rightHipJoint.matrix.translate(-0.5, -0.5, -0.5);
    rightHipJoint.render();

    var upperRightLegBone = new Cube();
    upperRightLegBone.color = g_yellow;
    upperRightLegBone.matrix = new Matrix4(rightHipJointMat);
    upperRightLegBone.matrix.translate(-0.5 * g_koalaScaleX, -2.0 * g_koalaScaleY, -0.25 * g_koalaScaleZ);
    upperRightLegBone.matrix.scale(g_koalaScaleX * 1.0, g_koalaScaleY * 1.5, g_koalaScaleZ * 0.5);
    upperRightLegBone.render();

    var rightKneeJoint = new Cube();
    rightKneeJoint.color = g_green;
    rightKneeJoint.matrix = new Matrix4(rightHipJointMat);
    rightKneeJoint.matrix.translate(0.0, -2.0 * g_koalaScaleY, 0.0);
    rightKneeJoint.matrix.rotate(g_rotateLowerRightLeg, 0, 0, 1);
    var rightKneeJointMat = new Matrix4(rightKneeJoint.matrix);
    rightKneeJoint.matrix.scale(g_koalaScaleX * 1.5, g_koalaScaleY * 0.9, g_koalaScaleZ * 0.9);
    rightKneeJoint.matrix.translate(-0.5, -0.5, -0.5);
    rightKneeJoint.render();

    var lowerRightLegBone = new Cube();
    lowerRightLegBone.color = g_yellow;
    lowerRightLegBone.matrix = new Matrix4(rightKneeJointMat);
    lowerRightLegBone.matrix.translate(-0.5 * g_koalaScaleX, -2.9 * g_koalaScaleY, -0.25 * g_koalaScaleZ);
    lowerRightLegBone.matrix.scale(g_koalaScaleX * 1.0, g_koalaScaleY * 2.5, g_koalaScaleZ * 0.5);
    lowerRightLegBone.render();

    var rightAnkleJoint = new Cube();
    rightAnkleJoint.color = g_green;
    rightAnkleJoint.matrix = new Matrix4(rightKneeJointMat);
    rightAnkleJoint.matrix.translate(0.0, -2.9 * g_koalaScaleY, 0.0);
    rightAnkleJoint.matrix.rotate(g_rotateRightAnkleX, 1, 0, 0);
    rightAnkleJoint.matrix.rotate(g_rotateRightAnkleY + 180, 0, 1, 0);
    rightAnkleJoint.matrix.rotate(g_rotateRightAnkleZ, 0, 0, 1);
    var rightAnkleJointMat = new Matrix4(rightAnkleJoint.matrix);
    rightAnkleJoint.matrix.scale(g_koalaScaleX * 1.2, g_koalaScaleY * 0.8, g_koalaScaleZ * 0.8);
    rightAnkleJoint.matrix.translate(-0.5, -0.5, -0.5);
    rightAnkleJoint.render();

    var rightFoot = new Cube();
    rightFoot.color = g_koalaGreyColorMat;
    rightFoot.matrix = new Matrix4(rightAnkleJointMat);
    rightFoot.matrix.translate(-0.5 * g_koalaScaleX, -1.33 * g_koalaScaleY, -0.55 * g_koalaScaleZ);
    rightFoot.matrix.scale(g_koalaScaleX * 1.0, g_koalaScaleY * 1.2, g_koalaScaleZ * 1.1);
    rightFoot.render();

    makeKoalaToes(rightAnkleJointMat, RIGHT);
}
