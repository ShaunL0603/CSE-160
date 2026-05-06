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
    g_ground.UVScale = 100.0;
    g_ground.matrix.translate(-250.0, -0.2, -250.0);
    g_ground.matrix.scale(500, 0.2, 500);
    g_worldObjs.push(g_ground);

    drawWalls();
    drawTargets();
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
        target.baseMatrix.translate(spawnPos[i], 0.5, -3.0);

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
