// Global variables
    // Colors
    const g_koalaGreyColorMat = [0.57, 0.56, 0.54, 1.0];
    const g_koalaWhiteColorMat = [1.0, 0.98, 0.93, 1.0];
    const g_koalaBlackColorMat = [0.2, 0.2, 0.2, 1.0];
    const g_yellow = [1.0, 1.0, 0.0, 1.0];
    const g_green = [0.0, 1.0, 0.0, 1.0];

    // Scales n stuff
    let g_koalaScaleX = 1.5;
    let g_koalaScaleY = 3.0;
    let g_koalaScaleZ = 3.0;
    let g_koalaPosX = 20.0;
    let g_koalaPosY = -5.0;
    let g_koalaPosZ = 2.0;
    let g_animalXAngle = 0.0;
    let g_animalYAngle = 0.0;
    let g_animalZAngle = 0.0;

// Global booleans for finger movement
const LEFT = 1;
const RIGHT = 0;
const ARM = 1;
const LEG = 0;

function makeKoala() {
    // torso cube of koala, root of animal
    var mainTorso = new Cube();
    mainTorso.color = g_koalaGreyColorMat;
    mainTorso.matrix.setTranslate(g_koalaPosX - 0.5, g_koalaPosY - 0.5, g_koalaPosZ - 0.5);
    mainTorso.matrix.rotate(g_animalXAngle, 1.0, 0.0, 0.0);
    mainTorso.matrix.rotate(g_animalYAngle, 0.0, 1.0, 0.0);
    mainTorso.matrix.rotate(g_animalZAngle, 0.0, 0.0, 1.0);
    var mainTorsoMat = new Matrix4(mainTorso.matrix);
    mainTorso.matrix.scale(g_koalaScaleX * 6.0, g_koalaScaleY * 3.5, g_koalaScaleZ* 2.8);
    mainTorso.matrix.translate(-0.5, -0.5, -0.5);
    mainTorso.render();
    
    // makeKoalaTorso(mainTorsoMat);
    makeKoalaHead(mainTorsoMat);
    // makeKoalaArms(mainTorsoMat);
    // makeKoalaLegs(mainTorsoMat);
}
