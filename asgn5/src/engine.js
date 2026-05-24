import { GameLogic } from './game_logic.js';
import { RenderPipeline } from './render_pipeline.js';
import { InputManager } from './input_manager.js';

export class Engine {
    constructor(canvas) {
        this.canvas = canvas;
        
        // Physics logic locked at exactly 60 updates per second (16.66ms per tick)
        this.fixedTimeStep = 1 / 60; 
        
        // Failsafe threshold to avoid execution overflow
        this.maxFrameTime = 0.25; 
        
        this.accumulator = 0;
        this.lastTime = 0;
        this.isRunning = false;
        this.rafId = null;

        // Subsystems Instantiation
        this.input = new InputManager(this.canvas);
        this.logic = new GameLogic();
        this.renderer = new RenderPipeline(this.canvas);
    }

    start() {
        if (this.isRunning) return;
        this.isRunning = true;
        
        // Establish timing baseline
        this.lastTime = performance.now() * 0.001;
        this.accumulator = 0;
        
        this.rafId = requestAnimationFrame((time) => this.loop(time));
    }

    stop() {
        this.isRunning = false;
        if (this.rafId) {
            cancelAnimationFrame(this.rafId);
            this.rafId = null;
        }
    }

    loop(currentTimeMs) {
        if (!this.isRunning) return;

        const currentTime = currentTimeMs * 0.001; // Scale to seconds
        let frameTime = currentTime - this.lastTime;
        this.lastTime = currentTime;

        // Apply fallback limits on severe browser frame drops
        if (frameTime > this.maxFrameTime) {
            frameTime = this.maxFrameTime;
        }

        this.accumulator += frameTime;

        // Run fixed-step logical update sequences
        while (this.accumulator >= this.fixedTimeStep) {
            this.logic.savePreviousState();
            this.logic.update(this.fixedTimeStep, this.input);
            this.input.flush(); // clear mouse movement buffers once used in this simulation tick
            this.accumulator -= this.fixedTimeStep;
        }

        // Calculate interpolation alpha (0.0 to 1.0)
        const alpha = this.accumulator / this.fixedTimeStep;

        // Feed pure state values + alpha directly to rendering pipeline
        this.renderer.render(this.logic, alpha);

        this.rafId = requestAnimationFrame((time) => this.loop(time));
    }
}