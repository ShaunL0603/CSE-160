function handleEvents() {
    canvas.addEventListener("click", (ev) => { 
        canvas.requestPointerLock(); 
        let mouseBtn = ev.button;
        if (g_pointerLocked) {
            rayCast(mouseBtn);
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
    document.addEventListener("keydown", (ev) => {
        if (ev.key.toLowerCase() === "z") {
            if (g_currMap === RANGE) return;
            
        }
    })

    document.addEventListener("keydown", (ev) => { updateKeyDown(ev); switchMap(ev); });
    document.addEventListener("keyup", (ev) => { updateKeyUp(ev); });
}

function htmlActions() {
    const settingsPanel = document.getElementById("settingsPanel");
    const camSpeedInput = document.getElementById("camMovSpeed");
    const resetHeightButton = document.getElementById("resetHeightButton");
    const volumeSlider = document.getElementById("volumeSlider");
    const maxTargets = document.getElementById("maxTargets");
    const makeHitBoxVisible = document.getElementById("makeHitBoxVisible");
    const targetSize = document.getElementById("targetSize");
    const changeMapSize = document.getElementById("changeMapSize");
    const floorTileCount = document.getElementById("floorTileCount");
    const playerScore = document.getElementById("playerScore");
    const camRotSpeed = document.getElementById("camRotSpeed");

    changeMapSize.addEventListener("input", (ev) => {
        if (ev.target.value > 0) g_mapSize = parseInt(ev.target.value);
    })

    floorTileCount.addEventListener("input", (ev) => {
        if (ev.target.value > 0) g_floorTileCount = parseInt(ev.target.value);
    })
    
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
    // Action to make the hit box visible
    makeHitBoxVisible.addEventListener("click", () => {
        g_hitboxVisible = !g_hitboxVisible;

        for (let i = 0; i < g_targets.length; ++i) {
            let t = g_targets[i];
            if (t.hitbox) {
                t.hitbox.color[3] = g_hitboxVisible ? 1.0 : 0.0;
            }
        }
    });
    // Action to change target size
    targetSize.addEventListener("input", (ev) => {
        g_targetSize = parseFloat(ev.target.value);

        for (let i = 0; i < g_targets.length; ++i) {
            let t = g_targets[i];
            t.matrix = new Matrix4(t.baseMatrix);
            t.matrix.scale(g_targetSize, g_targetSize, g_targetSize);
            updateHitBox(t);
        };
    });
    // Action to change the maximum number of target on screen
    maxTargets.addEventListener("input", (ev) => {
        let newMax = parseInt(ev.target.value);
        if (0 < newMax && newMax <= 100) {
            g_maxTargets = newMax;
            rebuildTargets();
        }
    });
    volumeSlider.addEventListener("input", (ev) => {
        let newVolume = parseFloat(ev.target.value);
        g_hitSound.volume = newVolume;
        sendTextToHTML(parseInt(newVolume * 100), "volumeValue");
    });
    camRotSpeed.addEventListener("input", (ev) => {
        if (0 < ev.target.value && ev.target.value <= 100) {
            g_camera.rotSpeed = parseInt(ev.target.value) * 0.001;
        }
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
            if (!g_keys["1"] && !ev.altKey) { 
                g_playerMode = MINE;
                sendTextToHTML("Mine", "playerMode");
            }
            break;
        case "2":
            if (!g_keys["1"] && !ev.altKey) {
                g_playerMode = FPS;
                sendTextToHTML("FPS", "playerMode");
            }
            break;
        case "z":
            if (!g_keys["z"]) {
                if (g_currMap !== RANDOM) return;
                regenerateMap();
            }
            break;
        case "x":
            if (!g_keys["x"]) {
                if (typeof g_camera !== null) g_camera.recenterCamera();
            }
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
        case "z":
            g_keys["z"] = false;
            break;
        case "x":
            g_keys["x"] = false;
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
