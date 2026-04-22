// Global rotation variables for head
    // Head rotations
    let g_rotateHeadX = 0;
    let g_rotateHeadY = 0;
    let g_rotateHeadZ = 0;

    // Jaw rotations
    let g_rotateLowerJawY = 0;

function makeKoalaHead(rootCubeMat) {    
    var neck1 = new Cube();
    neck1.color = g_koalaGreyColorMat;
    neck1.matrix = new Matrix4(rootCubeMat);
    neck1.matrix.translate(-9.8, 5.0, 0.0);
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
    head1.matrix.translate(-5.5, 1.5, -3.9);
    head1.matrix.scale(g_koalaScaleX * 3.0, g_koalaScaleY * 1.0, g_koalaScaleZ * 2.6);
    head1.render()

    var head2 = new Cube();
    head2.color = g_koalaGreyColorMat;
    head2.matrix = new Matrix4(neck3Mat);
    head2.matrix.translate(-8.8, 0.5, -4.05);
    head2.matrix.scale(g_koalaScaleX * 5.5, g_koalaScaleY * 1.0, g_koalaScaleZ * 2.7);
    head2.render()

    var head3 = new Cube();
    head3.color = g_koalaGreyColorMat;
    head3.matrix = new Matrix4(neck3Mat);
    head3.matrix.translate(-11.0, -2.5, -4.05);
    head3.matrix.scale(g_koalaScaleX * 6.6, g_koalaScaleY * 1.6, g_koalaScaleZ * 2.7);
    head3.render()

    var upperHead1 = new Cube();
    upperHead1.color = g_koalaGreyColorMat;
    upperHead1.matrix = new Matrix4(neck3Mat);
    upperHead1.matrix.translate(-10.3, 3.4, -3.6);
    upperHead1.matrix.rotate(-77, 0, 0, 1);
    upperHead1.matrix.scale(g_koalaScaleX * 1.0, g_koalaScaleY * 1.65, g_koalaScaleZ * 2.4);
    upperHead1.render()
    
    var upperHead2 = new Cube();
    upperHead2.color = g_koalaGreyColorMat;
    upperHead2.matrix = new Matrix4(neck3Mat);
    upperHead2.matrix.translate(-11.6, 2.4, -3.6);
    upperHead2.matrix.rotate(-50, 0, 0, 1);
    upperHead2.matrix.scale(g_koalaScaleX * 1.0, g_koalaScaleY * 0.55, g_koalaScaleZ * 2.4);
    upperHead2.render() 
    
    var snout = new Cube();
    snout.color = g_koalaGreyColorMat;
    snout.matrix = new Matrix4(neck3Mat);
    snout.matrix.translate(-12.5, -2.0, -3.6);
    snout.matrix.rotate(-10, 0, 0, 1);
    snout.matrix.scale(g_koalaScaleX * 1.0, g_koalaScaleY * 1.5, g_koalaScaleZ * 2.4);
    snout.render()

    var upperJaw = new Cube();
    upperJaw.color = g_koalaGreyColorMat;
    upperJaw.matrix = new Matrix4(neck3Mat);
    upperJaw.matrix.translate(-12.5, -4.7, -3.6);
    var upperJawMat = new Matrix4(upperJaw.matrix);
    upperJaw.matrix.scale(g_koalaScaleX * 7.7, g_koalaScaleY * 0.9, g_koalaScaleZ * 2.4);
    upperJaw.render()

    var lowerBackJaw = new Cube();
    lowerBackJaw.color = g_koalaGreyColorMat;
    lowerBackJaw.matrix = new Matrix4(upperJawMat);
    lowerBackJaw.matrix.translate(11.1, -0.6, 3.6);
    lowerBackJaw.matrix.rotate(45, 0, 0, 1);
    lowerBackJaw.matrix.scale(g_koalaScaleX * 1.0, g_koalaScaleY * 1.0, g_koalaScaleZ * 2.4);
    lowerBackJaw.matrix.translate(-0.5, -0.5, -0.5);
    lowerBackJaw.render();

    var lowerJawBase = new Cube();
    lowerJawBase.color = g_koalaGreyColorMat;
    lowerJawBase.matrix = upperJawMat;
    lowerJawBase.matrix.translate(6.2, -1.0, 3.6);
    lowerJawBase.matrix.rotate(g_rotateLowerJawY, 0, 0, 1);
    lowerJawBase.matrix.scale(g_koalaScaleX * 6.5, g_koalaScaleY * 0.5, g_koalaScaleZ * 2.4);
    lowerJawBase.matrix.translate(-0.5, -0.5, -0.5);
    lowerJawBase.render()
}
