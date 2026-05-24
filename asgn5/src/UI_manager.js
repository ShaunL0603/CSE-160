export class UIManager {
    constructor() {
        this.loadingScreen = document.querySelector('#loading');
        this.settingsMenu = document.querySelector('#settings-menu');
        
        // HUD element cache
        this.scoreVal = document.querySelector('#score-val');
        this.accuracyVal = document.querySelector('#accuracy-val');

        // Settings input fields
        this.sliderSpeed = document.querySelector('#slider-speed');
        this.sliderSize = document.querySelector('#slider-size');
        this.toggleNoclip = document.querySelector('#toggle-noclip');

        this.speedLabel = document.querySelector('#speed-val');
        this.sizeLabel = document.querySelector('#size-val');
        
        this._lastScore = -1;
        this._lastAccuracy = -1;
    }

    hideLoading() {
        if (this.loadingScreen) {
            this.loadingScreen.classList.add('hidden');
        }
    }

    showSettings(visible) {
        if (visible) {
            this.settingsMenu.classList.remove('hidden');
        } else {
            this.settingsMenu.classList.add('hidden');
        }
    }

    // Binds DOM slider values directly to config states
    bindSettings(logic) {
        this.sliderSpeed.addEventListener('input', (e) => {
            const val = parseFloat(e.target.value);
            this.speedLabel.textContent = val.toFixed(1);
            logic.targetManager.config.targetSpeed = val;
        });

        this.sliderSize.addEventListener('input', (e) => {
            const val = parseFloat(e.target.value);
            this.sizeLabel.textContent = val.toFixed(1);
            logic.targetManager.config.targetSize = val;
        });

        this.toggleNoclip.addEventListener('change', (e) => {
            logic.player.isNoclip = e.target.checked;
        });
    }

    // Synchronize current active configurations to the UI elements on menu open
    syncForm(logic) {
        this.sliderSpeed.value = logic.targetManager.config.targetSpeed;
        this.speedLabel.textContent = logic.targetManager.config.targetSpeed.toFixed(1);

        this.sliderSize.value = logic.targetManager.config.targetSize;
        this.sizeLabel.textContent = logic.targetManager.config.targetSize.toFixed(1);

        this.toggleNoclip.checked = logic.player.isNoclip;
    }

    updateHUD(score, shotsFired) {
        // Prevent layout engines from running if data values remain identical
        if (score !== this._lastScore) {
            this.scoreVal.textContent = score;
            this._lastScore = score;
        }

        const accuracy = shotsFired > 0 ? Math.round((score / shotsFired) * 100) : 100;
        if (accuracy !== this._lastAccuracy) {
            this.accuracyVal.textContent = accuracy;
            this._lastAccuracy = accuracy;
        }
    }
}