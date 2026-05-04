function htmlActions() {
  const settingsPanel = document.getElementById('settingsPanel');
  const camSpeedInput = document.getElementById('cam-sensitivity');
  const speedVal = document.getElementById('sens-value');
    
  settingsPanel.addEventListener('mousedown', (ev) => {
    ev.stopPropagation(); 
  });
  
  settingsPanel.addEventListener('click', (ev) => {
    ev.stopPropagation();
  });
    
  camSpeedInput.addEventListener('input', (ev) => {    
    g_camSpeedMult = parseFloat(ev.target.value);
  });
}

let g_keys = {"w": false, "a": false, "s": false, "d": false, "shift" : false};
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
    }
}