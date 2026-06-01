export class UIManager {
    constructor() {
        this.loadingScreen = document.querySelector('#loading');
        this.settingsMenu = document.querySelector('#settings-menu');

        this.scoreVal = document.querySelector('#score-val');
        this.accuracyVal = document.querySelector('#accuracy-val');
        this.modeVal = document.querySelector('#mode-val');

        this.fpsVal = document.querySelector('#fps-val');
        this.msVal = document.querySelector('#ms-val');
        
        this._lastScore = -1;
        this._lastAccuracy = -1;
        this._lastMode = '';

        this.initTabs();
    }

    updateStats(fps, ms) {
        if (this.fpsVal) this.fpsVal.textContent = fps;
        if (this.msVal) this.msVal.textContent = ms;
    }

    initTabs() {
        const tabBtns = document.querySelectorAll('.tab-btn');
        const tabPanes = document.querySelectorAll('.tab-pane');
 
        tabBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const currentBtn = e.currentTarget;
                // Remove active class from all
                tabBtns.forEach(b => b.classList.remove('active'));
                tabPanes.forEach(p => p.classList.remove('active'));
                // Add active class to clicked tab
                currentBtn.classList.add('active');
                const targetId = currentBtn.getAttribute('data-target');
                document.getElementById(targetId).classList.add('active');
            });
        });
    }

    hideLoading() {
        if (this.loadingScreen) {
            this.loadingScreen.classList.add('hidden');
        }
    }

    showSettings(visible) {
        if (visible) {
            this.settingsMenu.classList.remove('hidden');
            
            const resumeBtn = document.querySelector('#btn-resume');
            if (resumeBtn) {
                // disable button when brining up pause menu
                resumeBtn.disabled = true;
                // re-anable resume button after 1.25 seconds, restriction pass
                setTimeout(() => {
                    resumeBtn.disabled = false;
                }, 1250);
            }
        } else {
            this.settingsMenu.classList.add('hidden');
        }
    }

    // Binds DOM slider values directly to config states
    bindSettings(logic, assets) {
        const bindSlider = (id, configPath, labelId, isFloat = true) => {
            const slider = document.getElementById(id);
            const label = document.getElementById(labelId);
            if (!slider || !label) return;

            slider.addEventListener('input', (e) => {
                const val = isFloat ? parseFloat(e.target.value) : parseInt(e.target.value, 10);
                label.textContent = isFloat ? val.toFixed(2) : val;
                
                // Dynamically set nested config property
                const keys = configPath.split('.');
                let obj = logic.config;
                for (let i = 0; i < keys.length - 1; i++) obj = obj[keys[i]];
                obj[keys[keys.length - 1]] = val;
            });
        };

        const bindCheckbox = (id, configPath) => {
            const checkbox = document.getElementById(id);
            if (!checkbox) return;
            checkbox.addEventListener('change', (e) => {
                const keys = configPath.split('.');
                let obj = logic.config;
                for (let i = 0; i < keys.length - 1; i++) obj = obj[keys[i]];
                obj[keys[keys.length - 1]] = e.target.checked;
            });
        };

        // Camera & Controls
        bindSlider('slider-sens-x', 'controls.sensX', 'sens-x-val');
        bindSlider('slider-sens-y', 'controls.sensY', 'sens-y-val');
        bindSlider('slider-ads-sens', 'controls.adsSensMultiplier', 'ads-sens-val');
        bindSlider('slider-fov', 'camera.baseFOV', 'fov-val', false);
        bindCheckbox('toggle-crouch', 'controls.toggleCrouch');
        bindCheckbox('toggle-sprint', 'controls.toggleSprint');
        
        // Noclip is a special case (lives on player, not config)
        document.getElementById('toggle-noclip').addEventListener('change', (e) => {
            logic.player.isNoclip = e.target.checked;
        });

        // Target Settings
        bindSlider('slider-speed', 'gameplay.targetSpeed', 'speed-val', true);
        bindSlider('slider-size', 'gameplay.targetSize', 'size-val', true);
        bindSlider('slider-count', 'gameplay.targetCount', 'count-val', false);
        bindSlider('slider-radius', 'gameplay.destructionRadius', 'radius-val', true);

        // Debugger
        bindCheckbox('toggle-debug-zones', 'debug.showSpawnZones');
        bindCheckbox('toggle-debug-chunks', 'debug.showVoxelChunks');
        bindCheckbox('toggle-debug-hitboxes', 'debug.showHitboxes');

        // Graphics binding
        document.getElementById('select-shadows').addEventListener('change', (e) => {
            logic.config.graphics.shadowQuality = e.target.value;
        });
        document.getElementById('select-voxel-density').addEventListener('change', (e) => {
            logic.config.graphics.voxelDensity = e.target.value;
        });
        bindCheckbox('toggle-strobe-lights', 'graphics.enableStrobes');

        // Map Selection
        document.getElementById('select-map').addEventListener('change', (e) => {
            const mapType = e.target.value;
            logic.config.gameplay.mapType = mapType;
            
            const isStatic = (mapType === 'static');
            const slider = document.getElementById('slider-count');
            if (slider) {
                slider.disabled = isStatic; // Disable slider on static map
            }
        });

        // Reset Button
        document.getElementById('btn-reset').addEventListener('click', () => {
            logic.reset(assets);
            // Force HUD update immediately
            this.updateHUD(logic.score, logic.shotsFired, logic.currentMode, true);
        });
    }

    // Synchronize current active configurations to the UI elements on menu open
    syncForm(logic) {
        const syncSlider = (id, val, labelId, isFloat = true) => {
            const slider = document.getElementById(id);
            const label = document.getElementById(labelId);
            if (slider && label) {
                slider.value = val;
                label.textContent = isFloat ? val.toFixed(2) : val;
            }
        };

        const syncCheckbox = (id, val) => {
            const checkbox = document.getElementById(id);
            if (checkbox) checkbox.checked = val;
        };

        syncSlider('slider-sens-x', logic.config.controls.sensX, 'sens-x-val');
        syncSlider('slider-sens-y', logic.config.controls.sensY, 'sens-y-val');
        syncSlider('slider-ads-sens', logic.config.controls.adsSensMultiplier, 'ads-sens-val');
        syncSlider('slider-fov', logic.config.camera.baseFOV, 'fov-val', false);
        
        syncCheckbox('toggle-crouch', logic.config.controls.toggleCrouch);
        syncCheckbox('toggle-sprint', logic.config.controls.toggleSprint);
        syncCheckbox('toggle-noclip', logic.player.isNoclip);

        syncSlider('slider-speed', logic.config.gameplay.targetSpeed, 'speed-val');
        syncSlider('slider-size', logic.config.gameplay.targetSize, 'size-val');
        syncSlider('slider-count', logic.config.gameplay.targetCount, 'count-val', false);
        syncSlider('slider-radius', logic.config.gameplay.destructionRadius, 'radius-val');

        // Force disable state sync for the target count slider
        const isStatic = (logic.config.gameplay.mapType === 'static');
        const slider = document.getElementById('slider-count');
        if (slider) slider.disabled = isStatic;

        // Graphics sync
        const shadowSelect = document.getElementById('select-shadows');
        if (shadowSelect) shadowSelect.value = logic.config.graphics.shadowQuality;
        const densitySelect = document.getElementById('select-voxel-density');
        if (densitySelect) densitySelect.value = logic.config.graphics.voxelDensity;
        syncCheckbox('toggle-strobe-lights', logic.config.graphics.enableStrobes);

        // Debugger syncs
        syncCheckbox('toggle-debug-zones', logic.config.debug.showSpawnZones);
        syncCheckbox('toggle-debug-chunks', logic.config.debug.showVoxelChunks);
        syncCheckbox('toggle-debug-hitboxes', logic.config.debug.showHitboxes);

        const mapSelect = document.getElementById('select-map');
        if (mapSelect) mapSelect.value = logic.config.gameplay.mapType;
    }

    updateHUD(score, shotsFired, mode, force = false) {
        // Prevent layout engines from running if data values remain identical
        if (score !== this._lastScore || force) {
            this.scoreVal.textContent = score;
            this._lastScore = score;
        }

        const accuracy = shotsFired > 0 ? Math.round((score / shotsFired) * 100) : 100;
        if (accuracy !== this._lastAccuracy || force) {
            this.accuracyVal.textContent = accuracy;
            this._lastAccuracy = accuracy;
        }

        if (mode !== this._lastMode || force) {
            if (this.modeVal) {
                this.modeVal.textContent = mode === 'SHOOT' ? 'FPS' : 'DESTRUCTION';
                this.modeVal.style.color = mode === 'SHOOT' ? '#ffaa44' : '#aa44ff';
            }
            this._lastMode = mode;
        }
    }

    showLoading(visible) {
        if (visible) {
            this.loadingScreen.classList.remove('hidden');
            const progress = this.loadingScreen.querySelector('.progressbar');
            if (progress) {
                progress.style.transform = 'scaleX(1)'; // Set progress bar flat to 100%
            }
        } else {
            this.loadingScreen.classList.add('hidden');
        }
    }
}