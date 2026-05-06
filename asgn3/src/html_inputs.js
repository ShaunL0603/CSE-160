function handleEvents() {
    canvas.addEventListener("click", (ev) => { 
        canvas.requestPointerLock(); 
        if (g_pointerLocked) {
            rayCast();
        }
    });
    document.addEventListener("pointerlockchange", () => {
        if (document.pointerLockElement === canvas) {
            g_pointerLocked = true;
        } else {
            g_pointerLocked = false;
            // clear movement
            g_keys["w"] = false;
            g_keys["a"] = false;
            g_keys["s"] = false;
            g_keys["d"] = false;
            g_keys["shift"] = false;
        }
    });
    document.onmousemove = (ev) => { 
        if (g_pointerLocked) {
            if (Math.abs(ev.movementX) > 300 || Math.abs(ev.movementY) > 300) return;
            g_camera.panCamera(-ev.movementX, ev.movementY);
        }
    };

    document.addEventListener("keydown", (ev) => { updateKeyDown(ev); });
    document.addEventListener("keyup", (ev) => { updateKeyUp(ev); });
}

function htmlActions() {
    const settingsPanel = document.getElementById("settingsPanel");
    const camSpeedInput = document.getElementById("camSpeed");
    const resetHeightButton = document.getElementById("resetHeightButton");
    
    settingsPanel.addEventListener("mousedown", (ev) => {
        ev.stopPropagation(); 
    });
    settingsPanel.addEventListener("click", (ev) => {
        ev.stopPropagation();
    });
    
    camSpeedInput.addEventListener("input", (ev) => {
        g_camSpeedMult = parseFloat(ev.target.value);
    });

    if (resetHeightButton) {
        resetHeightButton.addEventListener("click", () => {
           if (typeof g_camera !== null) {
               g_camera.resetHeight(0.5);
           } 
        });
    }

    const makeHitBoxVisible = document.getElementById("makeHitBoxVisible").addEventListener("click", () => {
        g_hitboxVisible = !g_hitboxVisible;

        for (let i = 0; i < g_targets.length; ++i) {
            let t = g_targets[i];
            if (t.hitbox) {
                t.hitbox.color[3] = g_hitboxVisible ? 1.0 : 0.0;
            }
        }
    });
    const targetSize = document.getElementById("targetSize").addEventListener("input", (ev) => {
        g_targetSize = parseFloat(ev.target.value);

        for (let i = 0; i < g_targets.length; ++i) {
            let t = g_targets[i];
            t.matrix = new Matrix4(t.baseMatrix);
            t.matrix.scale(g_targetSize, g_targetSize, g_targetSize);
            updateHitBox(t);
        };
    });
}

function updateKeyDown(ev) {
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
        case "shift":
            g_keys["shift"] = true;
            break;
        case "v":
            if (!g_keys["v"]) {
                g_noclip = !g_noclip;
                console.log(`Noclip: ${(g_noclip) ? "on" : "off"}`);
            }
            break;
        case "r":
            if (!g_keys["r"]) g_camera.resetHeight(0.5);
            break;
        case "1":
            if (!g_keys["1"]) g_playerMode = MINE;
            break;
        case "2":
            if (!g_keys["1"]) g_playerMode = FPS;
            break;
        default:
            // console.log(`${key} pressed`);
    }
}

function updateKeyUp(ev) {
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
        case "shift":
            g_keys["shift"] = false;
            break;
        case "v":
            g_keys["v"] = false;
            break;
        case "r":
            g_keys["r"] = false;
            break;
        case "1":
            g_keys["1"] = false;
            break;
        case "2": 
            g_keys["2"] = false;
            break;
        default:
            // console.log(`${key} pressed`);
    }
}

function sendTextToHTML(text, htmlID) {
    var htmlElm = document.getElementById(htmlID);
    if (!htmlElm) {
        console.log("Failed to get " + htmlID + " from HTML");
        return;
    }

    htmlElm.innerHTML = text;
}
