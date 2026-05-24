import * as THREE from 'three';

export class RenderPipeline {
    constructor(canvas) {
        this.canvas = canvas;
        
        // Standard high-performance WebGL context initialization
        this.renderer = new THREE.WebGLRenderer({
            canvas: this.canvas,
            antialias: true,
            powerPreference: "high-performance"
        });
        
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        this.renderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight, false);
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFShadowMap; // Optimized PCF
        this.renderer.outputColorSpace = THREE.SRGBColorSpace;

        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0x0a0a0e);

        // Perspective camera configuration
        const fov = 75;
        const aspect = this.canvas.clientWidth / this.canvas.clientHeight;
        const near = 0.1;
        const far = 1000;
        this.camera = new THREE.PerspectiveCamera(fov, aspect, near, far);

        this.camera.rotation.order = 'YXZ';

        this.initEnvironment();
        this.initResizeHandler();
    }

    initEnvironment() {
        // Lighting
        const ambient = new THREE.AmbientLight(0xffffff, 0.4);
        this.scene.add(ambient);

        const dirLight = new THREE.DirectionalLight(0xffffff, 1.2);
        dirLight.position.set(5, 10, 7);
        dirLight.castShadow = true;
        this.scene.add(dirLight);

        // Grid platform boundary
        const grid = new THREE.GridHelper(50, 50, 0x44aa88, 0x222228);
        grid.position.y = -0.01; // Slanted offset to avoid z-fighting
        this.scene.add(grid);

        // Mock Target Mesh to visual show interpolation of positions
        const geometry = new THREE.BoxGeometry(1, 1, 1);
        const material = new THREE.MeshPhongMaterial({ color: 0x44aa88 });
        this.testBox = new THREE.Mesh(geometry, material);
        this.testBox.position.set(0, 0.5, -3);
        this.scene.add(this.testBox);
    }

    initResizeHandler() {
        window.addEventListener('resize', () => {
            const width = window.innerWidth;
            const height = window.innerHeight;

            this.camera.aspect = width / height;
            this.camera.updateProjectionMatrix();

            this.renderer.setSize(width, height);
        });
    }

    // Renders the visual frame, interpolating the logic states via the calculated alpha
    render(logic, alpha) {
        const player = logic.player;

        this.camera.position.lerpVectors(player.prevPosition, player.position, alpha);

        const currentYaw = THREE.MathUtils.lerp(player.prevYaw, player.yaw, alpha);
        const currentPitch = THREE.MathUtils.lerp(player.prevPitch, player.pitch, alpha);

        this.camera.rotation.set(0, 0, 0);
        this.camera.rotation.y = currentYaw;
        this.camera.rotation.x = currentPitch;

        this.testBox.rotation.y += 0.01;

        this.renderer.render(this.scene, this.camera);
    }
}