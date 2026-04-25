

function makeKoalaTorso(rootCubeMat) {
    var upperTorso1 = new Cube();
    upperTorso1.color = g_koalaGreyColorMat;
    upperTorso1.matrix = new Matrix4(rootCubeMat);
    upperTorso1.matrix.translate(-6.5 * g_koalaScaleX, -1.5 * g_koalaScaleY, -1.5 * g_koalaScaleZ);
    var upperTorso1Mat = new Matrix4(upperTorso1.matrix);
    upperTorso1.matrix.scale(g_koalaScaleX * 3.5, g_koalaScaleY * 3.25, g_koalaScaleZ * 3.0);
    upperTorso1.render();

    var upperTorso2 = new Cube();
    upperTorso2.color = g_koalaGreyColorMat;
    upperTorso2.matrix = new Matrix4(upperTorso1Mat);
    upperTorso2.matrix.translate(-2.0 * g_koalaScaleX, 0.1 * g_koalaScaleY, 0.1 * g_koalaScaleZ);
    var upperTorso2Mat = new Matrix4(upperTorso2.matrix);
    upperTorso2.matrix.scale(g_koalaScaleX * 2.0, g_koalaScaleY * 3.2, g_koalaScaleZ * 2.85);
    upperTorso2.render();

    var lowerTorso1 = new Cube();
    lowerTorso1.color = g_koalaGreyColorMat;
    lowerTorso1.matrix = new Matrix4(upperTorso1Mat);
    lowerTorso1.matrix.translate(9.5 * g_koalaScaleX, 0.17 * g_koalaScaleY, -0.13 * g_koalaScaleZ);
    var lowerTorso1Mat = new Matrix4(lowerTorso1.matrix);
    lowerTorso1.matrix.scale(g_koalaScaleX * 5.0, g_koalaScaleY * 3.25, g_koalaScaleZ * 3.25);
    lowerTorso1.render();

    var lowerTorso2 = new Cube();
    lowerTorso2.color = g_koalaGreyColorMat;
    lowerTorso2.matrix = new Matrix4(lowerTorso1Mat);
    lowerTorso2.matrix.translate(5 * g_koalaScaleX, -0.07 * g_koalaScaleY, 0.0);
    var lowerTorso2Mat = new Matrix4(lowerTorso2.matrix);
    lowerTorso2.matrix.scale(g_koalaScaleX * 4.0, g_koalaScaleY * 3.3, g_koalaScaleZ * 3.25);
    lowerTorso2.render();

    var backNeck1 = new Cube();
    backNeck1.color = g_koalaGreyColorMat;
    backNeck1.matrix = new Matrix4(upperTorso1Mat);
    backNeck1.matrix.translate(2.0 * g_koalaScaleX, 3.0 * g_koalaScaleY, 1.5 * g_koalaScaleZ);
    backNeck1.matrix.rotate(22.5, 0, 0, 1);
    backNeck1.matrix.scale(g_koalaScaleX * 2.0, g_koalaScaleY * 2.0, g_koalaScaleZ * 2.7);
    backNeck1.matrix.translate(-0.5, -0.5, -0.5);
    backNeck1.render();

    var backNeck2 = new Cube();
    backNeck2.color = g_koalaGreyColorMat;
    backNeck2.matrix = new Matrix4(upperTorso1Mat);
    backNeck2.matrix.translate(1.0 * g_koalaScaleX, 3.6 * g_koalaScaleY, 1.5 * g_koalaScaleZ);
    backNeck2.matrix.rotate(80, 0, 0, 1);
    backNeck2.matrix.scale(g_koalaScaleX * 2.5, g_koalaScaleY * 0.9, g_koalaScaleZ * 2.7);
    backNeck2.matrix.translate(-0.5, -0.5, -0.5);
    backNeck2.render();

    var back = new Cube();
    back.color = g_koalaGreyColorMat;
    back.matrix = new Matrix4(lowerTorso2Mat);
    back.matrix.translate(0.0 * g_koalaScaleX, 3.1 * g_koalaScaleY, -0.45 * g_koalaScaleZ);
    back.matrix.scale(4.5 * g_koalaScaleX, 1.0 * g_koalaScaleY, 4.1 * g_koalaScaleZ);
    back.render();

    var back2 = new Cube();
    back2.color = g_koalaGreyColorMat;
    back2.matrix = new Matrix4(lowerTorso1Mat);
    back2.matrix.translate(0.0 * g_koalaScaleX, 3.1 * g_koalaScaleY, -0.45 * g_koalaScaleZ);
    back2.matrix.scale(5.0 * g_koalaScaleX, 0.92 * g_koalaScaleY, 4.1 * g_koalaScaleZ);
    back2.render();

    var back3 = new Cube();
    back3.color = g_koalaGreyColorMat;
    back3.matrix = new Matrix4(rootCubeMat);
    back3.matrix.translate(-3.1 * g_koalaScaleX, 0.9 * g_koalaScaleY, -2.1 * g_koalaScaleZ);
    back3.matrix.rotate(15, 0, 0, 1);
    back3.matrix.scale(7.0 * g_koalaScaleX, 0.92 * g_koalaScaleY, 4.1 * g_koalaScaleZ);
    back3.render();
    
    var belly = new Cube();
    belly.color = g_koalaWhiteColorMat;
    belly.matrix = new Matrix4(rootCubeMat);
    belly.matrix.translate(-5.0 * g_koalaScaleX, -2.0 * g_koalaScaleY, -1.88 * g_koalaScaleZ);
    var bellyMat = new Matrix4(belly.matrix);
    belly.matrix.scale(8.0 * g_koalaScaleX, 0.5 * g_koalaScaleY, 3.7 * g_koalaScaleZ);
    belly.render();

    var belly2 = new Cube();
    belly2.color = g_koalaWhiteColorMat;
    belly2.matrix = new Matrix4(bellyMat);
    belly2.matrix.translate(8.0 * g_koalaScaleX, -0.15 * g_koalaScaleY, 0.0 * g_koalaScaleZ);
    belly2.matrix.scale(9.0 * g_koalaScaleX, 0.7 * g_koalaScaleY, 3.7 * g_koalaScaleZ);
    belly2.render();

    makeKoalaSide(rootCubeMat, upperTorso1Mat, 
                  upperTorso2Mat, lowerTorso1Mat, 
                  lowerTorso2Mat);
    makeKoalaBehind(rootCubeMat);
}

function makeKoalaSide(rootCubeMat, 
                       upperTorso1Mat, 
                       upperTorso2Mat, 
                       lowerTorso1Mat, 
                       lowerTorso2Mat) 
{
    var side = new Cube();
    side.color = g_koalaGreyColorMat;
    side.matrix = new Matrix4(upperTorso2Mat);
    side.matrix.translate(1.21 * g_koalaScaleX, 1.99 * g_koalaScaleY, -0.43 * g_koalaScaleZ);
    side.matrix.rotate(10, 1, 0, 0);
    // side.matrix.rotate( -g_rotateUpperLeftArm * 0.1, 0, 0, 1);
    side.matrix.scale(2.0 * g_koalaScaleX, 2.8 * g_koalaScaleY, 1.3 * g_koalaScaleZ);
    side.matrix.translate(-0.5, -0.5, -0.5);
    side.render();

    var side2 = new Cube();
    side2.color = g_koalaGreyColorMat;
    side2.matrix = new Matrix4(upperTorso1Mat);
    side2.matrix.translate(1.26 * g_koalaScaleX, 1.89 * g_koalaScaleY, -0.37 * g_koalaScaleZ);
    side2.matrix.rotate(10, 1, 0, 0);
    side2.matrix.rotate(-10, 0, 0, 1);
    side2.matrix.scale(3.5 * g_koalaScaleX, 3.0 * g_koalaScaleY, 1.3 * g_koalaScaleZ);
    side2.matrix.translate(-0.5, -0.5, -0.5);
    side2.render();

    var side3 = new Cube();
    side3.color = g_koalaGreyColorMat;
    side3.matrix = new Matrix4(rootCubeMat);
    side3.matrix.translate(-4.0 * g_koalaScaleX, 0.1 * g_koalaScaleY, -2.23 * g_koalaScaleZ);
    side3.matrix.rotate(5, 1, 0, 0);
    var side3Mat = new Matrix4(side3.matrix);
    side3.matrix.scale(7.0 * g_koalaScaleX, 1.75 * g_koalaScaleY, 1.3 * g_koalaScaleZ);
    side3.render();

    var side4 = new Cube();
    side4.color = g_koalaGreyColorMat;
    side4.matrix = new Matrix4(side3Mat);
    side4.matrix.translate(0.0 * g_koalaScaleX, -1.9 * g_koalaScaleY, 0.32 * g_koalaScaleZ);
    side4.matrix.rotate(-10, 1, 0, 0);
    side4.matrix.scale(7.0 * g_koalaScaleX, 1.95 * g_koalaScaleY, 1.3 * g_koalaScaleZ);
    side4.render();

    var side5 = new Cube();
    side5.color = g_koalaGreyColorMat;
    side5.matrix = new Matrix4(lowerTorso1Mat);
    side5.matrix.translate(0.0 * g_koalaScaleX, 1.5 * g_koalaScaleY, -0.78 * g_koalaScaleZ);
    side5.matrix.rotate(10, 1, 0, 0);
    side5.matrix.rotate(5, 0, 1, 0);
    side5.matrix.rotate(2, 0, 0, 1);
    var side5Mat = new Matrix4(side5.matrix);
    side5.matrix.scale(2.6 * g_koalaScaleX, 1.95 * g_koalaScaleY, 1.0 * g_koalaScaleZ);
    side5.render();

    var side6 = new Cube();
    side6.color = g_koalaGreyColorMat;
    side6.matrix = new Matrix4(lowerTorso1Mat);
    side6.matrix.translate(-0.15 * g_koalaScaleX, -0.55 * g_koalaScaleY, -0.4 * g_koalaScaleZ);
    side6.matrix.rotate(-10, 1, 0, 0);
    side6.matrix.rotate(5, 0, 1, 0);
    side6.matrix.rotate(-2, 0, 0, 1);
    var side6Mat = new Matrix4(side6.matrix);
    side6.matrix.scale(2.6 * g_koalaScaleX, 2.2 * g_koalaScaleY, 1.0 * g_koalaScaleZ);
    side6.render();

    var side7 = new Cube();
    side7.color = g_koalaGreyColorMat;
    side7.matrix = new Matrix4(side5Mat);
    side7.matrix.translate(2.2 * g_koalaScaleX, 0.0 * g_koalaScaleY, 0.0 * g_koalaScaleZ);
    side7.matrix.rotate(-5, 0, 1, 0);
    side7.matrix.rotate(-2, 0, 0, 1);
    side7.matrix.scale(2.8 * g_koalaScaleX, 1.95 * g_koalaScaleY, 1.0 * g_koalaScaleZ);
    side7.render();

    var side8 = new Cube();
    side8.color = g_koalaGreyColorMat;
    side8.matrix = new Matrix4(side6Mat);
    side8.matrix.translate(2.6 * g_koalaScaleX, 0.0 * g_koalaScaleY, 0.0 * g_koalaScaleZ);
    side8.matrix.rotate(-5, 0, 1, 0);
    side8.matrix.rotate(2, 0, 0, 1);
    side8.matrix.scale(2.6 * g_koalaScaleX, 2.2 * g_koalaScaleY, 1.0 * g_koalaScaleZ);
    side8.render();

    var side9 = new Cube();
    side9.color = g_koalaGreyColorMat;
    side9.matrix = new Matrix4(lowerTorso2Mat);
    side9.matrix.translate(0.01 * g_koalaScaleX, 1.94 * g_koalaScaleY, -0.82 * g_koalaScaleZ);
    side9.matrix.rotate(10, 1, 0, 0);
    var side9Mat = new Matrix4(side9.matrix);
    side9.matrix.scale(4.1 * g_koalaScaleX, 1.65 * g_koalaScaleY, 1.0 * g_koalaScaleZ);
    side9.render();

    var side10 = new Cube();
    side10.color = g_koalaGreyColorMat;
    side10.matrix = new Matrix4(lowerTorso2Mat);
    side10.matrix.translate(0.01 * g_koalaScaleX, -0.55 * g_koalaScaleY, -0.5 * g_koalaScaleZ);
    side10.matrix.rotate(-10, 1, 0, 0);
    side10.matrix.scale(4.1 * g_koalaScaleX, 2.2 * g_koalaScaleY, 1.0 * g_koalaScaleZ);
    side10.render();

    var side11 = new Cube();
    side11.color = g_koalaGreyColorMat;
    side11.matrix = new Matrix4(side9Mat);
    side11.matrix.translate(0.0 * g_koalaScaleX, -0.35 * g_koalaScaleY, 0.0 * g_koalaScaleZ);
    side11.matrix.scale(4.1 * g_koalaScaleX, 0.4 * g_koalaScaleY, 1.0 * g_koalaScaleZ);
    side11.render();

    //* Right side cubes
    var rightSide = new Cube();
    rightSide.color = g_koalaGreyColorMat;
    rightSide.matrix = new Matrix4(upperTorso2Mat);
    rightSide.matrix.translate(1.23 * g_koalaScaleX, 1.94 * g_koalaScaleY, 3.21 * g_koalaScaleZ);
    // rightSide.matrix.translate(1.23 * g_koalaScaleX, 2.64 * g_koalaScaleY, 3.21 * g_koalaScaleZ);
    rightSide.matrix.rotate(-10, 1, 0, 0);
    // rightSide.matrix.rotate(g_rotateUpperRightArm * 0.1, 0, 0, 1);
    // rightSide.matrix.scale(2.0 * g_koalaScaleX, 1.4 * g_koalaScaleY, 1.3 * g_koalaScaleZ);
    rightSide.matrix.scale(2.0 * g_koalaScaleX, 2.8 * g_koalaScaleY, 1.3 * g_koalaScaleZ);
    rightSide.matrix.translate(-0.5, -0.5, -0.5);
    rightSide.render();

    var rightSide2 = new Cube();
    rightSide2.color = g_koalaGreyColorMat;
    rightSide2.matrix = new Matrix4(upperTorso1Mat);
    rightSide2.matrix.scale(1, 1, -1);
    rightSide2.matrix.translate(1.37 * g_koalaScaleX, 1.82 * g_koalaScaleY, -3.34 * g_koalaScaleZ);
    rightSide2.matrix.rotate(10, 1, 0, 0);
    rightSide2.matrix.rotate(180, 0, 1, 0);
    rightSide2.matrix.rotate(10, 0, 0, 1);
    rightSide2.matrix.scale(3.5 * g_koalaScaleX, 3.0 * g_koalaScaleY, 1.3 * g_koalaScaleZ);
    rightSide2.matrix.translate(-0.5, -0.5, -0.5);
    rightSide2.render();

    var rightSide3 = new Cube();
    rightSide3.color = g_koalaGreyColorMat;
    rightSide3.matrix = new Matrix4(rootCubeMat);
    rightSide3.matrix.scale(1, 1, -1);
    rightSide3.matrix.translate(4.0 * g_koalaScaleX, 0.0 * g_koalaScaleY, -0.9 * g_koalaScaleZ);
    rightSide3.matrix.rotate(5, 1, 0, 0);
    rightSide3.matrix.rotate(180, 0, 1, 0);
    var rightSide3Mat = new Matrix4(rightSide3.matrix);
    rightSide3.matrix.scale(7.5 * g_koalaScaleX, 1.75 * g_koalaScaleY, 1.3 * g_koalaScaleZ);
    rightSide3.render();
    
    var rightSide4 = new Cube();
    rightSide4.color = g_koalaGreyColorMat;
    rightSide4.matrix = new Matrix4(rightSide3Mat);
    rightSide4.matrix.translate(0.0 * g_koalaScaleX, -1.7 * g_koalaScaleY, -0.32 * g_koalaScaleZ);
    rightSide4.matrix.rotate(10, 1, 0, 0);
    rightSide4.matrix.scale(8.0 * g_koalaScaleX, 1.95 * g_koalaScaleY, 1.3 * g_koalaScaleZ);
    rightSide4.render();

    var rightSide5 = new Cube();
    rightSide5.color = g_koalaGreyColorMat;
    rightSide5.matrix = new Matrix4(lowerTorso1Mat);
    rightSide3.matrix.scale(1, 1, -1);
    rightSide5.matrix.translate(0.8 * g_koalaScaleX, 1.4 * g_koalaScaleY, 3.05 * g_koalaScaleZ);
    rightSide5.matrix.rotate(-10, 1, 0, 0);
    rightSide5.matrix.rotate(5, 0, 1, 0);
    rightSide5.matrix.rotate(2, 0, 0, 1);
    var rightSide5Mat = new Matrix4(rightSide5.matrix);
    rightSide5.matrix.scale(2.6 * g_koalaScaleX, 1.95 * g_koalaScaleY, 1.0 * g_koalaScaleZ);
    rightSide5.render();

    var rightSide6 = new Cube();
    rightSide6.color = g_koalaGreyColorMat;
    rightSide6.matrix = new Matrix4(lowerTorso1Mat);
    rightSide6.matrix.translate(0.6 * g_koalaScaleX, -0.35 * g_koalaScaleY, 2.665 * g_koalaScaleZ);
    rightSide6.matrix.rotate(10, 1, 0, 0);
    rightSide6.matrix.rotate(5, 0, 1, 0);
    rightSide6.matrix.rotate(-2, 0, 0, 1);
    var rightSide6Mat = new Matrix4(rightSide6.matrix);
    rightSide6.matrix.scale(2.6 * g_koalaScaleX, 2.2 * g_koalaScaleY, 1.0 * g_koalaScaleZ);
    rightSide6.render();

    var rightSide7 = new Cube();
    rightSide7.color = g_koalaGreyColorMat;
    rightSide7.matrix = new Matrix4(rightSide5Mat);
    rightSide7.matrix.translate(2.2 * g_koalaScaleX, 0.0 * g_koalaScaleY, 0.0 * g_koalaScaleZ);
    rightSide7.matrix.rotate(-5, 0, 1, 0);
    rightSide7.matrix.rotate(-2, 0, 0, 1);
    rightSide7.matrix.scale(2.8 * g_koalaScaleX, 1.95 * g_koalaScaleY, 1.0 * g_koalaScaleZ);
    rightSide7.render();

    var rightSide8 = new Cube();
    rightSide8.color = g_koalaGreyColorMat;
    rightSide8.matrix = new Matrix4(rightSide6Mat);
    rightSide8.matrix.translate(2.6 * g_koalaScaleX, 0.0 * g_koalaScaleY, 0.03 * g_koalaScaleZ);
    rightSide8.matrix.rotate(-5, 0, 1, 0);
    rightSide8.matrix.rotate(2, 0, 0, 1);
    rightSide8.matrix.scale(2.6 * g_koalaScaleX, 2.2 * g_koalaScaleY, 1.0 * g_koalaScaleZ);
    rightSide8.render();
    
    var rightside9 = new Cube();
    rightside9.color = g_koalaGreyColorMat;
    rightside9.matrix = new Matrix4(lowerTorso2Mat);
    rightside9.matrix.translate(0.2 * g_koalaScaleX, 1.78 * g_koalaScaleY, 2.9 * g_koalaScaleZ);
    rightside9.matrix.rotate(-10, 1, 0, 0);
    var rightside9Mat = new Matrix4(rightside9.matrix);
    rightside9.matrix.scale(4.1 * g_koalaScaleX, 1.65 * g_koalaScaleY, 1.0 * g_koalaScaleZ);
    rightside9.render();

    var rightside10 = new Cube();
    rightside10.color = g_koalaGreyColorMat;
    rightside10.matrix = new Matrix4(lowerTorso2Mat);
    rightside10.matrix.translate(0.2 * g_koalaScaleX, -0.32 * g_koalaScaleY, 2.6 * g_koalaScaleZ);
    rightside10.matrix.rotate(10, 1, 0, 0);
    rightside10.matrix.scale(4.1 * g_koalaScaleX, 2.2 * g_koalaScaleY, 1.0 * g_koalaScaleZ);
    rightside10.render();

    var rightside11 = new Cube();
    rightside11.color = g_koalaGreyColorMat;
    rightside11.matrix = new Matrix4(rightside9Mat);
    rightside11.matrix.translate(0.0 * g_koalaScaleX, -0.4 * g_koalaScaleY, 0.0 * g_koalaScaleZ);
    rightside11.matrix.scale(4.1 * g_koalaScaleX, 0.4 * g_koalaScaleY, 1.0 * g_koalaScaleZ);
    rightside11.render();
}

let rotateBehind = 2.0;
function makeKoalaBehind(rootCubeMat) {
    var leftBehind = new Cube();
    leftBehind.color = g_green;
    leftBehind.matrix = new Matrix4(rootCubeMat);
    leftBehind.matrix.translate(13.0 * g_koalaScaleX, 0.0 * g_koalaScaleY, -1.5 * g_koalaScaleZ);
    leftBehind.matrix.rotate(g_rotateUpperRightLeg * 0.1, 0, 0, 1);
    leftBehind.matrix.rotate(rotateBehind * 1.5, 0, 1, 0);
    var leftBehindMat = new Matrix4(leftBehind.matrix);
    leftBehind.matrix.scale(1.0 * g_koalaScaleX, 0.5 * g_koalaScaleY, 0.5 * g_koalaScaleZ);
    leftBehind.render();

    var leftBehind2 = new Cube();
    leftBehind2.color = g_koalaGreyColorMat;
    leftBehind2.matrix = new Matrix4(leftBehindMat);
    leftBehind2.matrix.translate(-1.2 * g_koalaScaleX, 1.5 * g_koalaScaleY, -0.8 * g_koalaScaleZ);
    var leftBehind2Mat = new Matrix4(leftBehind2.matrix);
    leftBehind2.matrix.scale(3.0 * g_koalaScaleX, 0.6 * g_koalaScaleY, 2.3 * g_koalaScaleZ);
    leftBehind2.render();

    var leftBehind3 = new Cube();
    leftBehind3.color = g_koalaGreyColorMat;
    leftBehind3.matrix = new Matrix4(leftBehind2Mat);
    leftBehind3.matrix.translate(0.0 * g_koalaScaleX, -0.6 * g_koalaScaleY, -0.2 * g_koalaScaleZ);
    var leftBehind3Mat = new Matrix4(leftBehind3.matrix);
    leftBehind3.matrix.scale(4.3 * g_koalaScaleX, 0.6 * g_koalaScaleY, 2.5 * g_koalaScaleZ);
    leftBehind3.render();

    var leftBehind4 = new Cube();
    leftBehind4.color = g_koalaGreyColorMat;
    leftBehind4.matrix = new Matrix4(leftBehind3Mat);
    leftBehind4.matrix.translate(0.0 * g_koalaScaleX, -1.5 * g_koalaScaleY, -0.2 * g_koalaScaleZ);
    var leftBehind4Mat = new Matrix4(leftBehind4.matrix);
    leftBehind4.matrix.scale(4.8 * g_koalaScaleX, 1.5 * g_koalaScaleY, 2.7 * g_koalaScaleZ);
    leftBehind4.render();

    var leftBehind5 = new Cube();
    leftBehind5.color = g_koalaGreyColorMat;
    leftBehind5.matrix = new Matrix4(leftBehind4Mat);
    leftBehind5.matrix.translate(0.0 * g_koalaScaleX, -0.6 * g_koalaScaleY, 0.2 * g_koalaScaleZ);
    var leftBehind5Mat = new Matrix4(leftBehind5.matrix);
    leftBehind5.matrix.scale(4.3 * g_koalaScaleX, 0.6 * g_koalaScaleY, 2.5 * g_koalaScaleZ);
    leftBehind5.render();

    var leftBehind6 = new Cube();
    leftBehind6.color = g_koalaGreyColorMat;
    leftBehind6.matrix = new Matrix4(leftBehind5Mat);
    leftBehind6.matrix.translate(0.0 * g_koalaScaleX, -0.6 * g_koalaScaleY, 0.2 * g_koalaScaleZ);
    leftBehind6.matrix.scale(4.1 * g_koalaScaleX, 0.6 * g_koalaScaleY, 2.3 * g_koalaScaleZ);
    leftBehind6.render();

    var leftBehind7 = new Cube();
    leftBehind7.color = g_koalaGreyColorMat;
    leftBehind7.matrix = new Matrix4(rootCubeMat);
    leftBehind7.matrix.translate(9.2 * g_koalaScaleX, 0.0 * g_koalaScaleY, -2.2 * g_koalaScaleZ);
    leftBehind7.matrix.rotate(15, 0, 1, 0);
    leftBehind7.matrix.scale(3.5 * g_koalaScaleX, 3.0 * g_koalaScaleY, 0.5 * g_koalaScaleZ);
    leftBehind7.matrix.translate(0.0, -0.5, 0.0);
    leftBehind7.render();

    var rightBehind = new Cube();
    rightBehind.color = g_green;
    rightBehind.matrix = new Matrix4(rootCubeMat);
    rightBehind.matrix.translate(13.0 * g_koalaScaleX, 0.0 * g_koalaScaleY, 1.5 * g_koalaScaleZ);
    rightBehind.matrix.rotate(g_rotateUpperLeftLeg * 0.1, 0, 0, 1);
    rightBehind.matrix.rotate(rotateBehind * 1.5, 0, 1, 0);
    var rightBehindMat = new Matrix4(rightBehind.matrix);
    rightBehind.matrix.scale(1.0 * g_koalaScaleX, 0.5 * g_koalaScaleY, 0.5 * g_koalaScaleZ);
    rightBehind.render();

    var rightBehind2 = new Cube();
    rightBehind2.color = g_koalaGreyColorMat;
    rightBehind2.matrix = new Matrix4(rightBehindMat);
    rightBehind2.matrix.translate(-1.2 * g_koalaScaleX, 1.5 * g_koalaScaleY, -1.5 * g_koalaScaleZ);
    var rightBehind2Mat = new Matrix4(rightBehind2.matrix);
    rightBehind2.matrix.scale(3.0 * g_koalaScaleX, 0.6 * g_koalaScaleY, 2.3 * g_koalaScaleZ);
    rightBehind2.render();

    var rightBehind3 = new Cube();
    rightBehind3.color = g_koalaGreyColorMat;
    rightBehind3.matrix = new Matrix4(rightBehind2Mat);
    rightBehind3.matrix.translate(0.0 * g_koalaScaleX, -0.6 * g_koalaScaleY, 0.0 * g_koalaScaleZ);
    var rightBehind3Mat = new Matrix4(rightBehind3.matrix);
    rightBehind3.matrix.scale(4.3 * g_koalaScaleX, 0.6 * g_koalaScaleY, 2.5 * g_koalaScaleZ);
    rightBehind3.render();

    var rightBehind4 = new Cube();
    rightBehind4.color = g_koalaGreyColorMat;
    rightBehind4.matrix = new Matrix4(rightBehind3Mat);
    rightBehind4.matrix.translate(0.0 * g_koalaScaleX, -1.5 * g_koalaScaleY, 0.0* g_koalaScaleZ);
    var rightBehind4Mat = new Matrix4(rightBehind4.matrix);
    rightBehind4.matrix.scale(4.8 * g_koalaScaleX, 1.5 * g_koalaScaleY, 2.7 * g_koalaScaleZ);
    rightBehind4.render();

    var rightBehind5 = new Cube();
    rightBehind5.color = g_koalaGreyColorMat;
    rightBehind5.matrix = new Matrix4(rightBehind4Mat);
    rightBehind5.matrix.translate(0.0 * g_koalaScaleX, -0.6 * g_koalaScaleY, 0.0 * g_koalaScaleZ);
    var rightBehind5Mat = new Matrix4(rightBehind5.matrix);
    rightBehind5.matrix.scale(4.3 * g_koalaScaleX, 0.6 * g_koalaScaleY, 2.5 * g_koalaScaleZ);
    rightBehind5.render();

    var rightBehind6 = new Cube();
    rightBehind6.color = g_koalaGreyColorMat;
    rightBehind6.matrix = new Matrix4(rightBehind5Mat);
    rightBehind6.matrix.translate(0.0 * g_koalaScaleX, -0.6 * g_koalaScaleY, 0.0 * g_koalaScaleZ);
    rightBehind6.matrix.scale(4.1 * g_koalaScaleX, 0.6 * g_koalaScaleY, 2.3 * g_koalaScaleZ);
    rightBehind6.render();

    var rightBehind7 = new Cube();
    rightBehind7.color = g_koalaGreyColorMat;
    rightBehind7.matrix = new Matrix4(rootCubeMat);
    rightBehind7.matrix.translate(9.5 * g_koalaScaleX, 0.0 * g_koalaScaleY, 1.7 * g_koalaScaleZ);
    rightBehind7.matrix.rotate(-15, 0, 1, 0);
    rightBehind7.matrix.scale(3.5 * g_koalaScaleX, 3.0 * g_koalaScaleY, 0.5 * g_koalaScaleZ);
    rightBehind7.matrix.translate(0.0, -0.5, 0.0);
    rightBehind7.render();
}
