// Global variables
const g_koalaGreyColorMat = [0.57, 0.56, 0.54, 1.0];
const g_koalaWhiteColorMat = [1.0, 0.98, 0.93, 1.0];
const g_koalaBlackColorMat = [0.2, 0.2, 0.2, 1.0];
let g_koalaScaleX = 5.0;
let g_koalaScaleY = 6.0;
let g_koalaScaleZ = 4.5;
let g_koalaPosX = 0.0;
let g_koalaPosY = 0.0;
let g_koalaPosZ = 0.0;

// Global rotation variables
    // Left Arm rotation
    let g_rotateUpperLeftArm = -10;
    let g_rotateLowerLeftArm = 30;
    let g_rotateLeftWristX = 0;
    let g_rotateLeftWristY = 0;
    let g_rotateLeftWristZ = 0;

    // Right Arm rotations
    let g_rotateUpperRightArm = -10;
    let g_rotateLowerRightArm = 30;
    let g_rotateRightWristX = 0;
    let g_rotateRightWristY = 0;
    let g_rotateRightWristZ = 0;

    // Left Leg rotations
    let g_rotateUpperLeftLeg = 10;
    let g_rotateLowerLeftLeg = 30;
    let g_rotateLeftAnkleX = 0;
    let g_rotateLeftAnkleY = 0;
    let g_rotateLeftAnkleZ = 0;

    // Right Leg rotations
    let g_rotateUpperRightLeg = 10;
    let g_rotateLowerRightLeg = 30;
    let g_rotateRightAnkleX = 0;
    let g_rotateRightAnkleY = 0;
    let g_rotateRightAnkleZ = 0;

    // Head rotations
    let g_rotateHeadX = 0;
    let g_rotateHeadY = 0;
    let g_rotateHeadZ = 0;
    
function makeKoala() {
    // torso cube of koala, root of animal
    var mainTorso = new Cube();
    mainTorso.color = g_koalaGreyColorMat;
    mainTorso.matrix.setTranslate(g_koalaPosX, g_koalaPosY, g_koalaPosZ);
    mainTorso.matrix.rotate(g_animalXAngle, 1.0, 0.0, 0.0);
    mainTorso.matrix.rotate(g_animalYAngle, 0.0, 1.0, 0.0);
    mainTorso.matrix.rotate(g_animalZAngle, 0.0, 0.0, 1.0);
    var mainTorsoMat = new Matrix4(mainTorso.matrix);
    mainTorso.matrix.scale(g_koalaScaleX, g_koalaScaleY, g_koalaScaleZ);
    mainTorso.render();
    
    makeKoalaTorso(mainTorsoMat);
    makeKoalaHead(mainTorsoMat);
    makeKoalaArms(mainTorsoMat);
    makeKoalaLegs(mainTorsoMat);
}

// Create extra cubes for torso
function makeKoalaTorso(rootCube) {
    var upperTorso1 = new Cube();
    upperTorso1.color = g_koalaGreyColorMat;
    upperTorso1.matrix = new Matrix4(rootCube);
    upperTorso1.matrix.translate(0.05 * g_koalaScaleX, 1.0 * g_koalaScaleY, 0.05 *g_koalaScaleZ);
    upperTorso1.matrix.scale(0.9 * g_koalaScaleX, 0.1 * g_koalaScaleY, 0.9 * g_koalaScaleZ);
    upperTorso1.render();
    
    var upperTorso2 = new Cube();
    upperTorso2.color = g_koalaGreyColorMat;
    upperTorso2.matrix = new Matrix4(upperTorso1.matrix);
    upperTorso2.matrix.translate(0.05, 1.0, 0.0);
    upperTorso2.matrix.scale(0.9, 1.0, 0.9);
    upperTorso2.render();
    
    var upperTorso3 = new Cube();
    upperTorso3.color = g_koalaGreyColorMat;
    upperTorso3.matrix = new Matrix4(upperTorso2.matrix);
    upperTorso3.matrix.translate(0.05, 1.0, 0.0);
    upperTorso3.matrix.scale(0.9, 1.0, 0.9);
    upperTorso3.render();
    
    var upperTorso5 = new Cube();
    upperTorso5.color = g_koalaGreyColorMat;
    upperTorso5.matrix = new Matrix4(upperTorso3.matrix);
    upperTorso5.matrix.translate(0.05, 1.0, 0.05);
    upperTorso5.matrix.scale(0.9, 1.0, 0.8);
    upperTorso5.render();

    var neck = new Cube();
    neck.color = g_koalaGreyColorMat;
    neck.matrix = new Matrix4(upperTorso5.matrix);
    neck.matrix.translate(0.05, 1.0, 0.01);
    neck.matrix.scale(0.9, 2, 0.9);
    neck.render();

    var torso1 = new Cube();
    torso1.color = g_koalaGreyColorMat;
    torso1.matrix = new Matrix4(rootCube);
    torso1.matrix.translate(-0.25, 0.0, 0.0);
    torso1.matrix.scale(5.5, 5.0, 4.1);
    torso1.render();

    var torso2 = new Cube();
    torso2.color = g_koalaGreyColorMat;
    torso2.matrix = new Matrix4(rootCube);
    torso2.matrix.translate(0, 0.0, 0.5);
    torso2.matrix.scale(5.0, 4.5, 4.3);
    torso2.render();

    var lowerTorso1 = new Cube();
    lowerTorso1.color = g_koalaGreyColorMat;
    lowerTorso1.matrix = new Matrix4(rootCube);
    lowerTorso1.matrix.translate(-0.25, -2.0, -0.4);
    lowerTorso1.matrix.scale(5.0, 3.0, 5.4);
    lowerTorso1.render();

    var belly1 = new Cube();
    belly1.color = g_koalaWhiteColorMat;
    belly1.matrix = new Matrix4(rootCube);
    belly1.matrix.translate(0.05 * g_koalaScaleX, 0.0 * g_koalaScaleY, -0.08 * g_koalaScaleZ);
    belly1.matrix.scale(0.9 * g_koalaScaleX, 0.99 * g_koalaScaleY, 0.1 * g_koalaScaleZ);
    belly1.render();

    var belly2 = new Cube();
    belly2.color = g_koalaWhiteColorMat;
    belly2.matrix = new Matrix4(upperTorso1.matrix);
    belly2.matrix.translate(0.01, 0.0, -0.1);
    belly2.matrix.scale(0.98, 0.99, 0.1);
    belly2.render();

    var belly3 = new Cube();
    belly3.color = g_koalaWhiteColorMat;
    belly3.matrix = new Matrix4(belly2.matrix);
    belly3.matrix.translate(0.05, 1.0, 0.0);
    belly3.matrix.scale(0.90, 0.9, 1.0);
    belly3.render();

    var belly4 = new Cube();
    belly4.color = g_koalaWhiteColorMat;
    belly4.matrix = new Matrix4(belly3.matrix);
    belly4.matrix.translate(0.05, 1.0, 0.0);
    belly4.matrix.scale(0.90, 0.9, 1.0);
    belly4.render();

    var belly5 = new Cube();
    belly5.color = g_koalaWhiteColorMat;
    belly5.matrix = new Matrix4(belly4.matrix);
    belly5.matrix.translate(0.05, 1.0, 0.0);
    belly5.matrix.scale(0.90, 0.9, 1.0);
    belly5.render();

    var belly6 = new Cube();
    belly6.color = g_koalaWhiteColorMat;
    belly6.matrix = new Matrix4(belly5.matrix);
    belly6.matrix.translate(0.05, 1.0, 0.4);
    belly6.matrix.scale(0.90, 1.99, 1.0);
    belly6.render();
}

let koalaHeadScaleX = 5.0;
let koalaHeadScaleY = 4.0;
let koalaHeadScaleZ = 4.0;
// Cubes to create the head of the Koala
function makeKoalaHead(rootCube) {
    var mainHead = new Cube();
    mainHead.color = g_koalaGreyColorMat;
    mainHead.matrix = new Matrix4(rootCube);
    mainHead.matrix.translate(0.5 * g_koalaScaleX, 11.2, 0.3 * g_koalaScaleZ);
    mainHead.matrix.rotate(g_rotateHeadX, 1, 0, 0);
    mainHead.matrix.rotate(g_rotateHeadY, 0, 1, 0);
    mainHead.matrix.rotate(g_rotateHeadZ, 0, 0, 1);
    var mainHeadMat = new Matrix4(mainHead.matrix);
    mainHead.matrix.scale(0.7 * koalaHeadScaleX, 0.8 * koalaHeadScaleY, 0.8 * koalaHeadScaleZ);
    mainHead.matrix.translate(-0.5, -0.5, -0.5);
    mainHead.render();

    var leftHeadCube = new Cube();
    leftHeadCube.color = g_koalaGreyColorMat;
    leftHeadCube.matrix = new Matrix4(mainHeadMat);
    leftHeadCube.matrix.translate(-2.1, -1.3, -1.3);
    leftHeadCube.matrix.scale(0.35, 2.56, 2.56);
    leftHeadCube.render();

    var rightHeadCube = new Cube();
    rightHeadCube.color = g_koalaGreyColorMat;
    rightHeadCube.matrix = new Matrix4(leftHeadCube.matrix);
    rightHeadCube.matrix.translate(11.0, 0.0, 0.0);
    rightHeadCube.render();

    var upperHeadCube = new Cube();
    upperHeadCube.color = g_koalaGreyColorMat;
    upperHeadCube.matrix = new Matrix4(mainHeadMat);
    upperHeadCube.matrix.translate(-1.4, 1.6, -1.4);
    upperHeadCube.matrix.scale(2.8, 0.32, 2.88);
    upperHeadCube.render();

    var backHeadCube = new Cube();
    backHeadCube.color = g_koalaGreyColorMat;
    backHeadCube.matrix = new Matrix4(mainHeadMat);
    backHeadCube.matrix.translate(-1.4, -1.28, 1.6);
    var backHeadCubeMat = new Matrix4(backHeadCube.matrix);
    backHeadCube.matrix.scale(2.8, 2.56, 0.32);
    backHeadCube.render();

    var frontHeadCube1 = new Cube();
    frontHeadCube1.color = g_koalaGreyColorMat;
    frontHeadCube1.matrix = new Matrix4(backHeadCube.matrix);
    frontHeadCube1.matrix.translate(0.05, 0.2, -11.0);
    frontHeadCube1.matrix.scale(0.9, 0.5, 1.0);
    frontHeadCube1.render();

    var frontHeadCube2 = new Cube();
    frontHeadCube2.color = g_koalaGreyColorMat;
    frontHeadCube2.matrix = new Matrix4(frontHeadCube1.matrix);
    frontHeadCube2.matrix.translate(0.2, 1.0, 0.0);
    frontHeadCube2.matrix.scale(0.6, 0.3, 1.0);
    frontHeadCube2.render();

    var frontHeadCube3 = new Cube();
    frontHeadCube3.color = g_koalaGreyColorMat;
    frontHeadCube3.matrix = new Matrix4(frontHeadCube2.matrix);
    frontHeadCube3.matrix.translate(0.1, -4.0, 0.0);
    frontHeadCube3.matrix.scale(0.8, 1.0, 1.0);
    frontHeadCube3.render();

    var mainEar1 = new Cube();
    mainEar1.color = g_koalaGreyColorMat;
    mainEar1.matrix = new Matrix4(mainHeadMat);
    mainEar1.matrix.translate(-3.5, 0.48, 0.0);
    mainEar1.matrix.scale(7, 1.6, 0.64);
    mainEar1.render();

    var mainEar2 = new Cube();
    mainEar2.color = g_koalaGreyColorMat;
    mainEar2.matrix = new Matrix4(mainEar1.matrix);
    mainEar2.matrix.translate(0.05, -0.2, 1.0);
    mainEar2.matrix.scale(0.9, 1.0, 0.5);
    mainEar2.render();

    var leftEarBack1 = new Cube();
    leftEarBack1.color = g_koalaGreyColorMat;
    leftEarBack1.matrix = new Matrix4(mainEar1.matrix);
    leftEarBack1.matrix.translate(-0.1, 0.6, 0.0);
    leftEarBack1.matrix.scale(0.3, 0.9, 1.0);
    leftEarBack1.render();

    var leftEarFront1 = new Cube();
    leftEarFront1.color = g_koalaWhiteColorMat;
    leftEarFront1.matrix = new Matrix4(mainEar1.matrix);
    leftEarFront1.matrix.translate(0.05, 0.1, -0.2);
    leftEarFront1.matrix.scale(0.25, 0.8, 0.2);
    leftEarFront1.render();

    var leftEarFront2 = new Cube();
    leftEarFront2.color = g_koalaWhiteColorMat;
    leftEarFront2.matrix = new Matrix4(leftEarBack1.matrix);
    leftEarFront2.matrix.translate(0.1, 0.1, -0.2);
    leftEarFront2.matrix.scale(0.8, 0.8, 0.2);
    leftEarFront2.render();

    var rightBackEar = new Cube();
    rightBackEar.color = g_koalaGreyColorMat;
    rightBackEar.matrix = new Matrix4(leftEarBack1.matrix);
    rightBackEar.matrix.translate(3.0, 0.0, 0.0);
    rightBackEar.render();

    var rightEarFront1 = new Cube();
    rightEarFront1.color = g_koalaWhiteColorMat;
    rightEarFront1.matrix = new Matrix4(leftEarFront1.matrix);
    rightEarFront1.matrix.translate(2.6, 0.0, 0.0);
    rightEarFront1.render();

    var rightEarFront2 = new Cube();
    rightEarFront2.color = g_koalaWhiteColorMat;
    rightEarFront2.matrix = new Matrix4(leftEarFront2.matrix);
    rightEarFront2.matrix.translate(3.75, 0.0, 0.0);
    rightEarFront2.render();
    
    makeKoalaFace(backHeadCubeMat);
}

// Create cubes for face features
function makeKoalaFace(rootCube) {
    var nose = new Cube();
    nose.color = g_koalaBlackColorMat;
    nose.matrix = new Matrix4(rootCube);
    nose.matrix.translate(1.2, 1.7, -4.0);
    var noseMatNoRotate = new Matrix4(nose.matrix);
    nose.matrix.rotate(45, 1, 0, 0);
    nose.matrix.scale(0.5, 1.2, 1.2);
    nose.render();

    var leftEye = new Cube();
    leftEye.color = g_koalaBlackColorMat;
    leftEye.matrix = new Matrix4(rootCube);
    leftEye.matrix.translate(0.0, 2.1, -3.5);
    leftEye.matrix.scale(0.8, 0.5, 0.5);
    leftEye.render();
    
    var rightEye = new Cube();
    rightEye.color = g_koalaBlackColorMat;
    rightEye.matrix = new Matrix4(leftEye.matrix);
    rightEye.matrix.translate(2.5, 0.0, 0.0);
    rightEye.render();

    var mouth = new Cube();
    mouth.color = g_koalaBlackColorMat;    
    mouth.matrix = new Matrix4(noseMatNoRotate);
    mouth.matrix.translate(-0.55, -1.7, 0.6);
    mouth.matrix.scale(1.5, 0.6, 0.36);
    mouth.render();
}

function makeKoalaArms(rootCube) {
    var shoulderBase1 = new Cube();
    shoulderBase1.color = g_koalaGreyColorMat;
    shoulderBase1.matrix = new Matrix4(rootCube);
    shoulderBase1.matrix.translate(0.0 * g_koalaScaleX, 0.9 * g_koalaScaleY, 0.1 * g_koalaScaleZ);
    shoulderBase1.matrix.scale(1.0 * g_koalaScaleX, 0.5 * g_koalaScaleY, 0.6 * g_koalaScaleZ);
    shoulderBase1.render();
    
    var shoulderBase2 = new Cube();
    shoulderBase2.color = g_koalaGreyColorMat;
    shoulderBase2.matrix = new Matrix4(shoulderBase1.matrix);
    shoulderBase2.matrix.translate(0.05, 1.0, 0.05);
    shoulderBase2.matrix.scale(0.9, 0.2, 0.9);
    shoulderBase2.render();

    var shoulderBack = new Cube();
    shoulderBack.color = g_koalaGreyColorMat;
    shoulderBack.matrix = new Matrix4(shoulderBase1.matrix);
    shoulderBack.matrix.translate(0.05, 0.0, 1.0);
    shoulderBack.matrix.scale(0.9, 0.9, 0.2);
    shoulderBack.render();

    // Left Arm
    var leftShoulderJoint = new Cube();
    leftShoulderJoint.color = g_koalaGreyColorMat;
    leftShoulderJoint.matrix = new Matrix4(rootCube);
    leftShoulderJoint.matrix.translate(-0.044 * g_koalaScaleX, 1.1 * g_koalaScaleY, 0.4 * g_koalaScaleZ);
    var leftShoulderJointMatNoRotate = new Matrix4(leftShoulderJoint.matrix)
    leftShoulderJoint.matrix.rotate(g_rotateUpperLeftArm, 1, 0, 0);
    var leftShoulderJointMat = new Matrix4(leftShoulderJoint.matrix)
    leftShoulderJoint.matrix.scale(-0.11 * g_koalaScaleX, -0.5 * g_koalaScaleY, -0.5 * g_koalaScaleZ);
    leftShoulderJoint.matrix.translate(-0.5, -0.5, -0.5);
    leftShoulderJoint.render();

    var upperLeftArm = new Cube();
    upperLeftArm.color = g_koalaGreyColorMat;
    upperLeftArm.matrix = new Matrix4(leftShoulderJoint.matrix);
    upperLeftArm.matrix.translate(0.0, 0.05, 1.0);
    upperLeftArm.matrix.scale(0.99, 0.9, 1.1);
    upperLeftArm.render();

    var leftElbowJoint = new Cube();
    leftElbowJoint.color = g_koalaGreyColorMat;
    leftElbowJoint.matrix = new Matrix4(leftShoulderJointMat);
    leftElbowJoint.matrix.translate(0.0, 0.0, -3.2);
    leftElbowJoint.matrix.rotate(g_rotateLowerLeftArm, 1, 0, 0);
    var leftElbowJointMat = new Matrix4(leftElbowJoint.matrix);
    leftElbowJoint.matrix.scale(-0.44, -2.0, -2.0);
    leftElbowJoint.matrix.translate(-0.5, -0.5, -0.5);
    leftElbowJoint.render();

    var lowerLeftArm = new Cube();
    lowerLeftArm.color = g_koalaGreyColorMat;
    lowerLeftArm.matrix = new Matrix4(leftElbowJointMat);
    lowerLeftArm.matrix.translate(0.2, 0.9, -1.0);
    lowerLeftArm.matrix.scale(-0.4, -1.8, -3.0);
    lowerLeftArm.render();

    var leftWristJoint = new Cube();
    leftWristJoint.color = g_koalaGreyColorMat;
    leftWristJoint.matrix = new Matrix4(leftElbowJointMat);
    leftWristJoint.matrix.translate(0.0, 0.0, -4.0);
    leftWristJoint.matrix.rotate(g_rotateLeftWristX, 1, 0, 0);
    leftWristJoint.matrix.rotate(g_rotateLeftWristY, 0, 1, 0);
    leftWristJoint.matrix.rotate(g_rotateLeftWristZ, 0, 0, 1);
    leftWristJoint.matrix.scale(-0.4, -2.0, -2.0);
    leftWristJoint.matrix.translate(-0.5, -0.5, -0.5);
    leftWristJoint.render();

    // Rigt Arm
    var rightShoulderJoint = new Cube();
    rightShoulderJoint.color = g_koalaGreyColorMat;
    rightShoulderJoint.matrix = new Matrix4(rootCube);
    rightShoulderJoint.matrix.translate(1.052 * g_koalaScaleX, 1.1 * g_koalaScaleY, 0.4 * g_koalaScaleZ);
    rightShoulderJoint.matrix.rotate(g_rotateUpperRightArm, 1, 0, 0);
    var rightShoulderJointMat = new Matrix4(rightShoulderJoint.matrix)
    rightShoulderJoint.matrix.scale(-0.11 * g_koalaScaleX, -0.5 * g_koalaScaleY, -0.5 * g_koalaScaleZ);
    rightShoulderJoint.matrix.translate(-0.5, -0.5, -0.5);
    rightShoulderJoint.render();

    var upperRightArm = new Cube();
    upperRightArm.color = g_koalaGreyColorMat;
    upperRightArm.matrix = new Matrix4(rightShoulderJoint.matrix);
    upperRightArm.matrix.translate(0.0, 0.05, 1.0);
    upperRightArm.matrix.scale(0.99, 0.9, 1.1);
    upperRightArm.render();

    var rightElbowJoint = new Cube();
    rightElbowJoint.color = g_koalaGreyColorMat;
    rightElbowJoint.matrix = new Matrix4(rightShoulderJointMat);
    rightElbowJoint.matrix.translate(0.0, 0.0, -3.2);
    rightElbowJoint.matrix.rotate(g_rotateLowerRightArm, 1, 0, 0);
    var rightElbowJointMat = new Matrix4(rightElbowJoint.matrix);
    rightElbowJoint.matrix.scale(-0.55, -2.0, -2.0);
    rightElbowJoint.matrix.translate(-0.5, -0.5, -0.5);
    rightElbowJoint.render();

    var lowerRightArm = new Cube();
    lowerRightArm.color = g_koalaGreyColorMat;
    lowerRightArm.matrix = new Matrix4(rightElbowJointMat);
    lowerRightArm.matrix.translate(0.25, 0.9, -1.0);
    lowerRightArm.matrix.scale(-0.4, -1.8, -3.0);
    lowerRightArm.render();

    var rightWristJoint = new Cube();
    rightWristJoint.color = g_koalaGreyColorMat;
    rightWristJoint.matrix = new Matrix4(rightElbowJointMat);
    rightWristJoint.matrix.translate(0.0, 0.0, -4.0);
    rightWristJoint.matrix.rotate(g_rotateRightWristX, 1, 0, 0);
    rightWristJoint.matrix.rotate(g_rotateRightWristY, 0, 1, 0);
    rightWristJoint.matrix.rotate(g_rotateRightWristZ, 0, 0, 1);
    rightWristJoint.matrix.scale(-0.5, -2.0, -2.0);
    rightWristJoint.matrix.translate(-0.5, -0.5, -0.5);
    rightWristJoint.render();
}

function makeKoalaLegs(rootCube) {
    var leftHip = new Cube();
    leftHip.color = g_koalaGreyColorMat;
    leftHip.matrix = new Matrix4(rootCube);
    leftHip.matrix.translate(-0.25, -2.5, -0.55);
    leftHip.matrix.scale(3.0, 3.0, 5.7);
    leftHip.render();
        
    var leftHipJoint1 = new Cube();
    leftHipJoint1.color = g_koalaGreyColorMat;
    leftHipJoint1.matrix = new Matrix4(rootCube);
    leftHipJoint1.matrix.translate(0.9, -3.2, 0.0);
    leftHipJoint1.matrix.rotate(g_rotateUpperLeftLeg, 1, 0, 0);
    var leftHipJoint1Mat = new Matrix4(leftHipJoint1.matrix);
    leftHipJoint1.matrix.scale(3.0, 3.0, 3.0);
    leftHipJoint1.matrix.translate(-0.5, -0.5, -0.5);
    leftHipJoint1.render();

    var leftHipJoint2 = new Cube();
    leftHipJoint2.color = g_koalaGreyColorMat;
    leftHipJoint2.matrix = new Matrix4(rootCube);
    leftHipJoint2.matrix.translate(0.88, -3.0, 2.0);
    leftHipJoint2.matrix.rotate((g_rotateUpperLeftLeg -120) * 0.23, 1, 0, 0);
    leftHipJoint2.matrix.scale(3.0, 3.0, 3.0);
    leftHipJoint2.matrix.translate(-0.5, -0.5, -0.5);
    leftHipJoint2.render();
    
    var leftHipJoint3 = new Cube();
    leftHipJoint3.color = g_koalaGreyColorMat;
    leftHipJoint3.matrix = new Matrix4(rootCube);
    leftHipJoint3.matrix.translate(0.86, -2.3, 4.0);
    leftHipJoint3.matrix.rotate((g_rotateUpperLeftLeg + 45) * -0.23, 1, 0, 0);
    leftHipJoint3.matrix.scale(3.0, 3.0, 2.0);
    leftHipJoint3.matrix.translate(-0.5, -0.5, -0.5);
    leftHipJoint3.render();
    
    var leftUpperLeg = new Cube();
    leftUpperLeg.color = g_koalaGreyColorMat;
    leftUpperLeg.matrix = leftHipJoint1Mat;
    leftUpperLeg.matrix.translate(-1.4, -1.4, -4.0);
    leftUpperLeg.matrix.scale(2.8, 2.8, 3.5);
    leftUpperLeg.render();
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
