function makeKoalaArmBones(rootCubeMat) {
    //* LEFT ARM JOINTS AND BONES
    var leftShoulderJoint = new Cube();
    leftShoulderJoint.color = g_green;
    leftShoulderJoint.matrix = new Matrix4(rootCubeMat);
    leftShoulderJoint.matrix.translate(-6.0 * g_koalaScaleX, -1.5 * g_koalaScaleY, -2.05 * g_koalaScaleZ);
    leftShoulderJoint.matrix.rotate(g_rotateUpperLeftArm, 0, 0, 1);
    var leftShoulderJointMat = new Matrix4(leftShoulderJoint.matrix);
    leftShoulderJoint.matrix.scale(g_koalaScaleX * 2.0, g_koalaScaleY * 1.0, g_koalaScaleZ * 1.0);
    leftShoulderJoint.matrix.translate(-0.5, -0.5, -0.5);
    leftShoulderJoint.render();

    var upperLeftArmBone = new Cube();
    upperLeftArmBone.color = g_yellow;
    upperLeftArmBone.matrix = new Matrix4(leftShoulderJointMat);
    upperLeftArmBone.matrix.translate(-0.5 * g_koalaScaleX, -2.0 * g_koalaScaleY, -0.25 * g_koalaScaleZ)
    upperLeftArmBone.matrix.scale(g_koalaScaleX * 1.0, g_koalaScaleY * 1.5, g_koalaScaleZ * 0.5);
    upperLeftArmBone.render();

    var leftElbowJoint = new Cube();
    leftElbowJoint.color = g_green;
    leftElbowJoint.matrix = new Matrix4(leftShoulderJointMat);
    leftElbowJoint.matrix.translate(0.0, -2.0 * g_koalaScaleY, 0.0);
    leftElbowJoint.matrix.rotate(g_rotateLowerLeftArm, 0, 0, 1);
    var leftElbowJointMat = new Matrix4(leftElbowJoint.matrix);
    leftElbowJoint.matrix.scale(g_koalaScaleX * 1.25, g_koalaScaleY * 0.75, g_koalaScaleZ * 0.75);
    leftElbowJoint.matrix.translate(-0.5, -0.5, -0.5);
    leftElbowJoint.render();

    var lowerLeftArmBone = new Cube();
    lowerLeftArmBone.color = g_yellow;
    lowerLeftArmBone.matrix = new Matrix4(leftElbowJointMat);
    lowerLeftArmBone.matrix.translate(-0.5 * g_koalaScaleX, -2.9 * g_koalaScaleY, -0.25 * g_koalaScaleZ)
    lowerLeftArmBone.matrix.scale(g_koalaScaleX * 1.0, g_koalaScaleY * 2.5, g_koalaScaleZ * 0.5);
    lowerLeftArmBone.render();

    var leftWristJoint = new Cube();
    leftWristJoint.color = g_green;
    leftWristJoint.matrix = new Matrix4(leftElbowJointMat);
    leftWristJoint.matrix.translate(0.0, -2.9 * g_koalaScaleY, 0.0);
    leftWristJoint.matrix.rotate(g_rotateLeftWristX, 1, 0, 0);
    leftWristJoint.matrix.rotate(g_rotateLeftWristY, 0, 1, 0);
    leftWristJoint.matrix.rotate(g_rotateLeftWristZ, 0, 0, 1);
    var leftWristJointMat = new Matrix4(leftWristJoint.matrix);
    leftWristJoint.matrix.scale(g_koalaScaleX * 0.85, g_koalaScaleY * 0.51, g_koalaScaleZ * 0.51);
    leftWristJoint.matrix.translate(-0.5, -0.5, -0.5);
    leftWristJoint.render();
    
    //* LEFT ARM CUBES
    var leftUpperArm1 = new Cube();
    leftUpperArm1.color = g_koalaGreyColorMat;
    leftUpperArm1.matrix = new Matrix4(leftShoulderJointMat);
    leftUpperArm1.matrix.translate(-2.0 * g_koalaScaleX, -0.5 * g_koalaScaleY, -0.75 * g_koalaScaleZ);
    var leftUpperArm1Mat = new Matrix4(leftUpperArm1.matrix);
    leftUpperArm1.matrix.scale(4.0 * g_koalaScaleX, 1.5 * g_koalaScaleY, 1.5 * g_koalaScaleZ);
    leftUpperArm1.render();

    var leftUpperArm2 = new Cube();
    leftUpperArm2.color = g_koalaGreyColorMat;
    leftUpperArm2.matrix = new Matrix4(leftUpperArm1Mat);
    leftUpperArm2.matrix.translate(0.25 * g_koalaScaleX, -1.2 * g_koalaScaleY, 0.13 * g_koalaScaleZ);
    leftUpperArm2.matrix.scale(3.5 * g_koalaScaleX, 1.7 * g_koalaScaleY, 1.25 * g_koalaScaleZ);
    leftUpperArm2.render();

    var leftElbow = new Cube();
    leftElbow.color = g_koalaDarkerGreyColorMat;
    leftElbow.matrix = new Matrix4(leftElbowJointMat);
    leftElbow.matrix.translate(-1.0 * g_koalaScaleX, 0.0 * g_koalaScaleY, -0.5 * g_koalaScaleZ);
    leftElbow.matrix.scale(2.0 * g_koalaScaleX, 0.6 * g_koalaScaleY, 1. * g_koalaScaleZ);
    leftElbow.render();

    var LeftLowerArm1 = new Cube();
    LeftLowerArm1.color = g_koalaGreyColorMat;
    LeftLowerArm1.matrix = new Matrix4(leftElbowJointMat);
    LeftLowerArm1.matrix.translate(-1.0 * g_koalaScaleX, -1.5 * g_koalaScaleY, -0.5 * g_koalaScaleZ);
    var LeftLowerArm1Mat = new Matrix4(LeftLowerArm1.matrix);
    LeftLowerArm1.matrix.scale(2.0 * g_koalaScaleX, 1.5 * g_koalaScaleY, 1.0 * g_koalaScaleZ);
    LeftLowerArm1.render();

    var LeftLowerArm2 = new Cube();
    LeftLowerArm2.color = g_koalaGreyColorMat;
    LeftLowerArm2.matrix = new Matrix4(LeftLowerArm1Mat);
    LeftLowerArm2.matrix.translate(0.1 * g_koalaScaleX, -1.6 * g_koalaScaleY, 0.1 * g_koalaScaleZ);
    // var LeftLowerArm2Mat = new Matrix4(LeftLowerArm1.matrix);
    LeftLowerArm2.matrix.scale(1.8 * g_koalaScaleX, 1.6 * g_koalaScaleY, 0.8 * g_koalaScaleZ);
    LeftLowerArm2.render();

    var leftWrist = new Cube();
    leftWrist.color = g_koalaDarkerGreyColorMat;
    leftWrist.matrix = new Matrix4(leftWristJointMat);
    leftWrist.matrix.translate(-0.5 * g_koalaScaleX, -0.4 * g_koalaScaleY, -0.35 * g_koalaScaleZ);
    leftWrist.matrix.scale(1.0 * g_koalaScaleX, 0.7 * g_koalaScaleY, 0.7 * g_koalaScaleZ);
    leftWrist.render();

    var leftHand = new Cube();
    leftHand.color = g_koalaGreyColorMat;
    leftHand.matrix = new Matrix4(leftWristJointMat);
    leftHand.matrix.translate(-0.5 * g_koalaScaleX, -1.5 * g_koalaScaleY, -0.55 * g_koalaScaleZ);
    var leftHandMat = new Matrix4(leftHand.matrix);
    leftHand.matrix.scale(g_koalaScaleX * 1.0, g_koalaScaleY * 1.2, g_koalaScaleZ * 1.1);
    leftHand.render();

    makeKoalaFingys(leftHandMat, LEFT);
    
    //* RIGHT ARM JOINTS AND CUBES
    // reflecting left arm
    var rightShoulderJoint = new Cube();
    rightShoulderJoint.color = g_green;
    rightShoulderJoint.matrix = new Matrix4(rootCubeMat);
    rightShoulderJoint.matrix.translate(-6.0 * g_koalaScaleX, -1.5 * g_koalaScaleY, 1.83 * g_koalaScaleZ);
    rightShoulderJoint.matrix.rotate(g_rotateUpperRightArm, 0, 0, 1);
    var rightShoulderJointMat = new Matrix4(rightShoulderJoint.matrix);
    rightShoulderJoint.matrix.scale(g_koalaScaleX * 2.0, g_koalaScaleY * 1.0, g_koalaScaleZ * 1.0);
    rightShoulderJoint.matrix.translate(-0.5, -0.5, -0.5);
    rightShoulderJoint.render();

    var upperRightArmBone = new Cube();
    upperRightArmBone.color = g_yellow;
    upperRightArmBone.matrix = new Matrix4(rightShoulderJointMat);
    upperRightArmBone.matrix.translate(-0.5 * g_koalaScaleX, -2.0 * g_koalaScaleY, -0.25 * g_koalaScaleZ);
    upperRightArmBone.matrix.scale(g_koalaScaleX * 1.0, g_koalaScaleY * 1.5, g_koalaScaleZ * 0.5);
    upperRightArmBone.render();

    var rightElbowJoint = new Cube();
    rightElbowJoint.color = g_green;
    rightElbowJoint.matrix = new Matrix4(rightShoulderJointMat);
    rightElbowJoint.matrix.translate(0.0, -2.0 * g_koalaScaleY, 0.0);
    rightElbowJoint.matrix.rotate(g_rotateLowerRightArm, 0, 0, 1);
    var rightElbowJointMat = new Matrix4(rightElbowJoint.matrix);
    rightElbowJoint.matrix.scale(g_koalaScaleX * 1.5, g_koalaScaleY * 0.9, g_koalaScaleZ * 0.9);
    rightElbowJoint.matrix.translate(-0.5, -0.5, -0.5);
    rightElbowJoint.render();

    var lowerRightArmBone = new Cube();
    lowerRightArmBone.color = g_yellow;
    lowerRightArmBone.matrix = new Matrix4(rightElbowJointMat);
    lowerRightArmBone.matrix.translate(-0.5 * g_koalaScaleX, -2.9 * g_koalaScaleY, -0.25 * g_koalaScaleZ);
    lowerRightArmBone.matrix.scale(g_koalaScaleX * 1.0, g_koalaScaleY * 2.5, g_koalaScaleZ * 0.5);
    lowerRightArmBone.render();

    var rightWristJoint = new Cube();
    rightWristJoint.color = g_green;
    rightWristJoint.matrix = new Matrix4(rightElbowJointMat);
    rightWristJoint.matrix.translate(0.0, -2.9 * g_koalaScaleY, 0.0);
    rightWristJoint.matrix.rotate(g_rotateRightWristX, 1, 0, 0);
    rightWristJoint.matrix.rotate(g_rotateRightWristY + 180, 0, 1, 0);
    rightWristJoint.matrix.rotate(g_rotateRightWristZ, 0, 0, 1);
    var rightWristJointMat = new Matrix4(rightWristJoint.matrix);
    rightWristJoint.matrix.scale(g_koalaScaleX * 0.85, g_koalaScaleY * 0.51, g_koalaScaleZ * 0.51);
    rightWristJoint.matrix.translate(-0.5, -0.5, -0.5);
    rightWristJoint.render();
    
    //* RIGHT ARM CUBES
    var rightUpperArm1 = new Cube();
    rightUpperArm1.color = g_koalaGreyColorMat;
    rightUpperArm1.matrix = new Matrix4(rightShoulderJointMat);
    rightUpperArm1.matrix.translate(-2.0 * g_koalaScaleX, -0.5 * g_koalaScaleY, -0.75 * g_koalaScaleZ);
    var rightUpperArm1Mat = new Matrix4(rightUpperArm1.matrix);
    rightUpperArm1.matrix.scale(4.0 * g_koalaScaleX, 1.5 * g_koalaScaleY, 1.5 * g_koalaScaleZ);
    rightUpperArm1.render();

    var rightUpperArm2 = new Cube();
    rightUpperArm2.color = g_koalaGreyColorMat;
    rightUpperArm2.matrix = new Matrix4(rightUpperArm1Mat);
    rightUpperArm2.matrix.translate(0.25 * g_koalaScaleX, -1.2 * g_koalaScaleY, 0.13 * g_koalaScaleZ);
    rightUpperArm2.matrix.scale(3.5 * g_koalaScaleX, 1.7 * g_koalaScaleY, 1.25 * g_koalaScaleZ);
    rightUpperArm2.render();

    var rightElbow = new Cube();
    rightElbow.color = g_koalaDarkerGreyColorMat;
    rightElbow.matrix = new Matrix4(rightElbowJointMat);
    rightElbow.matrix.translate(-1.0 * g_koalaScaleX, 0.0 * g_koalaScaleY, -0.5 * g_koalaScaleZ);
    rightElbow.matrix.scale(2.0 * g_koalaScaleX, 0.6 * g_koalaScaleY, 1. * g_koalaScaleZ);
    rightElbow.render();

    var rightLowerArm1 = new Cube();
    rightLowerArm1.color = g_koalaGreyColorMat;
    rightLowerArm1.matrix = new Matrix4(rightElbowJointMat);
    rightLowerArm1.matrix.translate(-1.0 * g_koalaScaleX, -1.5 * g_koalaScaleY, -0.5 * g_koalaScaleZ);
    var rightLowerArm1Mat = new Matrix4(rightLowerArm1.matrix);
    rightLowerArm1.matrix.scale(2.0 * g_koalaScaleX, 1.5 * g_koalaScaleY, 1.0 * g_koalaScaleZ);
    rightLowerArm1.render();

    var rightLowerArm2 = new Cube();
    rightLowerArm2.color = g_koalaGreyColorMat;
    rightLowerArm2.matrix = new Matrix4(rightLowerArm1Mat);
    rightLowerArm2.matrix.translate(0.1 * g_koalaScaleX, -1.6 * g_koalaScaleY, 0.1 * g_koalaScaleZ);
    rightLowerArm2.matrix.scale(1.8 * g_koalaScaleX, 1.6 * g_koalaScaleY, 0.8 * g_koalaScaleZ);
    rightLowerArm2.render();

    var rightWrist = new Cube();
    rightWrist.color = g_koalaDarkerGreyColorMat;
    rightWrist.matrix = new Matrix4(rightWristJointMat);
    rightWrist.matrix.translate(-0.5 * g_koalaScaleX, -0.4 * g_koalaScaleY, -0.35 * g_koalaScaleZ);
    rightWrist.matrix.scale(1.0 * g_koalaScaleX, 0.7 * g_koalaScaleY, 0.7 * g_koalaScaleZ);
    rightWrist.render();

    var rightHand = new Cube();
    rightHand.color = g_koalaGreyColorMat;
    rightHand.matrix = new Matrix4(rightWristJointMat);
    rightHand.matrix.translate(-0.5 * g_koalaScaleX, -1.5 * g_koalaScaleY, -0.55 * g_koalaScaleZ);
    var rightHandMat = new Matrix4(rightHand.matrix);
    rightHand.matrix.scale(g_koalaScaleX * 1.0, g_koalaScaleY * 1.2, g_koalaScaleZ * 1.1);
    rightHand.render();

    makeKoalaFingys(rightHandMat, RIGHT);
}
