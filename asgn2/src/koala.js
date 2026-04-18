function makeKoala() {

    var koalaGreyColorMat = [0.57, 0.56, 0.54, 1.0];
    var koalaWhiteColorMat = [1.0, 0.98, 0.93, 1.0];
    var koalaBlackColorMat = [0.2, 0.2, 0.2, 1.0];
    
    // Torso cubes
    var torso1 = new Cube();
    torso1.color = koalaGreyColorMat;
    torso1.matrix.setTranslate(0.0, 0.0, 0.0);
    torso1.matrix.rotate(g_animalXAngle, 1, 0, 0);
    torso1.matrix.rotate(g_animalYAngle, 0, 1, 0);
    torso1.matrix.rotate(g_animalZAngle, 0, 0, 1);
    var torso1Mat = new Matrix4(torso1.matrix);
    torso1.matrix.translate(-0.3, 0, -0.3);
    torso1.matrix.scale(3.0, 3.0, 2.5);
    torso1.render();

    var torso2 = new Cube();
    torso2.color = koalaGreyColorMat;
    torso2.matrix = torso1Mat;
    torso2.matrix.translate(-0.55, 0, -0.2);
    torso2.matrix.scale(3.5, 2.7, 2.3);
    torso2.render();

    var belly = new Cube();
    belly.color = koalaWhiteColorMat;
    belly.matrix = torso1Mat;
    belly.matrix.translate(0.2, 0, -0.1);
    belly.matrix.scale(0.6, 1.05, 0.6);
    belly.render();

    var neck = new Cube();
    neck.color = koalaGreyColorMat;
    neck.matrix = torso1Mat;
    neck.matrix.translate(-0.05, 1.0, 0.45);
    neck.matrix.scale(1.1, 0.15, 1.3);
    neck.render();

    // Head cubes
    var head1 = new Cube();
    head1.color = koalaGreyColorMat;
    head1.matrix = torso1.matrix;
    var head1Mat = new Matrix4(head1.matrix);
    head1.matrix.translate(0.1, 1.13, 0.11);
    head1.matrix.scale(0.8, 0.6, 0.8);
    head1.render();

    var head2 = new Cube();
    head2.color = koalaGreyColorMat;
    head2.matrix = head1Mat;
    head2.matrix.translate(0.15, 1.07, 0.16);
    head2.matrix.scale(0.7, 0.73, 0.7);
    head2.render();
    
    var head3 = new Cube();
    head3.color = koalaGreyColorMat;
    head3.matrix = head1Mat;
    head3.matrix.translate(0.05, 1.0, 0.05);
    head3.matrix.scale(0.9, 0.1, 0.9);
    head3.render();

    var head4 = new Cube();
    head4.color = koalaGreyColorMat;
    head4.matrix = new Matrix4(head1.matrix);
    head4.matrix.translate(0.05, 0.05, -0.1);
    head4.matrix.scale(0.9, 0.9, 1.2);
    head4.render()
    
    var leftEar = new Cube();
    leftEar.color = koalaGreyColorMat;
    leftEar.matrix = new Matrix4(head1.matrix);
    var leftEarMat = new Matrix4(leftEar.matrix);
    leftEar.matrix.translate(-0.4, 0.8, 0.25);
    leftEar.matrix.scale(0.6, 0.8, 0.4);
    leftEar.render();

    var innerLeftEar = new Cube();
    innerLeftEar.color = koalaWhiteColorMat;
    innerLeftEar.matrix = leftEarMat;
    innerLeftEar.matrix.translate(-0.35, 0.87, 0.16);
    innerLeftEar.matrix.scale(0.5, 0.65, 0.1);
    innerLeftEar.render();

    var rightEar = new Cube();
    rightEar.color = koalaGreyColorMat;
    rightEar.matrix = new Matrix4(leftEar.matrix);
    rightEar.matrix.translate(2.0, 0.0, 0.0);
    rightEar.render();

    var innerRightEar = new Cube();
    innerRightEar.color = koalaWhiteColorMat;
    innerRightEar.matrix = new Matrix4(innerLeftEar.matrix);
    innerRightEar.matrix.translate(2.4, 0.0, 0.0);
    innerRightEar.render();

    // Cubes for face
    var snout1 = new Cube();
    snout1.color = koalaGreyColorMat;
    snout1.matrix = new Matrix4(head1.matrix);
    // snout1.matrix.rotate(-10, -45, 0, 1);
    snout1.matrix.translate(0.2, 0.2, -0.2);
    snout1.matrix.scale(0.6, 0.3, 0.3);
    snout1.render();

    var snout2 = new Cube();
    snout2.color = koalaGreyColorMat;
    snout2.matrix = new Matrix4(snout1.matrix);
    // snout2.matrix.rotate(45, 45, 0, 1);
    // snout2.matrix.translate(0.0, -0.6, 1);
    snout2.matrix.translate(0.0, -1.05, 0.0);
    snout2.render();
    
    var nose = new Cube();
    nose.color = koalaBlackColorMat
    nose.matrix = new Matrix4(head1.matrix);
    nose.matrix.translate(0.4, 0.3, -0.3);
    nose.matrix.scale(0.15, 0.5, 0.2);
    nose.render();

    var leftEye = new Cube();
    leftEye.color = koalaBlackColorMat;
    leftEye.matrix = new Matrix4(nose.matrix);
    leftEye.matrix.translate(-1.5, 0.6, 0.5);
    leftEye.matrix.scale(0.8, 0.4, 0.8);
    leftEye.render();

    var rightEye = new Cube();
    rightEye.color = koalaBlackColorMat;
    rightEye.matrix = new Matrix4(leftEye.matrix);
    rightEye.matrix.translate(4.0, 0.0, 0.0);
    rightEye.render();

    // Left Arm cubes
    // var left = new Cube();
    // left.color = [0.57, 0.56, 0.54, 1.0];
    // left.matrix = bodyMat;
    // left.matrix.translate(0.4, 1, -0.3);
    // left.matrix.rotate(-135, 0, 0, 1);
    // left.matrix.scale(0.25, 0.7, 0.5);
    // left.render();
}