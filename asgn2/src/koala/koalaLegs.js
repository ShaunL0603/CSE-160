// Global rotation variables for legs
    // Left Leg rotations
    let g_rotateUpperLeftLeg = 10;
    let g_rotateLowerLeftLeg = -30;
    let g_rotateLeftAnkleX = 0;
    let g_rotateLeftAnkleY = 0;
    let g_rotateLeftAnkleZ = 0;

    // Right Leg rotations
    let g_rotateUpperRightLeg = 10;
    let g_rotateLowerRightLeg = -30;
    let g_rotateRightAnkleX = 0;
    let g_rotateRightAnkleY = 0;
    let g_rotateRightAnkleZ = 0;

function makeKoalaLegs(rootCubeMat) {
    // LEFT LEG CUBES
    var leftHipJoint = new Cube();
    leftHipJoint.color = g_green;
    leftHipJoint.matrix = new Matrix4(rootCubeMat);
    leftHipJoint.matrix.translate(10, 0.0, -5.5);
    leftHipJoint.matrix.rotate(g_rotateUpperLeftLeg, 0, 0, 1);
    var leftHipJointMat = new Matrix4(leftHipJoint.matrix);
    leftHipJoint.matrix.scale(g_koalaScaleX * 2.0, g_koalaScaleY * 1.0, g_koalaScaleZ * 1.0);
    leftHipJoint.matrix.translate(-0.5, -0.5, -0.5);
    leftHipJoint.render();

    var upperLeftLegBone = new Cube();
    upperLeftLegBone.color = g_yellow;
    upperLeftLegBone.matrix = new Matrix4(leftHipJointMat);
    upperLeftLegBone.matrix.translate(-0.75, -6.0, -0.75)
    upperLeftLegBone.matrix.scale(g_koalaScaleX * 1.0, g_koalaScaleY * 1.5, g_koalaScaleZ * 0.5);
    upperLeftLegBone.render();

    var leftKneeJoint = new Cube();
    leftKneeJoint.color = g_green;
    leftKneeJoint.matrix = new Matrix4(leftHipJointMat);
    leftKneeJoint.matrix.translate(0.0, -6.0, 0.0);
    leftKneeJoint.matrix.rotate(g_rotateLowerLeftLeg, 0, 0, 1);
    var leftKneeJointMat = new Matrix4(leftKneeJoint.matrix);
    leftKneeJoint.matrix.scale(g_koalaScaleX * 1.5, g_koalaScaleY * 0.9, g_koalaScaleZ * 0.9);
    leftKneeJoint.matrix.translate(-0.5, -0.5, -0.5);
    leftKneeJoint.render();

    var lowerLeftLegBone = new Cube();
    lowerLeftLegBone.color = g_yellow;
    lowerLeftLegBone.matrix = new Matrix4(leftKneeJointMat);
    lowerLeftLegBone.matrix.translate(-0.75, -8.7, -0.75)
    lowerLeftLegBone.matrix.scale(g_koalaScaleX * 1.0, g_koalaScaleY * 2.5, g_koalaScaleZ * 0.5);
    lowerLeftLegBone.render();

    var leftAnkleJoint = new Cube();
    leftAnkleJoint.color = g_green;
    leftAnkleJoint.matrix = new Matrix4(leftKneeJointMat);
    leftAnkleJoint.matrix.translate(0.0, -8.7, 0.0);
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
    leftFoot.matrix.translate(-0.75, -4.0, -1.65);
    leftFoot.matrix.scale(g_koalaScaleX * 1.0, g_koalaScaleY * 1.2, g_koalaScaleZ * 1.1);
    leftFoot.render();

    // makeKoalaToes(leftAnkleJointMat, LEFT);

    // RIGHT LEG CUBES
    // reflecting left leg
    var rightHipJoint = new Cube();
    rightHipJoint.color = g_green;
    rightHipJoint.matrix = new Matrix4(rootCubeMat);
    rightHipJoint.matrix.translate(20, 0.0, 5.5);
    rightHipJoint.matrix.rotate(g_rotateUpperRightLeg, 0, 0, 1);
    var rightHipJointMat = new Matrix4(rightHipJoint.matrix);
    rightHipJoint.matrix.scale(g_koalaScaleX * 2.0, g_koalaScaleY * 1.0, g_koalaScaleZ * 1.0);
    rightHipJoint.matrix.translate(-0.5, -0.5, -0.5);
    rightHipJoint.render();

    var upperRightLegBone = new Cube();
    upperRightLegBone.color = g_yellow;
    upperRightLegBone.matrix = new Matrix4(rightHipJointMat);
    upperRightLegBone.matrix.translate(-0.75, -6.0, -0.75);
    upperRightLegBone.matrix.scale(g_koalaScaleX * 1.0, g_koalaScaleY * 1.5, g_koalaScaleZ * 0.5);
    upperRightLegBone.render();

    var rightKneeJoint = new Cube();
    rightKneeJoint.color = g_green;
    rightKneeJoint.matrix = new Matrix4(rightHipJointMat);
    rightKneeJoint.matrix.translate(0.0, -6.0, 0.0);
    rightKneeJoint.matrix.rotate(g_rotateLowerRightLeg, 0, 0, 1);
    var rightKneeJointMat = new Matrix4(rightKneeJoint.matrix);
    rightKneeJoint.matrix.scale(g_koalaScaleX * 1.5, g_koalaScaleY * 0.9, g_koalaScaleZ * 0.9);
    rightKneeJoint.matrix.translate(-0.5, -0.5, -0.5);
    rightKneeJoint.render();

    var lowerRightLegBone = new Cube();
    lowerRightLegBone.color = g_yellow;
    lowerRightLegBone.matrix = new Matrix4(rightKneeJointMat);
    lowerRightLegBone.matrix.translate(-0.75, -8.7, -0.75);
    lowerRightLegBone.matrix.scale(g_koalaScaleX * 1.0, g_koalaScaleY * 2.5, g_koalaScaleZ * 0.5);
    lowerRightLegBone.render();

    var rightAnkleJoint = new Cube();
    rightAnkleJoint.color = g_green;
    rightAnkleJoint.matrix = new Matrix4(rightKneeJointMat);
    rightAnkleJoint.matrix.translate(0.0, -8.7, 0.0);
    rightAnkleJoint.matrix.rotate(g_rotateRightAnkleX, 1, 0, 0);
    rightAnkleJoint.matrix.rotate(g_rotateRightAnkleY, 0, 1, 0);
    rightAnkleJoint.matrix.rotate(g_rotateRightAnkleZ, 0, 0, 1);
    var rightAnkleJointMat = new Matrix4(rightAnkleJoint.matrix);
    rightAnkleJoint.matrix.scale(g_koalaScaleX * 1.2, g_koalaScaleY * 0.8, g_koalaScaleZ * 0.8);
    rightAnkleJoint.matrix.translate(-0.5, -0.5, -0.5);
    rightAnkleJoint.render();

    var rightFoot = new Cube();
    rightFoot.color = g_koalaGreyColorMat;
    rightFoot.matrix = new Matrix4(rightAnkleJointMat);
    rightFoot.matrix.translate(-0.75, -4.0, -1.65);
    rightFoot.matrix.scale(g_koalaScaleX * 1.0, g_koalaScaleY * 1.2, g_koalaScaleZ * 1.1);
    rightFoot.render();

    // makeKoalaToes(rightAnkleJointMat, RIGHT);
}
