// Global variables
const koalaGreyColorMat = [0.57, 0.56, 0.54, 1.0];
const koalaWhiteColorMat = [1.0, 0.98, 0.93, 1.0];
const koalaBlackColorMat = [0.2, 0.2, 0.2, 1.0];

// Global rotation variables
    // Left Arm rotation
    let rotateUpperLeftArm = -10;
    let rotateLowerLeftArm = 30;
    let rotateLeftWristX = 0;
    let rotateLeftWristY = 0;
    let rotateLeftWristZ = 0;

    // Right Arm rotations
    let rotateUpperRightArm = -10;
    let rotateLowerRightArm = 30;
    let rotateRightWristX = 0;
    let rotateRightWristY = 0;
    let rotateRightWristZ = 0;

    // Left Leg rotations
    let rotateUpperLeftLeg = 0;
    let rotateLowerLeftLeg = 0;
    let rotateLeftAnkleX = 0;
    let rotateLeftAnkleY = 0;
    let rotateLeftAnkleZ = 0;

    // Right Leg rotations
    let rotateUpperRightLeg = 0;
    let rotateLowerRightLeg = 0;
    let rotateRightAnkleX = 0;
    let rotateRightAnkleY = 0;
    let rotateRightAnkleZ = 0;

    // Head rotations
    let rotateHeadX = 0;
    let rotateHeadY = 0;
    let rotateHeadZ = 0;
    

function makeKoala() {
    // torso cube of koala, root of animal
    var mainTorso = new Cube();
    mainTorso.color = koalaGreyColorMat;
    mainTorso.matrix.setTranslate(0.0, -7.0, 0.0);
    mainTorso.matrix.rotate(g_animalXAngle, 1.0, 0.0, 0.0);
    mainTorso.matrix.rotate(g_animalYAngle, 0.0, 1.0, 0.0);
    mainTorso.matrix.rotate(g_animalZAngle, 0.0, 0.0, 1.0);
    var mainTorsoMat = new Matrix4(mainTorso.matrix);
    mainTorso.matrix.scale(5, 4, 4);
    mainTorso.render();
    
    makeKoalaTorso(mainTorsoMat);
    makeKoalaHead(mainTorsoMat);
    makeKoalaArms(mainTorsoMat);
    makeKoalaLowerTorso(mainTorsoMat);
    makeKoalaLegs(mainTorsoMat);
}

// Create extra cubes for torso
function makeKoalaTorso(rootCube) {
    var upperTorso1 = new Cube();
    upperTorso1.color = koalaGreyColorMat;
    upperTorso1.matrix = new Matrix4(rootCube);
    upperTorso1.matrix.translate(0.25, 4.0, 0.2);
    upperTorso1.matrix.scale(4.5, 0.4, 3.6);
    upperTorso1.render();
    
    var upperTorso2 = new Cube();
    upperTorso2.color = koalaGreyColorMat;
    upperTorso2.matrix = new Matrix4(upperTorso1.matrix);
    upperTorso2.matrix.translate(0.05, 1.0, 0.0);
    upperTorso2.matrix.scale(0.9, 1.0, 0.9);
    upperTorso2.render();
    
    var upperTorso3 = new Cube();
    upperTorso3.color = koalaGreyColorMat;
    upperTorso3.matrix = new Matrix4(upperTorso2.matrix);
    upperTorso3.matrix.translate(0.05, 1.0, 0.0);
    upperTorso3.matrix.scale(0.9, 1.0, 0.9);
    upperTorso3.render();
    
    var upperTorso5 = new Cube();
    upperTorso5.color = koalaGreyColorMat;
    upperTorso5.matrix = new Matrix4(upperTorso3.matrix);
    upperTorso5.matrix.translate(0.05, 1.0, 0.05);
    upperTorso5.matrix.scale(0.9, 1.0, 0.8);
    upperTorso5.render();

    var neck = new Cube();
    neck.color = koalaGreyColorMat;
    neck.matrix = new Matrix4(upperTorso5.matrix);
    neck.matrix.translate(0.05, 1.0, 0.01);
    neck.matrix.scale(0.9, 2, 0.9);
    neck.render();

    var lowerTorso1 = new Cube();
    lowerTorso1.color = koalaGreyColorMat;
    lowerTorso1.matrix = new Matrix4(upperTorso1.matrix);
    lowerTorso1.matrix.translate(0.0, -11.1, 0.0);
    lowerTorso1.render();

    var lowerTorso2 = new Cube();
    lowerTorso2.color = koalaGreyColorMat;
    lowerTorso2.matrix = new Matrix4(lowerTorso1.matrix);
    lowerTorso2.matrix.translate(0.05, -1.0, 0.1);
    lowerTorso2.matrix.scale(0.9, 1.0, 0.8);
    lowerTorso2.render();

    var belly1 = new Cube();
    belly1.color = koalaWhiteColorMat;
    belly1.matrix = new Matrix4(rootCube);
    belly1.matrix.translate(0.25, 0.0, -0.32);
    belly1.matrix.scale(4.5, 3.96, 0.4);
    belly1.render();

    var belly2 = new Cube();
    belly2.color = koalaWhiteColorMat;
    belly2.matrix = new Matrix4(upperTorso1.matrix);
    belly2.matrix.translate(0.01, 0.0, -0.1);
    belly2.matrix.scale(0.98, 0.99, 0.1);
    belly2.render();

    var belly3 = new Cube();
    belly3.color = koalaWhiteColorMat;
    belly3.matrix = new Matrix4(belly2.matrix);
    belly3.matrix.translate(0.05, 1.0, 0.0);
    belly3.matrix.scale(0.90, 0.9, 1.0);
    belly3.render();

    var belly4 = new Cube();
    belly4.color = koalaWhiteColorMat;
    belly4.matrix = new Matrix4(belly3.matrix);
    belly4.matrix.translate(0.05, 1.0, 0.0);
    belly4.matrix.scale(0.90, 0.9, 1.0);
    belly4.render();

    var belly5 = new Cube();
    belly5.color = koalaWhiteColorMat;
    belly5.matrix = new Matrix4(belly4.matrix);
    belly5.matrix.translate(0.05, 1.0, 0.0);
    belly5.matrix.scale(0.90, 0.9, 1.0);
    belly5.render();

    var belly6 = new Cube();
    belly6.color = koalaWhiteColorMat;
    belly6.matrix = new Matrix4(belly5.matrix);
    belly6.matrix.translate(0.05, 1.0, 0.4);
    belly6.matrix.scale(0.90, 1.99, 1.0);
    belly6.render();
}

// Cubes to create the head of the Koala
function makeKoalaHead(rootCube) {
    var mainHead = new Cube();
    mainHead.color = koalaGreyColorMat;
    mainHead.matrix = new Matrix4(rootCube);
    mainHead.matrix.translate(2.5, 8.0, 1.2);
    mainHead.matrix.rotate(rotateHeadX, 1, 0, 0);
    mainHead.matrix.rotate(rotateHeadY, 0, 1, 0);
    mainHead.matrix.rotate(rotateHeadZ, 0, 0, 1);
    var mainHeadMat = new Matrix4(mainHead.matrix);
    mainHead.matrix.scale(3.5, 3.2, 3.2);
    mainHead.matrix.translate(-0.5, -0.5, -0.5);
    mainHead.render();

    var leftHeadCube = new Cube();
    leftHeadCube.color = koalaGreyColorMat;
    leftHeadCube.matrix = new Matrix4(mainHeadMat);
    leftHeadCube.matrix.translate(-0.1, 0.1, 0.1);
    leftHeadCube.matrix.scale(0.1, 0.8, 0.8);
    leftHeadCube.render();

    var rightHeadCube = new Cube();
    rightHeadCube.color = koalaGreyColorMat;
    rightHeadCube.matrix = new Matrix4(leftHeadCube.matrix);
    rightHeadCube.matrix.translate(11.0, 0.0, 0.0);
    rightHeadCube.render();

    var upperHeadCube = new Cube();
    upperHeadCube.color = koalaGreyColorMat;
    upperHeadCube.matrix = new Matrix4(mainHeadMat);
    upperHeadCube.matrix.translate(0.1, 1.0, 0.05);
    upperHeadCube.matrix.scale(0.8, 0.1, 0.9);
    upperHeadCube.render();

    var backHeadCube = new Cube();
    backHeadCube.color = koalaGreyColorMat;
    backHeadCube.matrix = new Matrix4(mainHeadMat);
    backHeadCube.matrix.translate(0.1, 0.1, 1.0);
    backHeadCube.matrix.scale(0.8, 0.8, 0.1);
    backHeadCube.render();

    var frontHeadCube1 = new Cube();
    frontHeadCube1.color = koalaGreyColorMat;
    frontHeadCube1.matrix = new Matrix4(backHeadCube.matrix);
    frontHeadCube1.matrix.translate(0.05, 0.2, -11.0);
    frontHeadCube1.matrix.scale(0.9, 0.5, 1.0);
    frontHeadCube1.render();

    var frontHeadCube2 = new Cube();
    frontHeadCube2.color = koalaGreyColorMat;
    frontHeadCube2.matrix = new Matrix4(frontHeadCube1.matrix);
    frontHeadCube2.matrix.translate(0.2, 1.0, 0.0);
    frontHeadCube2.matrix.scale(0.6, 0.3, 1.0);
    frontHeadCube2.render();

    var frontHeadCube3 = new Cube();
    frontHeadCube3.color = koalaGreyColorMat;
    frontHeadCube3.matrix = new Matrix4(frontHeadCube2.matrix);
    frontHeadCube3.matrix.translate(0.1, -4.0, 0.0);
    frontHeadCube3.matrix.scale(0.8, 1.0, 1.0);
    frontHeadCube3.render();

    var mainEar1 = new Cube();
    mainEar1.color = koalaGreyColorMat;
    mainEar1.matrix = new Matrix4(mainHeadMat);
    mainEar1.matrix.translate(-0.5, 0.65, 0.5);
    mainEar1.matrix.scale(2.0, 0.5, 0.2);
    mainEar1.render();

    var mainEar2 = new Cube();
    mainEar2.color = koalaGreyColorMat;
    mainEar2.matrix = new Matrix4(mainEar1.matrix);
    mainEar2.matrix.translate(0.05, -0.2, 1.0);
    mainEar2.matrix.scale(0.9, 1.0, 0.5);
    mainEar2.render();

    var leftEarBack1 = new Cube();
    leftEarBack1.color = koalaGreyColorMat;
    leftEarBack1.matrix = new Matrix4(mainEar1.matrix);
    leftEarBack1.matrix.translate(-0.1, 0.6, 0.0);
    leftEarBack1.matrix.scale(0.3, 0.9, 1.0);
    leftEarBack1.render();

    var leftEarFront1 = new Cube();
    leftEarFront1.color = koalaWhiteColorMat;
    leftEarFront1.matrix = new Matrix4(mainEar1.matrix);
    leftEarFront1.matrix.translate(0.05, 0.1, -0.2);
    leftEarFront1.matrix.scale(0.25, 0.8, 0.2);
    leftEarFront1.render();

    var leftEarFront2 = new Cube();
    leftEarFront2.color = koalaWhiteColorMat;
    leftEarFront2.matrix = new Matrix4(leftEarBack1.matrix);
    leftEarFront2.matrix.translate(0.1, 0.1, -0.2);
    leftEarFront2.matrix.scale(0.8, 0.8, 0.2);
    leftEarFront2.render();

    var rightBackEar = new Cube();
    rightBackEar.color = koalaGreyColorMat;
    rightBackEar.matrix = new Matrix4(leftEarBack1.matrix);
    rightBackEar.matrix.translate(3.0, 0.0, 0.0);
    rightBackEar.render();

    var rightEarFront1 = new Cube();
    rightEarFront1.color = koalaWhiteColorMat;
    rightEarFront1.matrix = new Matrix4(leftEarFront1.matrix);
    rightEarFront1.matrix.translate(2.6, 0.0, 0.0);
    rightEarFront1.render();

    var rightEarFront2 = new Cube();
    rightEarFront2.color = koalaWhiteColorMat;
    rightEarFront2.matrix = new Matrix4(leftEarFront2.matrix);
    rightEarFront2.matrix.translate(3.75, 0.0, 0.0);
    rightEarFront2.render();
    
    makeKoalaFace(frontHeadCube1);
}

// Create cubes for face features
function makeKoalaFace(rootCube) {
    var nose = new Cube();
    nose.color = koalaBlackColorMat;
    nose.matrix = new Matrix4(rootCube);
    nose.matrix.translate(0.35, 0.62, -0.7);
    nose.matrix.rotate(45, 1, 0, 0);
    nose.matrix.scale(0.3, 1.0, 1.0);
    nose.render();

    var leftEye = new Cube();
    leftEye.color = koalaBlackColorMat;
    leftEye.matrix = new Matrix4(rootCube);
    leftEye.matrix.translate(0.0, 1.2, 0.5);
    leftEye.matrix.scale(0.3, 0.4, 1.0);
    leftEye.render();
    
    var rightEye = new Cube();
    rightEye.color = koalaBlackColorMat;
    rightEye.matrix = new Matrix4(leftEye.matrix);
    rightEye.matrix.translate(2.5, 0.0, 0.0);
    rightEye.render();

    var mouth = new Cube();
    mouth.color = koalaBlackColorMat;    
    mouth.matrix = new Matrix4(nose.matrix);
    mouth.matrix.translate(-0.4, -0.01, 1.4);
    mouth.matrix.rotate(-45, 1, 0, 0);
    mouth.matrix.scale(1.8, 0.5, 1.0);
    mouth.render();
}

function makeKoalaArms(rootCube) {
    var shoulderBase1 = new Cube();
    shoulderBase1.color = koalaGreyColorMat;
    shoulderBase1.matrix = new Matrix4(rootCube);
    shoulderBase1.matrix.translate(0.0, 3.6, 0.4);
    shoulderBase1.matrix.scale(5.0, 2.0, 2.4);
    shoulderBase1.render();
    
    var shoulderBase2 = new Cube();
    shoulderBase2.color = koalaGreyColorMat;
    shoulderBase2.matrix = new Matrix4(shoulderBase1.matrix);
    shoulderBase2.matrix.translate(0.05, 1.0, 0.05);
    shoulderBase2.matrix.scale(0.9, 0.2, 0.9);
    shoulderBase2.render();

    var shoulderBack = new Cube();
    shoulderBack.color = koalaGreyColorMat;
    shoulderBack.matrix = new Matrix4(shoulderBase1.matrix);
    shoulderBack.matrix.translate(0.05, 0.0, 1.0);
    shoulderBack.matrix.scale(0.9, 0.9, 0.2);
    shoulderBack.render();

    // Left Arm
    var leftShoulderJoint = new Cube();
    leftShoulderJoint.color = koalaGreyColorMat;
    leftShoulderJoint.matrix = new Matrix4(rootCube);
    leftShoulderJoint.matrix.translate(-0.275, 4.4, 1.6);
    var leftShoulderJointMatNoRotate = new Matrix4(leftShoulderJoint.matrix)
    leftShoulderJoint.matrix.rotate(rotateUpperLeftArm, 1, 0, 0);
    var leftShoulderJointMat = new Matrix4(leftShoulderJoint.matrix)
    leftShoulderJoint.matrix.scale(-0.44, -2.0, -2.0);
    leftShoulderJoint.matrix.translate(-0.5, -0.5, -0.5);
    leftShoulderJoint.render();

    var upperLeftArm = new Cube();
    upperLeftArm.color = koalaGreyColorMat;
    upperLeftArm.matrix = new Matrix4(leftShoulderJoint.matrix);
    upperLeftArm.matrix.translate(0.0, 0.05, 1.0);
    upperLeftArm.matrix.scale(0.99, 0.9, 1.1);
    upperLeftArm.render();

    var leftElbowJoint = new Cube();
    leftElbowJoint.color = koalaGreyColorMat;
    leftElbowJoint.matrix = new Matrix4(leftShoulderJointMat);
    leftElbowJoint.matrix.translate(0.0, 0.0, -0.8);
    leftElbowJoint.matrix.rotate(rotateLowerLeftArm, 1, 0, 0);
    var leftElbowJointMat = new Matrix4(leftElbowJoint.matrix);
    leftElbowJoint.matrix.scale(-0.11, -0.5, -0.5);
    leftElbowJoint.matrix.translate(-0.5, -0.5, -0.5);
    leftElbowJoint.render();

    var lowerLeftArm = new Cube();
    lowerLeftArm.color = koalaGreyColorMat;
    lowerLeftArm.matrix = new Matrix4(leftElbowJointMat);
    lowerLeftArm.matrix.translate(0.05, 0.225, -0.25);
    lowerLeftArm.matrix.scale(-0.1, -0.45, -0.7);
    lowerLeftArm.render();

    var leftWristJoint = new Cube();
    leftWristJoint.color = koalaGreyColorMat;
    leftWristJoint.matrix = new Matrix4(leftElbowJointMat);
    leftWristJoint.matrix.translate(0.0, 0.0, -1.0);
    leftWristJoint.matrix.rotate(rotateLeftWristX, 1, 0, 0);
    leftWristJoint.matrix.rotate(rotateLeftWristY, 0, 1, 0);
    leftWristJoint.matrix.rotate(rotateLeftWristZ, 0, 0, 1);
    leftWristJoint.matrix.scale(-0.11, -0.5, -0.5);
    leftWristJoint.matrix.translate(-0.5, -0.5, -0.5);
    leftWristJoint.render();

    // Rigt Arm
    var rightShoulderJoint = new Cube();
    rightShoulderJoint.color = koalaGreyColorMat;
    rightShoulderJoint.matrix = new Matrix4(leftShoulderJointMatNoRotate);
    rightShoulderJoint.matrix.translate(1.11, 0.0, 0.0);
    rightShoulderJoint.matrix.rotate(rotateUpperRightArm, 1, 0, 0);
    var rightShoulderJointMat = new Matrix4(rightShoulderJoint.matrix)
    rightShoulderJoint.matrix.scale(-0.11, -0.5, -0.5);
    rightShoulderJoint.matrix.translate(-0.5, -0.5, -0.5);
    rightShoulderJoint.render();

    var upperRightArm = new Cube();
    upperRightArm.color = koalaGreyColorMat;
    upperRightArm.matrix = new Matrix4(rightShoulderJoint.matrix);
    upperRightArm.matrix.translate(0.0, 0.05, 1.0);
    upperRightArm.matrix.scale(0.99, 0.9, 1.1);
    upperRightArm.render();

    var rightElbowJoint = new Cube();
    rightElbowJoint.color = koalaGreyColorMat;
    rightElbowJoint.matrix = new Matrix4(rightShoulderJointMat);
    rightElbowJoint.matrix.translate(0.0, 0.0, -0.8);
    rightElbowJoint.matrix.rotate(rotateLowerRightArm, 1, 0, 0);
    var rightElbowJointMat = new Matrix4(rightElbowJoint.matrix);
    rightElbowJoint.matrix.scale(-0.11, -0.5, -0.5);
    rightElbowJoint.matrix.translate(-0.5, -0.5, -0.5);
    rightElbowJoint.render();

    var lowerRightArm = new Cube();
    lowerRightArm.color = koalaGreyColorMat;
    lowerRightArm.matrix = new Matrix4(rightElbowJointMat);
    lowerRightArm.matrix.translate(0.05, 0.225, -0.25);
    lowerRightArm.matrix.scale(-0.1, -0.45, -0.7);
    lowerRightArm.render();

    var rightWristJoint = new Cube();
    rightWristJoint.color = koalaGreyColorMat;
    rightWristJoint.matrix = new Matrix4(rightElbowJointMat);
    rightWristJoint.matrix.translate(0.0, 0.0, -1.0);
    rightWristJoint.matrix.rotate(rotateRightWristX, 1, 0, 0);
    rightWristJoint.matrix.rotate(rotateRightWristY, 0, 1, 0);
    rightWristJoint.matrix.rotate(rotateRightWristZ, 0, 0, 1);
    rightWristJoint.matrix.scale(-0.11, -0.5, -0.5);
    rightWristJoint.matrix.translate(-0.5, -0.5, -0.5);
    rightWristJoint.render();
}

function makeKoalaLowerTorso(rootCube) {
    // add code
}

function makeKoalaLegs(rootCube) {
    // add code
}

// remember to put the extra parameters in, not just rootCube
function testCube(rootCube, x, y, z, s_x, s_y, s_z) {
    var test = new Cube();
    test.color = [1.0, 1.0, 0.0, 1.0];
    test.matrix = new Matrix4(rootCube.matrix);
    test.matrix.translate(x, y, z);
    test.matrix.rotate(45, 1, 0, 0);
    test.matrix.scale(s_x, s_y, s_z);
    test.render();
}

// rotation
    // shoulderBase1.matrix.rotate(, 1, 0, 0);
    // shoulderBase1.matrix.translate(0.0, 0.1, -0.1);