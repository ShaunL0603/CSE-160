function click(ev) {
  if (ev.ctrlKey) {
    // Rotate object
    g_globalXAngle += ev.movementY;
    g_globalYAngle -= ev.movementX;
  }
}

let g_camRotSpeed = 0.25;
let g_camYaw = 270.0;
let g_camPitch = 0.0;
function mouseMove(ev) {
    // Rotate camera
    let vec3_at = new Vector3();
    vec3_at.set(g_at);
    vec3_at.sub(g_eye);
    vec3_at.normalize();
    
    g_camYaw -= ev.movementX * g_camRotSpeed;
    g_camPitch -= ev.movementY * g_camRotSpeed;
    
    // avoid parallel with up vector
    if (g_camPitch > 89.0) g_camPitch = 89.0;
    if (g_camPitch < -89.0) g_camPitch = -89.0;
    
    // degrees to radians
    let yawRadians =  g_camYaw * Math.PI / 180;
    let pitchRadians =  g_camPitch * Math.PI / 180;
    
    let vec3_d = new Vector3();
    let rho = vec3_at.magnitude();
    // Polar coordinates to cartesian
    vec3_d.elements[0] = rho * Math.cos(pitchRadians) * Math.cos(yawRadians); // new x
    vec3_d.elements[1] = rho * Math.sin(pitchRadians);                        // new y
    vec3_d.elements[2] = rho * Math.cos(pitchRadians) * Math.sin(yawRadians); // new z
    
    let vec3_eye = new Vector3();
    vec3_eye.set(g_eye);
    vec3_eye.add(vec3_d);
    g_at = vec3_eye;
}

let g_camPosSpeed = 0.01;
let g_d = new Vector3(); // Directional vector
function keyInput() {
    // copy of g_at
    let vec3_at = new Vector3();
    vec3_at.set(g_at);
    vec3_at.sub(g_eye);
    vec3_at.normalize();

    // movement vector to sum up all directional movements
    let vec3_m = new Vector3();
    if (g_keys["w"]) {
        g_d.set(vec3_at);
        vec3_m.add(g_d);
    } 
    if (g_keys["a"]) {
        g_d = Vector3.cross(g_up, vec3_at);
        g_d.normalize();
        vec3_m.add(g_d);
    } 
    if (g_keys["s"]) {
        g_d.set(vec3_at);
        g_d.mul(-1);
        vec3_m.add(g_d);
    } 
    if (g_keys["d"]) {
        g_d = Vector3.cross(g_up, vec3_at);
        g_d.normalize();
        g_d.mul(-1);
        vec3_m.add(g_d);
    }

    vec3_m.normalize(); // movement length to 1
    vec3_m.mul(g_camPosSpeed); // apply cam speed
    // update global eye and at vec3s
    g_eye.add(vec3_m);
    g_at.add(vec3_m);
}

let g_keys = {"w": false, "a": false, "s": false, "d": false};
function updateInputOnKeyDown(ev) {
    let key = ev.key.toLowerCase();
    switch (key) {
        case "w":
        g_keys["w"] = true;
        break;
        case "a":
        g_keys["a"] = true;
        break;
        case "s":
        g_keys["s"] = true;
        break;
        case "d":
        g_keys["d"] = true;
        break;
    }
}

function updateInputOnKeyUp(ev) {
    let key = ev.key.toLowerCase();
    switch (key) {
        case "w":
        g_keys["w"] = false;
        break;
        case "a":
        g_keys["a"] = false;
        break;
        case "s":
        g_keys["s"] = false;
        break;
        case "d":
        g_keys["d"] = false;
        break;
    }
}