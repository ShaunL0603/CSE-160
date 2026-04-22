// Global variables
const g_koalaGreyColorMat = [0.57, 0.56, 0.54, 1.0];
const g_koalaWhiteColorMat = [1.0, 0.98, 0.93, 1.0];
const g_koalaBlackColorMat = [0.2, 0.2, 0.2, 1.0];
let g_koalaScaleX = 1.5;
let g_koalaScaleY = 3.0;
let g_koalaScaleZ = 3.0;
let g_koalaPosX = 10.0;
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
}

function makeKoalaHead(rootCubeMat) {
    var backNeck = new Cube();
    backNeck.color = g_koalaGreyColorMat;
    backNeck.matrix = new Matrix4(rootCubeMat);
    backNeck.matrix.translate(-8.0, 4.0, -0.5);
    backNeck.matrix.scale(1.0, 1.0, 1.0);
    backNeck.render();
    
    var neck1 = new Cube();
    neck1.color = g_koalaGreyColorMat;
    neck1.matrix = new Matrix4(rootCubeMat);
    neck1.matrix.translate(-10.7, 3.075, 0.0);
    neck1.matrix.rotate(g_rotateHeadX * 0.3, 1, 0, 0);
    neck1.matrix.rotate(g_rotateHeadY * 0.3, 0, 1, 0);
    neck1.matrix.rotate(g_rotateHeadZ * 0.3, 0, 0, 1);
    var neck1Mat = new Matrix4(neck1.matrix);
    neck1.matrix.scale(g_koalaScaleX * 2.66, g_koalaScaleY * 2.0, g_koalaScaleZ * 2.0);
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
    neck2.matrix.scale(3.0, 6.66, 6.66);
    neck2.matrix.translate(-0.5, -0.5, -0.5);
    neck2.render();

    var neck3 = new Cube();
    neck3.color = g_koalaGreyColorMat;
    neck3.matrix = new Matrix4(neck2Mat);
    neck3.matrix.translate(-2.0, 0.0, 0.0);
    neck3.matrix.rotate(g_rotateHeadX * 0.3, 1, 0, 0);
    neck3.matrix.rotate(g_rotateHeadY * 0.3, 0, 1, 0);
    neck3.matrix.rotate(g_rotateHeadZ * 0.3, 0, 0, 1);
    neck3.matrix.scale(3.0, 7.32, 7.32);
    neck3.matrix.translate(-0.5, -0.5, -0.5);
    neck3.render();
    
    // var head1 = new Cube();
    // head1.color = g_koalaGreyColorMat;
    // head1.matrix = new Matrix4(neckMat);
    // head1.matrix.translate(-1.0, 0.0, 0.0);
    // head1.matrix.rotate(g_rotateHeadX, 1, 0, 0);
    // head1.matrix.rotate(g_rotateHeadY, 0, 1, 0);
    // head1.matrix.rotate(g_rotateHeadZ, 0, 0, 1);
    // head1.matrix.scale(3.0, 8.0, 8.0);
    // head1.matrix.translate(-0.5, -0.5, -0.5);
    // head1.render();
}

function makeKoalaArms(rootCubeMat) {
}

function makeKoalaLegs(rootCubeMat) {
}
