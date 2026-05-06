function createWorld() {
    g_skybox = new Cube();
    g_skybox.type = "sky";
    g_skybox.color = [0.0, 0.0, 1.0, 1.0];
    g_skybox.textureNum = 0;
    g_skybox.matrix.translate(-500.0, -500.0, -500.0);
    g_skybox.matrix.scale(1000.0, 1000.0, 1000.0);
    g_worldObjs.push(g_skybox);

    g_ground = new Cube();
    g_ground.type = "ground";
    g_ground.color = [0.2, 0.5, 0.2, 1.0];
    g_ground.textureNum = 1;
    g_ground.UVScale = 5.0;
    g_ground.matrix.translate(-20.0, -0.2, -20.0);
    g_ground.matrix.scale(40, 0.2, 40);
    g_worldObjs.push(g_ground);

    // drawWalls();
    drawRange();
    drawTargets();
}

function drawRange() {
    var rangeWall = new Cube();
    rangeWall.type = "rangeWall"
    rangeWall.color = [0.2, 0.0, 0.2, 1.0];
    rangeWall.UVScale = 5;
    rangeWall.textureNum = 3;
    rangeWall.matrix.translate(-5.0, 0.0, -10.0);
    var rangeWallMat = new Matrix4(rangeWall.matrix);
    rangeWall.matrix.scale(10.0, 5.0, 0.2);
    g_worldObjs.push(rangeWall);

    var rangeWall2 = new Cube();
    rangeWall2.type = "rangeWall"
    rangeWall2.color = [0.2, 0.0, 0.2, 1.0];
    rangeWall2.UVScale = 5;
    rangeWall2.textureNum = 3;
    rangeWall2.matrix = new Matrix4(rangeWallMat);
    rangeWall2.matrix.translate(0.0, 0.0, 10.0);
    rangeWall2.matrix.rotate(90, 0, 1, 0);
    rangeWall2.matrix.scale(9.8, 5.0, 0.2);
    g_worldObjs.push(rangeWall2);

    var rangeWall3 = new Cube();
    rangeWall3.type = "rangeWall"
    rangeWall3.color = [0.2, 0.0, 0.2, 1.0];
    rangeWall3.UVScale = 5;
    rangeWall3.textureNum = 3;
    rangeWall3.matrix = new Matrix4(rangeWallMat);
    rangeWall3.matrix.translate(10.0, 0.0, 0.2);
    rangeWall3.matrix.rotate(-90, 0, 1, 0);
    rangeWall3.matrix.scale(9.8, 5.0, 0.2);
    g_worldObjs.push(rangeWall3);
}

var g_map = [
    [1, 1, 1, 1, 0, 1, 1, 1], 
    [1, 0, 0, 0, 0, 0, 0, 1], 
    [1, 0, 1, 1, 1, 1, 0, 1], 
    [0, 0, 0, 1, 0, 1, 0, 1], 
    [1, 0, 0, 1, 0, 0, 0, 1], 
    [1, 0, 0, 0, 0, 1, 0, 1], 
    [1, 0, 0, 1, 0, 0, 0, 1], 
    [1, 0, 1, 1, 0, 1, 1, 1]
];
function drawWalls() {
    for (let x = 0; x < g_map.length; ++x) {
        for (let y = 0; y < g_map.length; ++y) {
            if (g_map[x][y] == 1) {
                var wall = new Cube();
                wall.type = "wall";
                wall.color = [0.5, 0.5, 0.5, 1.0];
                wall.textureNum = 2;
                wall.matrix.translate(x, -0.001, y);
                g_worldObjs.push(wall);
            }
        }
    }
}

function drawTargets() {
    let spawnPos = [-1.0, 0.0, 2.0];

    for (let i = 0; i < spawnPos.length; ++i) {
        var target = new Sphere();
        target.type = "target";
        target.color = [1.0, 0.0, 0.0, 1.0];
        target.textureNum = -2;
        target.baseMatrix = new Matrix4();
        target.baseMatrix.translate(spawnPos[i], 0.5, -8.0);

        target.matrix = new Matrix4(target.baseMatrix);
        target.matrix.scale(g_targetSize, g_targetSize, g_targetSize);
        
        var targetHitBox = new Cube();
        targetHitBox.type = "hit box";
        targetHitBox.color = [1.0, 1.0, 0.0, (g_hitboxVisible) ? 1.0 : 0.0];
        targetHitBox.textureNum = -2;
        target.hitbox = targetHitBox;
        updateHitBox(target);

        g_targets.push(target);
        g_worldObjs.push(target);
        g_worldObjs.push(targetHitBox);
    }
}

function updateHitBox(target) {
    if (!target.hitbox || !target.baseMatrix) return;

    let hitBoxSize = g_targetSize * 1.4;
    let offset = (hitBoxSize) * 0.5;
    
    target.hitbox.matrix = new Matrix4(target.baseMatrix);
    target.hitbox.matrix.translate(-offset, -offset, -offset);
    target.hitbox.matrix.scale(hitBoxSize, hitBoxSize, hitBoxSize);
}

function placeBlock(closestDistance) {
    let origin = new Vector3(g_camera.eye.elements);
    let direction = new Vector3();
    direction.set(g_camera.at);
    direction.sub(origin);
    direction.normalize();

    let spawnDistance = closestDistance;
    direction.mul(spawnDistance);

    let hitPoint = new Vector3(origin.elements);
    hitPoint.add(direction);

    let newCube = new Cube();
    newCube.type = "block";
    newCube.color = [0.0, 0.0, 0.0, 1.0];
    newCube.textureNum = -2;
    newCube.matrix.translate(
        hitPoint.elements[0] - 0.25,
        hitPoint.elements[1],
        hitPoint.elements[2] - 0.25
    );
    newCube.matrix.scale(0.5, 0.5, 0.5);
    g_worldObjs.push(newCube);
}