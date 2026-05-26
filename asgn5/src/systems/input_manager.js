export class InputManager {
    constructor(canvas) {
        this.canvas = canvas;

        // Synchronous input state queried by GameLogic
        this.state = {
            forward: false,
            backward: false,
            left: false,
            right: false,
            jump: false,
            crouch: false,
            sprint: false,
            ads: false
        };

        this.triggers = {
            crouch: false,
            sprint: false,
            noclip: false,
            fire: false
        }

        // Accumulated mouse coordinates between ticks
        this.mouseDelta = { x: 0, y: 0 };
        this.isLocked = false;

        this.initListeners();
    }

    initListeners() {
        // Request Pointer Lock on canvas click
        this.canvas.addEventListener('click', () => {
            if (!this.isLocked) this.lockPointer(); // only lock if settings menu is hidden
        });

        // able to click on outside of menu to resume
        const settingsMenu = document.querySelector('#settings-menu');
        if (settingsMenu) {
            settingsMenu.addEventListener('click', (e) => {
                if (e.target === settingsMenu && !this.isLocked) {
                    this.lockPointer();
                }
            });
        }

        const resumeBtn = document.querySelector('#btn-resume');
        if (resumeBtn) {
            resumeBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                if (!this.isLocked) this.lockPointer();
            });
        }

        // stop propagation inside settings menu
        // isolate sliderstoggles from canvas click listeners
        const menuContent = document.querySelector('.menu-content');
        if (menuContent) {
            menuContent.addEventListener('click', (e) => e.stopPropagation());
            menuContent.addEventListener('mousedown', (e) => e.stopPropagation());
        }

        // prevent right-click context menu from popping up when ads
        this.canvas.addEventListener('contextmenu', (e) => e.preventDefault());

        // Tracking lock changes
        document.addEventListener('pointerlockchange', () => {
            this.isLocked = (document.pointerLockElement === this.canvas);
        });

        // Window events
        window.addEventListener('keydown', (e) => this.onKeyDown(e));
        window.addEventListener('keyup', (e) => this.onKeyUp(e));
        window.addEventListener('mousemove', (e) => this.onMouseMove(e));

        // Mouse events
        this.canvas.addEventListener('mousedown', (e) => this.onMouseDown(e));
    }

    lockPointer() {
        if (!this.isLocked) {
            const promise = this.canvas.requestPointerLock();
            // check for pointer lock promise
            if (promise && typeof promise.catch === 'function') {
                // catch pointer lock error
                promise.catch((error) => {
                    console.warn("Pointer lock bs, cooldown.", error.message);
                });
            }
        }
    }
    // hard reset, prevent input desync when opening menu
    resetKeys() {
        for (let key in this.state) this.state[key] = false;
        for (let key in this.triggers) this.triggers[key] = false;
        this.mouseDelta.x = 0;
        this.mouseDelta.y = 0;
    }

    onMouseMove(e) {
        if (!this.isLocked) return;

        // Accumulate mouse movement deltas across frame ticks
        this.mouseDelta.x += e.movementX;
        this.mouseDelta.y += e.movementY;
    }

    onMouseDown(e) {
        if (!this.isLocked) return;
        if (e.button === 0) this.triggers.fire = true;
        if (e.button === 2) this.state.ads = true;
    }

    onMouseUp(e) {
        if (e.button === 2) this.state.ads = false;
    }

    onKeyDown(e) {
        if (!this.isLocked) return;

        switch (e.code) {
            case 'KeyW': case 'ArrowUp':    this.state.forward = true; break;
            case 'KeyS': case 'ArrowDown':  this.state.backward = true; break;
            case 'KeyA': case 'ArrowLeft':  this.state.left = true; break;
            case 'KeyD': case 'ArrowRight': this.state.right = true; break;
            case 'Space':                   this.state.jump = true; break;
            case 'KeyC':
                this.state.crouch = true;
                if (!e.repeat) this.triggers.crouch = true;
                break;
            case 'ShiftLeft':
                this.state.sprint = true;
                if (!e.repeat) this.triggers.sprint = true;
                break;
            case 'KeyV': 
                if (!e.repeat) this.triggers.noclip = true;
                break;
        }
    }

    onKeyUp(e) {
        switch (e.code) {
            case 'KeyW': case 'ArrowUp':    this.state.forward = false; break;
            case 'KeyS': case 'ArrowDown':  this.state.backward = false; break;
            case 'KeyA': case 'ArrowLeft':  this.state.left = false; break;
            case 'KeyD': case 'ArrowRight': this.state.right = false; break;
            case 'Space':                   this.state.jump = false; break;
            case 'KeyC':                    this.state.crouch = false; break;
            case 'ShiftLeft':               this.state.sprint = false; break;
        }
    }

    // Flush mouse accumulation buffers at the end of logic execution
    flush() {
        this.mouseDelta.x = 0;
        this.mouseDelta.y = 0;
        for (let key in this.triggers) this.triggers[key] = false;
    }
}