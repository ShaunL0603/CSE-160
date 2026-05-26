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

        // Pre-allocated variables for instanced mesh matrix generation
        this._pos = new THREE.Vector3();
        this._scale = new THREE.Vector3();
        this._quat = new THREE.Quaternion(); // Identity rotation (no rtoation for spheres)
        this._matrix = new THREE.Matrix4();
        this._zeroScale = new THREE.Vector3(0, 0, 0); // hide inactive targets

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

        // instanced mesh setup
        // match maximum pool capacity (50 targets). Configured in TargetManager
        const targetGeometry = new THREE.SphereGeometry(0.5, 16, 16);
        const targetMaterial = new THREE.MeshPhongMaterial({
            color: 0xff0000,
            shininess: 50
        });

        this.targetMeshInstances = new THREE.InstancedMesh(targetGeometry, targetMaterial, 50);
        this.targetMeshInstances.castShadow = true;
        this.targetMeshInstances.receiveShadow = true;
        this.scene.add(this.targetMeshInstances);
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
        // ensure stable camera (no stuttering), interpolate
        this.camera.position.lerpVectors(player.prevPosition, player.position, alpha);

        // interpolate visual eye height and apply vertical offset
        const currentEyeHeight = THREE.MathUtils.lerp(player.prevEyeHeight, player.prevEyeHeight, alpha);
        this.camera.position.y += currentEyeHeight;

        const currentYaw = THREE.MathUtils.lerp(player.prevYaw, player.yaw, alpha);
        const currentPitch = THREE.MathUtils.lerp(player.prevPitch, player.pitch, alpha);
        this.camera.rotation.set(0, 0, 0);
        this.camera.rotation.y = currentYaw;
        this.camera.rotation.x = currentPitch;

        // FOV interpolation for zoom
        const currentFOV = THREE.MathUtils.lerp(player.prevFOV, player.fov, alpha);
        // only update projection matrix if FOV is changing
        if (Math.abas(this.camera.fov - currentFOV) > 0.01) {
            this.camera.fov = currentFOV;
            this.camera.updateProjectionMatrix();
        }

        const targets = logic.targetManager.targets;
        for (let i = 0; i < targets.length; ++i) {
            const target = targets[i];

            if (target.active) {
                // interpolate target positions, avoid stutter
                this._pos.lerpVectors(target.prevPosition, target.position, alpha);
                this._scale.setScalar(target.scale);
                // combine transforms into instanced allocation matrix
                this._matrix.compose(this._pos, this._quat, this._scale);
            } else {
                // hiding inactive targets
                this._matrix.compose(this._pos.set(0, -999, 0), this._quat, this._zeroScale);
            }

            this.targetMeshInstances.setMatrixAt(i, this._matrix);
        }

        // notify WebGL that instance matrix positions must be sent to GPU
        this.targetMeshInstances.instanceMatrix.needsUpdate = true;

        this.renderer.render(this.scene, this.camera);
    }
}