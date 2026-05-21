function createRange() {
    var rangeWall = new Cube();
    rangeWall.type = "rangewall"
    rangeWall.color = [0.2, 0.0, 0.2, 1.0];
    rangeWall.UVScale = 5;
    rangeWall.texture = t_RANGEWALL;
    rangeWall.matrix.translate(-5.0, 0.0, -10.0);
    var rangeWallMat = new Matrix4(rangeWall.matrix);
    rangeWall.matrix.scale(10.0, 5.0, 0.2);
    rangeWall.normalMat.setInverseOf(rangeWall.matrix).transpose();
    g_worldObjs.push(rangeWall);

    var rangeWall2 = new Cube();
    rangeWall2.type = "rangewall"
    rangeWall2.color = [0.2, 0.0, 0.2, 1.0];
    rangeWall2.UVScale = 5;
    rangeWall2.texture = t_RANGEWALL;
    rangeWall2.matrix = new Matrix4(rangeWallMat);
    rangeWall2.matrix.translate(0.0, 0.0, 10.0);
    rangeWall2.matrix.rotate(90, 0, 1, 0);
    rangeWall2.matrix.scale(9.8, 5.0, 0.2);
    rangeWall2.normalMat.setInverseOf(rangeWall2.matrix).transpose();
    g_worldObjs.push(rangeWall2);

    var rangeWall3 = new Cube();
    rangeWall3.type = "rangewall"
    rangeWall3.color = [0.2, 0.0, 0.2, 1.0];
    rangeWall3.UVScale = 5;
    rangeWall3.texture = t_RANGEWALL;
    rangeWall3.matrix = new Matrix4(rangeWallMat);
    rangeWall3.matrix.translate(10.0, 0.0, 0.2);
    rangeWall3.matrix.rotate(-90, 0, 1, 0);
    rangeWall3.matrix.scale(9.8, 5.0, 0.2);
    rangeWall3.normalMat.setInverseOf(rangeWall3.matrix).transpose();
    g_worldObjs.push(rangeWall3);

    var rangeRoof = new Cube();
    rangeRoof.type = "rangewall"
    rangeRoof.color = [0.2, 0.0, 0.2, 1.0];
    rangeRoof.UVScale = 5;
    rangeRoof.texture = t_RANGEWALL;
    rangeRoof.matrix = new Matrix4(rangeWallMat);
    rangeRoof.matrix.translate(1.0, 5.0, 1.0);
    rangeRoof.matrix.rotate(90, 1, 0, 0);
    rangeRoof.matrix.scale(8.0, 9.0, 0.2);
    rangeRoof.normalMat.setInverseOf(rangeRoof.matrix).transpose();
    g_worldObjs.push(rangeRoof);

    let bears = new CustomModel();
    bears.subtype = "bears";
    bears.matrix.translate(-5.0, 0.0, 1.0);
    bears.matrix.scale(0.1, 0.1, 0.1);
    bears.loadOBJ('./objects/customObjs/WeBareBears/bears.obj');
    g_worldObjs.push(bears);
}