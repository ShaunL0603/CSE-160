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
    neck1.matrix.translate(-6.53 * g_koalaScaleX, 1.67 * g_koalaScaleY, 0.0);
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
    neck2.matrix.translate(-0.67 * g_koalaScaleX, 0.0, 0.0);
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
    neck3.matrix.translate(-0.67 * g_koalaScaleX, 0.0, 0.0);
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
    head1.matrix.translate(-3.67 * g_koalaScaleX, 0.5 * g_koalaScaleY, -1.3 * g_koalaScaleZ);
    var head1Mat = new Matrix4(head1.matrix);
    head1.matrix.scale(g_koalaScaleX * 3.0, g_koalaScaleY * 1.0, g_koalaScaleZ * 2.6);
    head1.render()

    var head2 = new Cube();
    head2.color = g_koalaGreyColorMat;
    head2.matrix = new Matrix4(neck3Mat);
    head2.matrix.translate(-5.87 * g_koalaScaleX, 0.17 * g_koalaScaleY, -1.35 * g_koalaScaleZ);
    head2.matrix.scale(g_koalaScaleX * 5.5, g_koalaScaleY * 1.0, g_koalaScaleZ * 2.7);
    head2.render()

    var head3 = new Cube();
    head3.color = g_koalaGreyColorMat;
    head3.matrix = new Matrix4(neck3Mat);
    head3.matrix.translate(-7.33 * g_koalaScaleX, -0.83 * g_koalaScaleY, -1.35 * g_koalaScaleZ);
    head3.matrix.scale(g_koalaScaleX * 6.6, g_koalaScaleY * 1.6, g_koalaScaleZ * 2.7);
    head3.render()

    var upperHead1 = new Cube();
    upperHead1.color = g_koalaGreyColorMat;
    upperHead1.matrix = new Matrix4(neck3Mat);
    upperHead1.matrix.translate(-6.87 * g_koalaScaleX, 1.13 * g_koalaScaleY, -1.2 * g_koalaScaleZ);
    upperHead1.matrix.rotate(-77, 0, 0, 1);
    upperHead1.matrix.scale(g_koalaScaleX * 1.0, g_koalaScaleY * 1.65, g_koalaScaleZ * 2.4);
    upperHead1.render()
    
    var upperHead2 = new Cube();
    upperHead2.color = g_koalaGreyColorMat;
    upperHead2.matrix = new Matrix4(neck3Mat);
    upperHead2.matrix.translate(-7.73 * g_koalaScaleX, 0.8 * g_koalaScaleY, -1.2 * g_koalaScaleZ);
    upperHead2.matrix.rotate(-50, 0, 0, 1);
    upperHead2.matrix.scale(g_koalaScaleX * 1.0, g_koalaScaleY * 0.55, g_koalaScaleZ * 2.4);
    upperHead2.render() 
    
    var snout = new Cube();
    snout.color = g_koalaGreyColorMat;
    snout.matrix = new Matrix4(neck3Mat);
    snout.matrix.translate(-8.33 * g_koalaScaleX, -0.67 * g_koalaScaleY, -1.2 * g_koalaScaleZ);
    snout.matrix.rotate(-10, 0, 0, 1);
    snout.matrix.scale(g_koalaScaleX * 1.0, g_koalaScaleY * 1.5, g_koalaScaleZ * 2.4);
    snout.render()

    var upperJaw = new Cube();
    upperJaw.color = g_koalaGreyColorMat;
    upperJaw.matrix = new Matrix4(neck3Mat);
    upperJaw.matrix.translate(-8.33 * g_koalaScaleX, -1.57 * g_koalaScaleY, -1.2 * g_koalaScaleZ);
    var upperJawMat = new Matrix4(upperJaw.matrix);
    upperJaw.matrix.scale(g_koalaScaleX * 7.7, g_koalaScaleY * 0.9, g_koalaScaleZ * 2.4);
    upperJaw.render()

    var lowerBackJaw = new Cube();
    lowerBackJaw.color = g_koalaGreyColorMat;
    lowerBackJaw.matrix = new Matrix4(upperJawMat);
    lowerBackJaw.matrix.translate(7.4 * g_koalaScaleX, -0.2 * g_koalaScaleY, 1.2 * g_koalaScaleZ);
    lowerBackJaw.matrix.rotate(45, 0, 0, 1);
    lowerBackJaw.matrix.scale(g_koalaScaleX * 1.0, g_koalaScaleY * 1.0, g_koalaScaleZ * 2.4);
    lowerBackJaw.matrix.translate(-0.5, -0.5, -0.5);
    lowerBackJaw.render();

    var lowerJawBase = new Cube();
    lowerJawBase.color = g_koalaGreyColorMat;
    lowerJawBase.matrix = upperJawMat;
    lowerJawBase.matrix.translate(4.13 * g_koalaScaleX, -0.33 * g_koalaScaleY, 1.2 * g_koalaScaleZ);
    lowerJawBase.matrix.rotate(g_rotateLowerJawY, 0, 0, 1);
    var lowerJawBaseMat = new Matrix4(lowerJawBase.matrix);
    lowerJawBase.matrix.scale(g_koalaScaleX * 6.5, g_koalaScaleY * 0.2, g_koalaScaleZ * 1.56);
    lowerJawBase.matrix.translate(-0.5, -0.5, -0.5);
    lowerJawBase.render()

    var lowerLeftJaw1 = new Cube();
    lowerLeftJaw1.color = g_koalaLighterGreyColorMat;
    lowerLeftJaw1.matrix = new Matrix4(lowerJawBaseMat);
    lowerLeftJaw1.matrix.translate(0.01 * g_koalaScaleX, 0.06 * g_koalaScaleY, 0.85 * g_koalaScaleZ);
    lowerLeftJaw1.matrix.rotate(-32.5, 1, 0, 0);
    lowerLeftJaw1.matrix.scale(6.5 * g_koalaScaleX, 0.2 * g_koalaScaleY, 0.3 * g_koalaScaleZ);
    lowerLeftJaw1.matrix.translate(-0.5, -0.5, -0.5);
    lowerLeftJaw1.render();

    var lowerLeftJaw2 = new Cube();
    lowerLeftJaw2.color = g_koalaLighterGreyColorMat;
    lowerLeftJaw2.matrix = new Matrix4(lowerJawBaseMat);
    lowerLeftJaw2.matrix.translate(-0.1 * g_koalaScaleX, 0.3 * g_koalaScaleY, 1.02 * g_koalaScaleZ);
    lowerLeftJaw2.matrix.rotate(-65, 1, 0, 0);
    lowerLeftJaw2.matrix.scale(6.0 * g_koalaScaleX, 0.2 * g_koalaScaleY, 0.4 * g_koalaScaleZ);
    lowerLeftJaw2.matrix.translate(-0.5, -0.5, -0.5);
    lowerLeftJaw2.render();

    var lowerRightJaw1 = new Cube();
    lowerRightJaw1.color = g_koalaLighterGreyColorMat;
    lowerRightJaw1.matrix = new Matrix4(lowerJawBaseMat);
    lowerRightJaw1.matrix.translate(0.01 * g_koalaScaleX, 0.06 * g_koalaScaleY, -0.85 * g_koalaScaleZ);
    lowerRightJaw1.matrix.rotate(32.5, 1, 0, 0);
    lowerRightJaw1.matrix.scale(6.5 * g_koalaScaleX, 0.2 * g_koalaScaleY, 0.3 * g_koalaScaleZ);
    lowerRightJaw1.matrix.translate(-0.5, -0.5, -0.5);
    lowerRightJaw1.render();

    var lowerRightJaw2 = new Cube();
    lowerRightJaw2.color = g_koalaLighterGreyColorMat;
    lowerRightJaw2.matrix = new Matrix4(lowerJawBaseMat);
    lowerRightJaw2.matrix.translate(-0.1 * g_koalaScaleX, 0.3 * g_koalaScaleY, -1.02 * g_koalaScaleZ);
    lowerRightJaw2.matrix.rotate(65, 1, 0, 0);
    lowerRightJaw2.matrix.scale(6.0 * g_koalaScaleX, 0.2 * g_koalaScaleY, 0.4 * g_koalaScaleZ);
    lowerRightJaw2.matrix.translate(-0.5, -0.5, -0.5);
    lowerRightJaw2.render();

    var lip1 = new Cube();
    lip1.color = g_koalaLighterGreyColorMat;
    lip1.matrix = new Matrix4(lowerJawBaseMat);
    lip1.matrix.translate(-3.2 * g_koalaScaleX, 0.05 * g_koalaScaleY, 0.0 * g_koalaScaleZ);
    lip1.matrix.rotate(32.5, 0, 0, 1);
    var lip1Mat = new Matrix4(lip1.matrix);
    lip1.matrix.scale(0.4 * g_koalaScaleX, 0.2 * g_koalaScaleY, 1.56 * g_koalaScaleZ);
    lip1.matrix.translate(-0.5, -0.5, -0.5);
    lip1.render();

    var lip2 = new Cube();
    lip2.color = g_koalaLighterGreyColorMat;
    lip2.matrix = new Matrix4(lip1Mat);
    lip2.matrix.translate(0.2 * g_koalaScaleX, 0.05 * g_koalaScaleY, 0.0 * g_koalaScaleZ);
    lip2.matrix.rotate(-32.5, 0, 0, 1);
    lip2.matrix.scale(0.4 * g_koalaScaleX, 0.2 * g_koalaScaleY, 1.76 * g_koalaScaleZ);
    lip2.matrix.translate(-0.5, -0.5, -0.5);
    lip2.render();

    var insideMouth = new Cube();
    insideMouth.color = [1.0, 0.0, 0.0, 1.0];
    insideMouth.matrix = new Matrix4(lowerJawBaseMat);
    insideMouth.matrix.translate(0.0 * g_koalaScaleX, 0.16 * g_koalaScaleY, 0.0 * g_koalaScaleZ);
    insideMouth.matrix.scale(g_koalaScaleX * 6.5, g_koalaScaleY * 0.15, g_koalaScaleZ * 1.76);
    insideMouth.matrix.translate(-0.5, -0.5, -0.5);
    insideMouth.render()
    
    makeKoalaFace(head1Mat);
}
