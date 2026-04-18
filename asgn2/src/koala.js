const koalaGreyColorMat = [0.57, 0.56, 0.54, 1.0];
const koalaWhiteColorMat = [1.0, 0.98, 0.93, 1.0];
const koalaBlackColorMat = [0.2, 0.2, 0.2, 1.0];

function makeKoala() {
    // torso cube of koala, root of animal
    var mainTorso = new Cube();
    mainTorso.color = koalaGreyColorMat;
    mainTorso.matrix.setTranslate(0.0, -2.0, 0.0);
    mainTorso.matrix.rotate(g_animalXAngle, 1.0, 0.0, 0.0);
    mainTorso.matrix.rotate(g_animalYAngle, 0.0, 1.0, 0.0);
    mainTorso.matrix.rotate(g_animalZAngle, 0.0, 0.0, 1.0);
    mainTorso.matrix.scale(4.5, 4, 4);
    mainTorso.render();
    
    makeKoalaTorso(mainTorso);
    makeKoalaHead(mainTorso);
    makeKoalaArms(mainTorso);
    //makeKoalaLegs(mainToroso);
}

// Create extra cubes for torso
function makeKoalaTorso(rootCube) {
    var upperTorso1 = new Cube();
    upperTorso1.color = koalaGreyColorMat;
    upperTorso1.matrix = new Matrix4(rootCube.matrix);
    upperTorso1.matrix.translate(0.05, 1.0, 0.05);
    upperTorso1.matrix.scale(0.9, 0.1, 0.9);
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
    
    var upperTorso4 = new Cube();
    upperTorso4.color = koalaGreyColorMat;
    upperTorso4.matrix = new Matrix4(upperTorso3.matrix);
    upperTorso4.matrix.translate(0.05, 1.0, 0.0);
    upperTorso4.matrix.scale(0.9, 1.0, 0.9);
    upperTorso4.render();
    
    var upperTorso5 = new Cube();
    upperTorso5.color = koalaGreyColorMat;
    upperTorso5.matrix = new Matrix4(upperTorso4.matrix);
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
    belly1.matrix = new Matrix4(rootCube.matrix);
    belly1.matrix.translate(0.05, 0.0, -0.08);
    belly1.matrix.scale(0.9, 0.99, 0.1);
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
    mainHead.matrix = new Matrix4(rootCube.matrix);
    mainHead.matrix.translate(0.15, 1.6, -0.1);
    mainHead.matrix.scale(0.7, 0.8, 0.8);
    mainHead.render();

    var leftHeadCube = new Cube();
    leftHeadCube.color = koalaGreyColorMat;
    leftHeadCube.matrix = new Matrix4(mainHead.matrix);
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
    upperHeadCube.matrix = new Matrix4(mainHead.matrix);
    upperHeadCube.matrix.translate(0.1, 1.0, 0.05);
    upperHeadCube.matrix.scale(0.8, 0.1, 0.9);
    upperHeadCube.render();

    var backHeadCube = new Cube();
    backHeadCube.color = koalaGreyColorMat;
    backHeadCube.matrix = new Matrix4(mainHead.matrix);
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
    mainEar1.matrix = new Matrix4(mainHead.matrix);
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
    nose.matrix = new Matrix4(rootCube.matrix);
    nose.matrix.translate(0.35, 0.62, -0.7);
    nose.matrix.rotate(45, 1, 0, 0);
    nose.matrix.scale(0.3, 1.0, 1.0);
    nose.render();

    var leftEye = new Cube();
    leftEye.color = koalaBlackColorMat;
    leftEye.matrix = new Matrix4(rootCube.matrix);
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
    shoulderBase1.matrix = new Matrix4(rootCube.matrix);
    shoulderBase1.matrix.translate(-0.15, 0.8, 0.1);
    shoulderBase1.matrix.scale(1.3, 0.5, 0.6);
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
    
    // var shoulderBase3 = new Cube();
    // shoulderBase3.color = koalaGreyColorMat;
    // shoulderBase3.matrix = new Matrix4(shoulderBase2.matrix);
    // shoulderBase3.matrix.translate(0.05, 1.0, 0.0);
    // shoulderBase3.matrix.scale(0.9, 1.0, 1.0);
    // shoulderBase3.render();

    var leftArm1 = new Cube();
    leftArm1.color = koalaGreyColorMat;
    leftArm1.matrix = new Matrix4(rootCube.matrix);
    leftArm1.matrix.translate(-0.3, 0.5, 0.17);
    leftArm1.matrix.rotate(80, 1, 0, 0);
    leftArm1.matrix.scale(0.25, 0.7, 0.4);
    leftArm1.matrix.translate(0.0, -0.5, -1.5);
    leftArm1.render();

    var leftArm2 = new Cube();
    leftArm2.color = koalaGreyColorMat;
    leftArm2.matrix = new Matrix4(leftArm1.matrix);
    leftArm2.matrix.translate(0.0, -1.0, 0.15);
    leftArm2.matrix.rotate(20, 1, 0, 0);
    leftArm2.matrix.scale(1.0, 1.0, 0.7);
    leftArm2.matrix.translate(0.0, 0.3, -0.5);
    leftArm2.render();
}