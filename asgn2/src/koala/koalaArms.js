// Global rotation variables
    // Left Arm rotation
    let g_rotateUpperLeftArm = 10;
    let g_rotateLowerLeftArm = -30;
    let g_rotateLeftWristX = 0;
    let g_rotateLeftWristY = 0;
    let g_rotateLeftWristZ = 0;
    
    // Right Arm rotations
    let g_rotateUpperRightArm = 10;
    let g_rotateLowerRightArm = -30;
    let g_rotateRightWristX = 0;
    let g_rotateRightWristY = 0;
    let g_rotateRightWristZ = 0;

function makeKoalaArms(rootCubeMat) {
    // LEFT ARM CUBES
    var leftShoulderJoint = new Cube();
    leftShoulderJoint.color = g_green;
    leftShoulderJoint.matrix = new Matrix4(rootCubeMat);
    leftShoulderJoint.matrix.translate(-0.5, 0.0, -5.5);
    leftShoulderJoint.matrix.rotate(g_rotateUpperLeftArm, 0, 0, 1);
    var leftShoulderJointMat = new Matrix4(leftShoulderJoint.matrix);
    leftShoulderJoint.matrix.scale(g_koalaScaleX * 2.0, g_koalaScaleY * 1.0, g_koalaScaleZ * 1.0);
    leftShoulderJoint.matrix.translate(-0.5, -0.5, -0.5);
    leftShoulderJoint.render();

    var upperLeftArmBone = new Cube();
    upperLeftArmBone.color = g_yellow;
    upperLeftArmBone.matrix = new Matrix4(leftShoulderJointMat);
    upperLeftArmBone.matrix.translate(-0.75, -6.0, -0.75)
    upperLeftArmBone.matrix.scale(g_koalaScaleX * 1.0, g_koalaScaleY * 1.5, g_koalaScaleZ * 0.5);
    upperLeftArmBone.render();

    var leftElbowJoint = new Cube();
    leftElbowJoint.color = g_green;
    leftElbowJoint.matrix = new Matrix4(leftShoulderJointMat);
    leftElbowJoint.matrix.translate(0.0, -6.0, 0.0);
    leftElbowJoint.matrix.rotate(g_rotateLowerLeftArm, 0, 0, 1);
    var leftElbowJointMat = new Matrix4(leftElbowJoint.matrix);
    leftElbowJoint.matrix.scale(g_koalaScaleX * 1.5, g_koalaScaleY * 0.9, g_koalaScaleZ * 0.9);
    leftElbowJoint.matrix.translate(-0.5, -0.5, -0.5);
    leftElbowJoint.render();

    var lowerLeftArmBone = new Cube();
    lowerLeftArmBone.color = g_yellow;
    lowerLeftArmBone.matrix = new Matrix4(leftElbowJointMat);
    lowerLeftArmBone.matrix.translate(-0.75, -8.7, -0.75)
    lowerLeftArmBone.matrix.scale(g_koalaScaleX * 1.0, g_koalaScaleY * 2.5, g_koalaScaleZ * 0.5);
    lowerLeftArmBone.render();

    var leftWristJoint = new Cube();
    leftWristJoint.color = g_green;
    leftWristJoint.matrix = new Matrix4(leftElbowJointMat);
    leftWristJoint.matrix.translate(0.0, -8.7, 0.0);
    leftWristJoint.matrix.rotate(g_rotateLeftWristX, 1, 0, 0);
    leftWristJoint.matrix.rotate(g_rotateLeftWristY, 0, 1, 0);
    leftWristJoint.matrix.rotate(g_rotateLeftWristZ, 0, 0, 1);
    var leftWristJointMat = new Matrix4(leftWristJoint.matrix);
    leftWristJoint.matrix.scale(g_koalaScaleX * 1.2, g_koalaScaleY * 0.8, g_koalaScaleZ * 0.8);
    leftWristJoint.matrix.translate(-0.5, -0.5, -0.5);
    leftWristJoint.render();

    var leftHand = new Cube();
    leftHand.color = g_koalaGreyColorMat;
    leftHand.matrix = new Matrix4(leftWristJointMat);
    leftHand.matrix.translate(-0.75, -4.0, -1.65);
    leftHand.matrix.scale(g_koalaScaleX * 1.0, g_koalaScaleY * 1.2, g_koalaScaleZ * 1.1);
    leftHand.render();

    makeKoalaFingys(leftWristJointMat, LEFT);

    // RIGHT ARM CUBES
    // reflecting left arm
    var rightShoulderJoint = new Cube();
    rightShoulderJoint.color = g_green;
    rightShoulderJoint.matrix = new Matrix4(rootCubeMat);
    rightShoulderJoint.matrix.translate(-0.5, 0.0, 5.5);
    rightShoulderJoint.matrix.rotate(g_rotateUpperRightArm, 0, 0, 1);
    var rightShoulderJointMat = new Matrix4(rightShoulderJoint.matrix);
    rightShoulderJoint.matrix.scale(g_koalaScaleX * 2.0, g_koalaScaleY * 1.0, g_koalaScaleZ * 1.0);
    rightShoulderJoint.matrix.translate(-0.5, -0.5, -0.5);
    rightShoulderJoint.render();

    var upperRightArmBone = new Cube();
    upperRightArmBone.color = g_yellow;
    upperRightArmBone.matrix = new Matrix4(rightShoulderJointMat);
    upperRightArmBone.matrix.translate(-0.75, -6.0, -0.75);
    upperRightArmBone.matrix.scale(g_koalaScaleX * 1.0, g_koalaScaleY * 1.5, g_koalaScaleZ * 0.5);
    upperRightArmBone.render();

    var rightElbowJoint = new Cube();
    rightElbowJoint.color = g_green;
    rightElbowJoint.matrix = new Matrix4(rightShoulderJointMat);
    rightElbowJoint.matrix.translate(0.0, -6.0, 0.0);
    rightElbowJoint.matrix.rotate(g_rotateLowerRightArm, 0, 0, 1);
    var rightElbowJointMat = new Matrix4(rightElbowJoint.matrix);
    rightElbowJoint.matrix.scale(g_koalaScaleX * 1.5, g_koalaScaleY * 0.9, g_koalaScaleZ * 0.9);
    rightElbowJoint.matrix.translate(-0.5, -0.5, -0.5);
    rightElbowJoint.render();

    var lowerRightArmBone = new Cube();
    lowerRightArmBone.color = g_yellow;
    lowerRightArmBone.matrix = new Matrix4(rightElbowJointMat);
    lowerRightArmBone.matrix.translate(-0.75, -8.7, -0.75);
    lowerRightArmBone.matrix.scale(g_koalaScaleX * 1.0, g_koalaScaleY * 2.5, g_koalaScaleZ * 0.5);
    lowerRightArmBone.render();

    var rightWristJoint = new Cube();
    rightWristJoint.color = g_green;
    rightWristJoint.matrix = new Matrix4(rightElbowJointMat);
    rightWristJoint.matrix.translate(0.0, -8.7, 0.0);
    rightWristJoint.matrix.rotate(g_rotateRightWristX, 1, 0, 0);
    rightWristJoint.matrix.rotate(g_rotateRightWristY, 0, 1, 0);
    rightWristJoint.matrix.rotate(g_rotateRightWristZ, 0, 0, 1);
    var rightWristJointMat = new Matrix4(rightWristJoint.matrix);
    rightWristJoint.matrix.scale(g_koalaScaleX * 1.2, g_koalaScaleY * 0.8, g_koalaScaleZ * 0.8);
    rightWristJoint.matrix.translate(-0.5, -0.5, -0.5);
    rightWristJoint.render();

    var rightHand = new Cube();
    rightHand.color = g_koalaGreyColorMat;
    rightHand.matrix = new Matrix4(rightWristJointMat);
    rightHand.matrix.translate(-0.75, -4.0, -1.65);
    rightHand.matrix.scale(g_koalaScaleX * 1.0, g_koalaScaleY * 1.2, g_koalaScaleZ * 1.1);
    rightHand.render();

    makeKoalaFingys(rightWristJointMat, RIGHT);
}
