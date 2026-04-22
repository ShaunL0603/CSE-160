// Global variables
const g_koalaGreyColorMat = [0.57, 0.56, 0.54, 1.0];
const g_koalaWhiteColorMat = [1.0, 0.98, 0.93, 1.0];
const g_koalaBlackColorMat = [0.2, 0.2, 0.2, 1.0];
let g_koalaScaleX = 1.5;
let g_koalaScaleY = 3.0;
let g_koalaScaleZ = 3.0;
let g_koalaPosX = 20.0;
let g_koalaPosY = 0.0;
let g_koalaPosZ = 0.0;
let g_animalXAngle = 0.0;
let g_animalYAngle = 0.0;
let g_animalZAngle = 0.0;

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
    let g_rotateLowerLeftLeg = -30;
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

    // Jaw rotations
    let g_rotateLowerJawY = 0;
    
function makeKoala() {
    // torso cube of koala, root of animal
    var mainTorso = new Cube();
    mainTorso.color = g_koalaGreyColorMat;
    mainTorso.matrix.setTranslate(g_koalaPosX - 0.5, g_koalaPosY - 0.5, g_koalaPosZ - 0.5);
    mainTorso.matrix.rotate(g_animalXAngle, 1.0, 0.0, 0.0);
    mainTorso.matrix.rotate(g_animalYAngle, 0.0, 1.0, 0.0);
    mainTorso.matrix.rotate(g_animalZAngle, 0.0, 0.0, 1.0);
    var mainTorsoMat = new Matrix4(mainTorso.matrix);
    mainTorso.matrix.scale(g_koalaScaleX * 4.0, g_koalaScaleY * 2.3, g_koalaScaleZ* 2.3);
    mainTorso.matrix.translate(-0.5, -0.5, -0.5);
    mainTorso.render();
    
    makeKoalaTorso(mainTorsoMat);
    makeKoalaHead(mainTorsoMat);
    makeKoalaArms(mainTorsoMat);
    makeKoalaLegs(mainTorsoMat);
}

function makeKoalaTorso(rootCubeMat) {
    var upperTorso1 = new Cube();
    upperTorso1.color = g_koalaGreyColorMat;
    upperTorso1.matrix = new Matrix4(rootCubeMat);
    upperTorso1.matrix.translate(-6.7, -3.075, -3.375);
    var upperTorso1Mat = new Matrix4(upperTorso1.matrix);
    upperTorso1.matrix.scale(g_koalaScaleX * 2.5, g_koalaScaleY * 2.25, g_koalaScaleZ * 2.25);
    upperTorso1.render();

    var upperTorso2 = new Cube();
    upperTorso2.color = g_koalaGreyColorMat;
    upperTorso2.matrix = new Matrix4(upperTorso1Mat);
    upperTorso2.matrix.translate(-3.0, 0.35, 0.075);
    upperTorso2.matrix.scale(g_koalaScaleX * 2.0, g_koalaScaleY * 2.2, g_koalaScaleZ * 2.2);
    upperTorso2.render();

    var lowerTorso1 = new Cube();
    lowerTorso1.color = g_koalaGreyColorMat;
    lowerTorso1.matrix = new Matrix4(rootCubeMat);
    lowerTorso1.matrix.translate(3.0, -3.075, -3.375);
    var lowerTorso1Mat = new Matrix4(lowerTorso1.matrix);
    lowerTorso1.matrix.scale(g_koalaScaleX * 3.0, g_koalaScaleY * 2.25, g_koalaScaleZ * 2.25);
    lowerTorso1.render();

    var lowerTorso2 = new Cube();
    lowerTorso2.color = g_koalaGreyColorMat;
    lowerTorso2.matrix = new Matrix4(lowerTorso1Mat);
    lowerTorso2.matrix.translate(4.5, -0.2, 0.0);
    lowerTorso2.matrix.scale(g_koalaScaleX * 2.0, g_koalaScaleY * 2.3, g_koalaScaleZ * 2.25);
    lowerTorso2.render();

    var backNeck1 = new Cube();
    backNeck1.color = g_koalaGreyColorMat;
    backNeck1.matrix = new Matrix4(rootCubeMat);
    backNeck1.matrix.translate(-5.0, 3.0, 0.0);
    backNeck1.matrix.rotate(45, 0, 0, 1);
    backNeck1.matrix.scale(g_koalaScaleX * 2.0, g_koalaScaleY * 2.0, g_koalaScaleZ * 2.0);
    backNeck1.matrix.translate(-0.5, -0.5, -0.5);
    backNeck1.render();

    var backNeck2 = new Cube();
    backNeck2.color = g_koalaGreyColorMat;
    backNeck2.matrix = new Matrix4(rootCubeMat);
    backNeck2.matrix.translate(-7.7, 4.8, 0.0);
    backNeck2.matrix.rotate(67.5, 0, 0, 1);
    backNeck2.matrix.scale(g_koalaScaleX * 2.5, g_koalaScaleY * 0.7, g_koalaScaleZ * 2.0);
    backNeck2.matrix.translate(-0.5, -0.5, -0.5);
    backNeck2.render();

    var backNeck3 = new Cube();
    backNeck3.color = g_koalaGreyColorMat;
    backNeck3.matrix = new Matrix4(rootCubeMat);
    backNeck3.matrix.translate(-8.8, 5.1, 0.0);
    backNeck3.matrix.rotate(90, 0, 0, 1);
    backNeck3.matrix.scale(g_koalaScaleX * 2.5, g_koalaScaleY * 0.61, g_koalaScaleZ * 2.0);
    backNeck3.matrix.translate(-0.5, -0.5, -0.5);
    backNeck3.render();
}

function makeKoalaHead(rootCubeMat) {    
    var neck1 = new Cube();
    neck1.color = g_koalaGreyColorMat;
    neck1.matrix = new Matrix4(rootCubeMat);
    neck1.matrix.translate(-9.8, 3.3, 0.0);
    neck1.matrix.rotate(g_rotateHeadX * 0.3, 1, 0, 0);
    neck1.matrix.rotate(g_rotateHeadY * 0.3, 0, 1, 0);
    neck1.matrix.rotate(g_rotateHeadZ * 0.3, 0, 0, 1);
    var neck1Mat = new Matrix4(neck1.matrix);
    neck1.matrix.scale(g_koalaScaleX * 1.66, g_koalaScaleY * 2.6, g_koalaScaleZ * 2.3);
    neck1.matrix.translate(-0.5, -0.5, -0.5);
    neck1.render();

    var neck2 = new Cube();
    neck2.color = g_koalaGreyColorMat;
    neck2.matrix = new Matrix4(neck1Mat);
    neck2.matrix.translate(-1.0, 0.0, 0.0);
    neck2.matrix.rotate(g_rotateHeadX * 0.3, 1, 0, 0);
    neck2.matrix.rotate(g_rotateHeadY * 0.3, 0, 1, 0);
    neck2.matrix.rotate(g_rotateHeadZ * 0.3, 0, 0, 1);
    var neck2Mat = new Matrix4(neck2.matrix);
    neck2.matrix.scale(g_koalaScaleX * 1.66, g_koalaScaleY * 2.7, g_koalaScaleZ * 2.4);
    neck2.matrix.translate(-0.5, -0.5, -0.5);
    neck2.render();

    var neck3 = new Cube();
    neck3.color = g_koalaGreyColorMat;
    neck3.matrix = new Matrix4(neck2Mat);
    neck3.matrix.translate(-1.0, 0.0, 0.0);
    neck3.matrix.rotate(g_rotateHeadX * 0.3, 1, 0, 0);
    neck3.matrix.rotate(g_rotateHeadY * 0.3, 0, 1, 0);
    neck3.matrix.rotate(g_rotateHeadZ * 0.3, 0, 0, 1);
    var neck3Mat = new Matrix4(neck3.matrix);
    neck3.matrix.scale(g_koalaScaleX * 1.66, g_koalaScaleY * 2.8, g_koalaScaleZ * 2.45);
    neck3.matrix.translate(-0.5, -0.5, -0.5);
    neck3.render();

    var head1 = new Cube();
    head1.color = g_koalaGreyColorMat;
    head1.matrix = new Matrix4(neck3Mat);
    head1.matrix.translate(-6.0, 1.5, -3.9);
    head1.matrix.scale(g_koalaScaleX * 4.0, g_koalaScaleY * 1.0, g_koalaScaleZ * 2.6);
    head1.render()

    var head2 = new Cube();
    head2.color = g_koalaGreyColorMat;
    head2.matrix = new Matrix4(neck3Mat);
    head2.matrix.translate(-7.2, 0.5, -4.05);
    head2.matrix.scale(g_koalaScaleX * 4.2, g_koalaScaleY * 1.0, g_koalaScaleZ * 2.7);
    head2.render()

    var head3 = new Cube();
    head3.color = g_koalaGreyColorMat;
    head3.matrix = new Matrix4(neck3Mat);
    head3.matrix.translate(-8.0, -2.0, -4.05);
    head3.matrix.scale(g_koalaScaleX * 4.5, g_koalaScaleY * 1.6, g_koalaScaleZ * 2.7);
    head3.render()

    var upperJaw = new Cube();
    upperJaw.color = g_koalaGreyColorMat;
    upperJaw.matrix = new Matrix4(neck3Mat);
    upperJaw.matrix.translate(-10.2, -4.7, -3.6);
    var upperJawMat = new Matrix4(upperJaw.matrix);
    upperJaw.matrix.scale(g_koalaScaleX * 6.0, g_koalaScaleY * 0.9, g_koalaScaleZ * 2.4);
    upperJaw.render()

    var lowerBackJaw = new Cube();
    lowerBackJaw.color = g_koalaGreyColorMat;
    lowerBackJaw.matrix = new Matrix4(upperJawMat);
    lowerBackJaw.matrix.translate(9.0, -0.6, 3.6);
    lowerBackJaw.matrix.rotate(45, 0, 0, 1);
    lowerBackJaw.matrix.scale(g_koalaScaleX * 1.0, g_koalaScaleY * 1.0, g_koalaScaleZ * 2.4);
    lowerBackJaw.matrix.translate(-0.5, -0.5, -0.5);
    lowerBackJaw.render();

    var lowerJawBase = new Cube();
    lowerJawBase.color = g_koalaGreyColorMat;
    lowerJawBase.matrix = upperJawMat;
    lowerJawBase.matrix.translate(5.0, -1.0, 3.6);
    lowerJawBase.matrix.rotate(g_rotateLowerJawY, 0, 0, 1);
    lowerJawBase.matrix.scale(g_koalaScaleX * 5.5, g_koalaScaleY * 0.5, g_koalaScaleZ * 2.4);
    lowerJawBase.matrix.translate(-0.5, -0.5, -0.5);
    lowerJawBase.render()
}

function makeKoalaArms(rootCubeMat) {
}

function makeKoalaLegs(rootCubeMat) {
}
