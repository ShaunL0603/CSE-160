function handleEvents() {
    // Event to fire when player clicks, ray cast
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
        if (g_pointerLocked) {
            updateKeyDown(ev);
            switchMap(ev);
        }
    });
    document.addEventListener("keyup", (ev) => { if (g_pointerLocked) updateKeyUp(ev); });
}

function htmlActions() {
    const settingsBtn = document.getElementById("settingsToggleBtn");
    const closeBtn = document.getElementById("closeSettings");
    const settingsPanel = document.getElementById("settingsPanel");

    const camSpeedInput = document.getElementById("camMovSpeed");
    const camRotSpeed = document.getElementById("camRotSpeed");
    const resetHeightButton = document.getElementById("resetHeightButton");

    const maxTargets = document.getElementById("maxTargets");
    const makeHitBoxVisible = document.getElementById("makeHitBoxVisible");
    const targetSize = document.getElementById("targetSize");

    const changeMapSize = document.getElementById("changeMapSize");
    const floorTileCount = document.getElementById("floorTileCount");

    const playerScore = document.getElementById("playerScore");
    const volumeSlider = document.getElementById("volumeSlider");

    const toggleTextures = document.getElementById("toggleTextures");
    const toggleNormals = document.getElementById("toggleNormals");

    const toggleLighting = document.getElementById("toggleLighting");
    const lightX = document.getElementById("lightX");
    const lightY = document.getElementById("lightY");
    const lightZ = document.getElementById("lightZ");
    const toggleLightPath = document.getElementById("toggleLightPath");

    // const light2X = document.getElementById("light2X");
    // const light2Y = document.getElementById("light2Y");
    // const light2Z = document.getElementById("light2Z");

    // --- settings panel actions ---
    // click on settings button and close btn
    settingsBtn.addEventListener('click', () => {toggleSettings(settingsPanel, settingsBtn); });
    closeBtn.addEventListener('click', () => {toggleSettings(settingsPanel, settingsBtn); });
    // press escape to exit settings
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !settingsPanel.classList.contains('hidden')) {
            toggleSettings(settingsPanel, settingsBtn)
        }
    });
    settingsPanel.addEventListener("mousedown", (ev) => {
        ev.stopPropagation(); 
    });
    settingsPanel.addEventListener("click", (ev) => {
        ev.stopPropagation();
    });

    // --- Actions for camera ---
    camSpeedInput.addEventListener("keydown", (ev) => {
        if (ev.key === "Enter") {
            if (ev.target.value < camSpeedInput.min) {
                console.log("invalid speed");
                ev.target.value = g_camSpeedMult;
                return;
            }

            g_camSpeedMult = parseFloat(ev.target.value);
        }
    });
    camRotSpeed.addEventListener("keydown", (ev) => {
        if (ev.key === "Enter") {
            if (ev.target.value < parseFloat(camRotSpeed.min) || ev.target.value > parseFloat(camRotSpeed.max)) {
                console.log("invalid rotation sensitivity");
                ev.target.value = g_camera.rotSpeed * 1000;
                return;
            }
            g_camera.rotSpeed = parseInt(ev.target.value) * 0.001;
        }
    });
    if (resetHeightButton) {
        resetHeightButton.addEventListener("click", () => {
           if (typeof g_camera !== null) {
               g_camera.resetHeight(0.5);
           } 
        });
    }

    // --- SETTINGS FOR TARGETS ---
    // Action to change target size
    targetSize.addEventListener("keydown", (ev) => {
        if (ev.key === "Enter") {
            if (ev.target.value < parseFloat(targetSize.min) || ev.target.value > parseFloat(targetSize.max)) {
                console.log("invalid target size");
                ev.target.value = g_targetSize;
                return;
            }

            g_targetSize = parseFloat(ev.target.value);
            rescaleTargets();
        }
    });
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
    // Action to change the maximum number of target on screen
    maxTargets.addEventListener("keydown", (ev) => {
        if (ev.key === "Enter") {
            let newMax = parseInt(ev.target.value);
            if (0 < newMax && newMax <= 10000) {
                g_maxTargets = newMax;
                rebuildTargets();
            }
            ev.target.value = g_maxTargets
        }
    });
    toggleLightPath.addEventListener("click", (ev) => { g_toggleLightPath = !g_toggleLightPath; })

    // --- SETTINGS FOR RNADOM MAP ---
    changeMapSize.addEventListener("keydown", (ev) => {
        if (ev.key === "Enter") {
            if (ev.target.value >= 5) g_mapSize = parseInt(ev.target.value);
            ev.target.value = g_mapSize;
        }
    });
    floorTileCount.addEventListener("keydown", (ev) => {
        if (ev.key === "Enter") {
            if (ev.target.value >= 0) g_floorTileCount = parseInt(ev.target.value);
            ev.target.value = g_floorTileCount;
        }
    });

    // --- LIGHT ACTIONS ---
    toggleLighting.onclick = () => { g_LightOn = !g_LightOn; };
    toggleNormals.onclick = () => { g_toggleNormals = !g_toggleNormals; };
    toggleTextures.onclick = () => { g_showTexture = !g_showTexture; };
    // Moving position of the light
    lightX.addEventListener("input", (ev) => {
        let newx = parseFloat(ev.target.value);
        g_lightPos[0] = newx;
        moveLight();
    });
    lightY.addEventListener("input", (ev) => {
        let newy = parseFloat(ev.target.value);
        g_lightPos[1] = newy;
        moveLight();
    });
    lightZ.addEventListener("input", (ev) => {
        let newz = parseFloat(ev.target.value);
        g_lightPos[2] = newz;
        moveLight();
    });
    
    // --- OTHER ---
    volumeSlider.addEventListener("input", (ev) => {
        let newVolume = parseFloat(ev.target.value);
        g_hitSound.volume = newVolume;
        sendTextToHTML(parseInt(newVolume * 100), "volumeValue");
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
            if (!g_keys["1"] && !ev.altKey && g_pointerLocked) { 
                g_playerMode = MINE;
                sendTextToHTML("Mine", "playerMode");
            }
            break;
        case "2":
            if (!g_keys["1"] && !ev.altKey && g_pointerLocked) {
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
function toggleSettings(settingsPanel, settingsBtn) {
    settingsPanel.classList.toggle("hidden");
    settingsBtn.classList.toggle('hidden');
}