import { Engine } from './systems/engine.js';


function main() {
    const canvas = document.querySelector('#c');
    if (!canvas) {
        console.error("Canvas element not found!");
        return;
    }

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const engine = new Engine(canvas);
    engine.ui.bindMainMenu(engine);
    // show initial solid black main menu screen
    engine.ui.showMainMenu(true, false); // menu visible, engine has not started
}

window.addEventListener('DOMContentLoaded', main);