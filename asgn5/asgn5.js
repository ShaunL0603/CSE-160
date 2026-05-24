import { Engine } from './src/engine.js';


function main() {
    const canvas = document.querySelector('#c');
    if (!canvas) {
        console.error("Canvas element not found!");
        return;
    }

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const engine = new Engine(canvas);
    engine.start();

    // window.engineInstance = engine;
}

window.addEventListener('DOMContentLoaded', main);