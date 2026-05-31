import { GameLogic } from './game_logic.js';
import { RenderPipeline } from './render_pipeline.js';
import { InputManager } from './input_manager.js';
import { AudioManager } from './audio_manager.js';
import { AssetManager } from './asset_manager.js';
import { UIManager } from './UI_manager.js';

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

        this.isPaused = true;

        this.perfFrameCount = 0;
        this.perfAccumulator = 0;

        // Subsystems Instantiation
        this.input = new InputManager(this.canvas);
        this.audio = new AudioManager();
        this.assets = new AssetManager();
        this.ui = new UIManager();

        this.logic = new GameLogic();
        this.renderer = new RenderPipeline(this.canvas);
    }

    async start() {
        if (this.isRunning) return;
        this.audio.init();

        await this.assets.loadAll(this.audio.context);
        this.ui.hideLoading();

        // map loads when assets are fully downloaded
        this.logic.applyConfigChanges(this.assets);

        this.ui.bindSettings(this.logic, this.assets);
        this.setupLockHandlers();

        this.isRunning = true; 
        this.isPaused = false;
        // Establish timing baseline
        this.lastTime = performance.now() * 0.001;
        this.accumulator = 0;
        
        this.rafId = requestAnimationFrame((time) => this.loop(time));
    }

    setupLockHandlers() {
        // Toggle settings menu visibility based on Pointer Lock state
        document.addEventListener('pointerlockchange', () => {
            const locked = (document.pointerLockElement === this.canvas);
            this.input.isLocked = locked;

            if (locked) {
                this.ui.showSettings(false);
                this.logic.applyConfigChanges(this.assets);
                this.isPaused = false;
                // reset lastTime to current instance
                this.lastTime = performance.now() * 0.001;
            } else {
                this.input.resetKeys();
                this.ui.showSettings(true);
                this.ui.syncForm(this.logic);
                this.isPaused = true;
            }
        });
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
        const frameTime = currentTime - this.lastTime;
        this.lastTime = currentTime;

        // profiling metrics math
        this.perfFrameCount++;
        this.perfAccumulator += frameTime;
        if (this.perfAccumulator >= 0.5) {
            const fps = Math.round(this.perfFrameCount / this.perfAccumulator);
            // Average frame duration in milliseconds
            const ms = Math.round((this.perfAccumulator / this.perfFrameCount) * 1000);
            
            this.ui.updateStats(fps, ms);
            
            this.perfFrameCount = 0;
            this.perfAccumulator = 0;
        }

        // Apply failsafe limits to physical simulation only
        let clampedFrameTime = frameTime;
        if (clampedFrameTime > this.maxFrameTime) {
            clampedFrameTime = this.maxFrameTime;
        }

        if (!this.isPaused) {
            this.accumulator += clampedFrameTime;
            // Run fixed-step logical update sequences
            while (this.accumulator >= this.fixedTimeStep) {
                this.logic.savePreviousState();
                this.logic.update(this.fixedTimeStep, this.input, this.assets, this.audio);
                this.input.flush(); // clear mouse movement buffers once used in this simulation tick
                this.accumulator -= this.fixedTimeStep;
            }
        } else {
            // keep state flushed while paused, prevent gunshots
            this.input.flush();
        }

        // Calculate interpolation alpha (0.0 to 1.0)
        const alpha = this.isPaused ? 1.0 : this.accumulator / this.fixedTimeStep;
        // Feed pure state values + alpha directly to rendering pipeline
        this.renderer.render(this.logic, alpha, this.assets);
        // update HUD display values
        if (!this.isPaused) {
            this.ui.updateHUD(this.logic.score, this.logic.shotsFired, this.logic.currentMode);
        }

        this.rafId = requestAnimationFrame((time) => this.loop(time));
    }
}