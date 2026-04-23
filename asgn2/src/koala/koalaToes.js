let g_rotateLeftToe1 = 0;
let g_rotateLeftToe2 = 0;
let g_rotateLeftToe3 = 0;
let g_rotateLeftToe4 = 0;
let g_rotateLeftToe5 = 0;

let g_rotateRightToe1 = 0;
let g_rotateRightToe2 = 0;
let g_rotateRightToe3 = 0;
let g_rotateRightToe4 = 0;
let g_rotateRightToe5 = 0;

function makeKoalaToes(rootCubeMat, LEFT) {
    // Get correct rotation
    var rotateToe1 = LEFT ? g_rotateLeftToe1 : -g_rotateRightToe1;
    var rotateToe2 = LEFT ? g_rotateLeftToe2 : -g_rotateRightToe2;
    var rotateToe3 = LEFT ? g_rotateLeftToe3 : -g_rotateRightToe3;
    var rotateToe4 = LEFT ? g_rotateLeftToe4 : -g_rotateRightToe4;
    var rotateToe5 = LEFT ? g_rotateLeftToe5 : -g_rotateRightToe5;
    // FIRST TOE
    var fingyJoint1 = new Cube();
    fingyJoint1.color = g_green;
    fingyJoint1.matrix = new Matrix4(rootCubeMat);
    fingyJoint1.matrix.translate(0.1875, -1.5, 1.6);
    fingyJoint1.matrix.rotate(rotateToe1, 0, 1, 0);
    var fingyJoint1Mat = new Matrix4(fingyJoint1.matrix);
    fingyJoint1.matrix.scale(g_koalaScaleX * 0.25, g_koalaScaleY * 0.125, g_koalaScaleZ * 0.125);
    fingyJoint1.matrix.translate(-0.5, 0.0, -0.5);
    fingyJoint1.render();

    var thumbBone1 = new Cube();
    thumbBone1.color = g_yellow;
    thumbBone1.matrix = new Matrix4(fingyJoint1Mat);
    thumbBone1.matrix.translate(-0.1, 0.1, 0.19);
    thumbBone1.matrix.scale(g_koalaScaleX * 0.125, g_koalaScaleY * 0.0625, g_koalaScaleZ * 0.4);
    thumbBone1.render();

    var thumbJoint1 = new Cube();
    thumbJoint1.color = g_green;
    thumbJoint1.matrix = new Matrix4(fingyJoint1Mat);
    thumbJoint1.matrix.translate(0.0, 0.0, 1.5);
    thumbJoint1.matrix.rotate(rotateToe1 * 1.5, 0, 1, 0);
    var thumbJoint1Mat = new Matrix4(thumbJoint1.matrix);
    thumbJoint1.matrix.scale(g_koalaScaleX * 0.25, g_koalaScaleY * 0.125, g_koalaScaleZ * 0.125);
    thumbJoint1.matrix.translate(-0.5, 0.0, -0.5);
    thumbJoint1.render();

    var thumbBone2 = new Cube();
    thumbBone2.color = g_yellow;
    thumbBone2.matrix = new Matrix4(thumbJoint1Mat);
    thumbBone2.matrix.translate(-0.1, 0.09, 0.19);
    thumbBone2.matrix.scale(g_koalaScaleX * 0.125, g_koalaScaleY * 0.0625, g_koalaScaleZ * 0.4);
    thumbBone2.render();

    // SECOND TOE
    var fingyJoint2 = new Cube();
    fingyJoint2.color = g_green;
    fingyJoint2.matrix = new Matrix4(rootCubeMat);
    fingyJoint2.matrix.translate(0.1875, -2.875, 1.6);
    fingyJoint2.matrix.rotate(90, 1, 0, 0);
    fingyJoint2.matrix.rotate(rotateToe2, 0, 1, 0);
    var fingyJoint2Mat = new Matrix4(fingyJoint2.matrix);
    fingyJoint2.matrix.scale(g_koalaScaleX * 0.25, g_koalaScaleY * 0.125, g_koalaScaleZ * 0.125);
    fingyJoint2.matrix.translate(-0.5, 0.0, -0.5);
    fingyJoint2.render();

    var secondThumbBone1 = new Cube();
    secondThumbBone1.color = g_yellow;
    secondThumbBone1.matrix = new Matrix4(fingyJoint2Mat);
    secondThumbBone1.matrix.translate(-0.1, 0.1, 0.19);
    secondThumbBone1.matrix.scale(g_koalaScaleX * 0.125, g_koalaScaleY * 0.0625, g_koalaScaleZ * 0.4);
    secondThumbBone1.render();

    var thumbJoint2 = new Cube();
    thumbJoint2.color = g_green;
    thumbJoint2.matrix = new Matrix4(fingyJoint2Mat);
    thumbJoint2.matrix.translate(0.0, 0.0, 1.5);
    thumbJoint2.matrix.rotate(rotateToe2 * 1.5, 0, 1, 0);
    var thumbJoint2Mat = new Matrix4(thumbJoint2.matrix);
    thumbJoint2.matrix.scale(g_koalaScaleX * 0.25, g_koalaScaleY * 0.125, g_koalaScaleZ * 0.125);
    thumbJoint2.matrix.translate(-0.5, 0.0, -0.5);
    thumbJoint2.render();

    var secondThumbBone2 = new Cube();
    secondThumbBone2.color = g_yellow;
    secondThumbBone2.matrix = new Matrix4(thumbJoint2Mat);
    secondThumbBone2.matrix.translate(-0.1, 0.09, 0.19);
    secondThumbBone2.matrix.scale(g_koalaScaleX * 0.125, g_koalaScaleY * 0.0625, g_koalaScaleZ * 0.4);
    secondThumbBone2.render();

    // THIRD TOE
    var fingyJoint3 = new Cube();
    fingyJoint3.color = g_green;
    fingyJoint3.matrix = new Matrix4(rootCubeMat);
    fingyJoint3.matrix.translate(0.1875, -3.91, 1.3);
    // fingyJoint3.matrix.rotate(-10, 0, 1, 0);
    fingyJoint3.matrix.rotate(rotateToe3, 0, 0, 1);
    var fingyJoint3Mat = new Matrix4(fingyJoint3.matrix);
    fingyJoint3.matrix.scale(g_koalaScaleX * 0.25, g_koalaScaleY * 0.125, g_koalaScaleZ * 0.125);
    fingyJoint3.matrix.translate(-0.5, -0.5, 0.0);
    fingyJoint3.render();

    var indexBone1 = new Cube();
    indexBone1.color = g_yellow;
    indexBone1.matrix = new Matrix4(fingyJoint3Mat);
    indexBone1.matrix.translate(-0.09, -1.39, 0.09);
    indexBone1.matrix.scale(g_koalaScaleX * 0.125, g_koalaScaleY * 0.4, g_koalaScaleZ * 0.0625);
    indexBone1.render();

    var indexJoint1 = new Cube();
    indexJoint1.color = g_green;
    indexJoint1.matrix = new Matrix4(fingyJoint3Mat);
    indexJoint1.matrix.translate(0.0, -1.4, 0.0);
    indexJoint1.matrix.rotate(rotateToe3 * 1.3, 0, 0, 1);
    var indexJoint1Mat = new Matrix4(indexJoint1.matrix);
    indexJoint1.matrix.scale(g_koalaScaleX * 0.25, g_koalaScaleY * 0.125, g_koalaScaleZ * 0.125);
    indexJoint1.matrix.translate(-0.5, -0.5, 0.0);
    indexJoint1.render();

    var indexBone2 = new Cube();
    indexBone2.color = g_yellow;
    indexBone2.matrix = new Matrix4(indexJoint1Mat);
    indexBone2.matrix.translate(-0.1, -1.39, 0.1);
    indexBone2.matrix.scale(g_koalaScaleX * 0.125, g_koalaScaleY * 0.4, g_koalaScaleZ * 0.0625);
    indexBone2.render();

    var indexJoint2 = new Cube();
    indexJoint2.color = g_green;
    indexJoint2.matrix = new Matrix4(indexJoint1Mat);
    indexJoint2.matrix.translate(0.0, -1.4, 0.0);
    indexJoint2.matrix.rotate(rotateToe3 * 1.3, 0, 0, 1);
    var indexJoint2Mat = new Matrix4(indexJoint2.matrix);
    indexJoint2.matrix.scale(g_koalaScaleX * 0.25, g_koalaScaleY * 0.125, g_koalaScaleZ * 0.125);
    indexJoint2.matrix.translate(-0.5, -0.5, 0.0);
    indexJoint2.render();

    var indexBone3 = new Cube();
    indexBone3.color = g_yellow;
    indexBone3.matrix = new Matrix4(indexJoint2Mat);
    indexBone3.matrix.translate(-0.1, -1.39, 0.1);
    indexBone3.matrix.scale(g_koalaScaleX * 0.125, g_koalaScaleY * 0.4, g_koalaScaleZ * 0.0625);
    indexBone3.render();

    // FOURTH TOE
    var fingyJoint4 = new Cube();
    fingyJoint4.color = g_green;
    fingyJoint4.matrix = new Matrix4(rootCubeMat);
    fingyJoint4.matrix.translate(0.1875, -3.91, -0.2);
    // fingyJoint4.matrix.rotate(-10, 0, 1, 0);
    fingyJoint4.matrix.rotate(rotateToe4, 0, 0, 1);
    var fingyJoint4Mat = new Matrix4(fingyJoint4.matrix);
    fingyJoint4.matrix.scale(g_koalaScaleX * 0.25, g_koalaScaleY * 0.125, g_koalaScaleZ * 0.125);
    fingyJoint4.matrix.translate(-0.5, -0.5, 0.0);
    fingyJoint4.render();

    var middleBone1 = new Cube();
    middleBone1.color = g_yellow;
    middleBone1.matrix = new Matrix4(fingyJoint4Mat);
    middleBone1.matrix.translate(-0.09, -1.39, 0.09);
    middleBone1.matrix.scale(g_koalaScaleX * 0.125, g_koalaScaleY * 0.4, g_koalaScaleZ * 0.0625);
    middleBone1.render();

    var middleJoint1 = new Cube();
    middleJoint1.color = g_green;
    middleJoint1.matrix = new Matrix4(fingyJoint4Mat);
    middleJoint1.matrix.translate(0.0, -1.4, 0.0);
    middleJoint1.matrix.rotate(rotateToe4 * 1.3, 0, 0, 1);
    var middleJoint1Mat = new Matrix4(middleJoint1.matrix);
    middleJoint1.matrix.scale(g_koalaScaleX * 0.25, g_koalaScaleY * 0.125, g_koalaScaleZ * 0.125);
    middleJoint1.matrix.translate(-0.5, -0.5, 0.0);
    middleJoint1.render();

    var middleBone2 = new Cube();
    middleBone2.color = g_yellow;
    middleBone2.matrix = new Matrix4(middleJoint1Mat);
    middleBone2.matrix.translate(-0.1, -1.39, 0.1);
    middleBone2.matrix.scale(g_koalaScaleX * 0.125, g_koalaScaleY * 0.4, g_koalaScaleZ * 0.0625);
    middleBone2.render();

    var middleJoint2 = new Cube();
    middleJoint2.color = g_green;
    middleJoint2.matrix = new Matrix4(middleJoint1Mat);
    middleJoint2.matrix.translate(0.0, -1.4, 0.0);
    middleJoint2.matrix.rotate(rotateToe4 * 1.3, 0, 0, 1);
    var middleJoint2Mat = new Matrix4(middleJoint2.matrix);
    middleJoint2.matrix.scale(g_koalaScaleX * 0.25, g_koalaScaleY * 0.125, g_koalaScaleZ * 0.125);
    middleJoint2.matrix.translate(-0.5, -0.5, 0.0);
    middleJoint2.render();

    var middleBone3 = new Cube();
    middleBone3.color = g_yellow;
    middleBone3.matrix = new Matrix4(middleJoint2Mat);
    middleBone3.matrix.translate(-0.1, -1.39, 0.1);
    middleBone3.matrix.scale(g_koalaScaleX * 0.125, g_koalaScaleY * 0.4, g_koalaScaleZ * 0.0625);
    middleBone3.render();

    // FIFTH TOE
    var fingyJoint5 = new Cube();
    fingyJoint5.color = g_green;
    fingyJoint5.matrix = new Matrix4(rootCubeMat);
    fingyJoint5.matrix.translate(0.1875, -3.91, -1.69);
    // fingyJoint5.matrix.rotate(-10, 0, 1, 0);
    fingyJoint5.matrix.rotate(rotateToe5, 0, 0, 1);
    var fingyJoint5Mat = new Matrix4(fingyJoint5.matrix);
    fingyJoint5.matrix.scale(g_koalaScaleX * 0.25, g_koalaScaleY * 0.125, g_koalaScaleZ * 0.125);
    fingyJoint5.matrix.translate(-0.5, -0.5, 0.0);
    fingyJoint5.render();

    var pinkyBone1 = new Cube();
    pinkyBone1.color = g_yellow;
    pinkyBone1.matrix = new Matrix4(fingyJoint5Mat);
    pinkyBone1.matrix.translate(-0.09, -1.39, 0.09);
    pinkyBone1.matrix.scale(g_koalaScaleX * 0.125, g_koalaScaleY * 0.4, g_koalaScaleZ * 0.0625);
    pinkyBone1.render();

    var pinkyJoint1 = new Cube();
    pinkyJoint1.color = g_green;
    pinkyJoint1.matrix = new Matrix4(fingyJoint5Mat);
    pinkyJoint1.matrix.translate(0.0, -1.4, 0.0);
    pinkyJoint1.matrix.rotate(rotateToe5 * 1.3, 0, 0, 1);
    var pinkyJoint1Mat = new Matrix4(pinkyJoint1.matrix);
    pinkyJoint1.matrix.scale(g_koalaScaleX * 0.25, g_koalaScaleY * 0.125, g_koalaScaleZ * 0.125);
    pinkyJoint1.matrix.translate(-0.5, -0.5, 0.0);
    pinkyJoint1.render();

    var pinkyBone2 = new Cube();
    pinkyBone2.color = g_yellow;
    pinkyBone2.matrix = new Matrix4(pinkyJoint1Mat);
    pinkyBone2.matrix.translate(-0.1, -1.39, 0.1);
    pinkyBone2.matrix.scale(g_koalaScaleX * 0.125, g_koalaScaleY * 0.4, g_koalaScaleZ * 0.0625);
    pinkyBone2.render();

    var pinkyJoint2 = new Cube();
    pinkyJoint2.color = g_green;
    pinkyJoint2.matrix = new Matrix4(pinkyJoint1Mat);
    pinkyJoint2.matrix.translate(0.0, -1.4, 0.0);
    pinkyJoint2.matrix.rotate(rotateToe5 * 1.3, 0, 0, 1);
    var pinkyJoint2Mat = new Matrix4(pinkyJoint2.matrix);
    pinkyJoint2.matrix.scale(g_koalaScaleX * 0.25, g_koalaScaleY * 0.125, g_koalaScaleZ * 0.125);
    pinkyJoint2.matrix.translate(-0.5, -0.5, 0.0);
    pinkyJoint2.render();

    var pinkyBone3 = new Cube();
    pinkyBone3.color = g_yellow;
    pinkyBone3.matrix = new Matrix4(pinkyJoint2Mat);
    pinkyBone3.matrix.translate(-0.1, -1.39, 0.1);
    pinkyBone3.matrix.scale(g_koalaScaleX * 0.125, g_koalaScaleY * 0.4, g_koalaScaleZ * 0.0625);
    pinkyBone3.render();
}
