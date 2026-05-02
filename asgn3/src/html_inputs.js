function click(ev) {
  if (ev.ctrlKey) {
    // Rotate object
    g_globalXAngle += ev.movementY;
    g_globalYAngle -= ev.movementX;
  }
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