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

        // --- Map 1: Moving Targets (Grid) ---
        this.mapMoving = new THREE.Group();
        const grid = new THREE.GridHelper(50, 50, 0x44aa88, 0x222228);
        grid.position.y = -0.01; 
        this.mapMoving.add(grid);
        this.mapMoving.visible = true;
        this.scene.add(this.mapMoving);

        // --- Map 2: Static Targets (color cube floor) ---
        this.mapStatic = new THREE.Group();
        const floorGeo = new THREE.BoxGeometry(50, 1, 50);
        const floorMat = new THREE.MeshPhongMaterial({ color: 0x2a2a35 });
        const solidFloor = new THREE.Mesh(floorGeo, floorMat);
        solidFloor.position.y = -0.51;
        solidFloor.receiveShadow = true;
        this.mapStatic.add(solidFloor);
        this.mapStatic.visible = false;
        this.scene.add(this.mapStatic);

        this.wallMeshesGroup = new THREE.Group();
        this.scene.add(this.wallMeshesGroup);

        this.voxelMeshesGroup = new THREE.Group();
        this.scene.add(this.voxelMeshesGroup);
        this.currentVisualMap = '';
        this.voxelMeshMap = new Map();

        // InstancedMesh Setup (Shared across maps)
        const targetGeometry = new THREE.SphereGeometry(0.5, 16, 16);
        const targetMaterial = new THREE.MeshPhongMaterial({
            color: 0xff0000,
            shininess: 50
        });

        this.targetMeshInstances = new THREE.InstancedMesh(targetGeometry, targetMaterial, 100);
        this.targetMeshInstances.castShadow = true;
        this.targetMeshInstances.receiveShadow = true;
        this.scene.add(this.targetMeshInstances);
    }

    syncVisualEnvironment(logic) {
        const mapType = logic.environment.currentMap;
        const mapChanged = this.currentVisualMap !== mapType;

        if (mapChanged) {
            this.currentVisualMap = mapType;

            // Dispose existing wall geometry to avoid memory leaks
            this.wallMeshesGroup.children.forEach(child => {
                if (child.geometry) child.geometry.dispose();
                if (child.material) {
                    if (Array.isArray(child.material)) child.material.forEach(m => m.dispose());
                    else child.material.dispose();
                }
            });
            this.wallMeshesGroup.clear();

            this.voxelMeshesGroup.children.forEach(child => {
                if (child.geometry) child.geometry.dispose();
                if (child.material) child.material.dispose();
            });
            this.voxelMeshesGroup.clear();
            this.voxelMeshMap.clear();

            // Build structural meshes directly from current math constraints
            const walls = logic.environment.walls;
            const wallMaterial = new THREE.MeshPhongMaterial({ 
                color: 0x3e3e4f, 
                shininess: 30
            });

            walls.forEach(wall => {
                if (wall.colliderType === 'AABB') {
                    const geo = new THREE.BoxGeometry(wall.size.x, wall.size.y, wall.size.z);
                    const mesh = new THREE.Mesh(geo, wallMaterial);
                    mesh.position.copy(wall.position);
                    mesh.castShadow = true;
                    mesh.receiveShadow = true;
                    this.wallMeshesGroup.add(mesh);
                }
            });

            // Initialize Voxel InstancedMeshes
            const voxelObjects = logic.environment.voxelObjects;
            voxelObjects.forEach(voxelObj => {
                const s = voxelObj.voxelScale;
                const geo = new THREE.BoxGeometry(1, 1, 1);
                const mat = new THREE.MeshPhongMaterial({ shininess: 30, flatShading: true });
                
                const count = voxelObj.totalVoxels;
                const instMesh = new THREE.InstancedMesh(geo, mat, count);
                instMesh.castShadow = true;
                instMesh.receiveShadow = true;

                this.voxelMeshesGroup.add(instMesh);
                this.voxelMeshMap.set(voxelObj.id, instMesh); // Cache it for fast updates

                voxelObj.dirty = true; // Force an initial matrix build
            });
        }

        // Instantiate and draw compiled VoxelObjects
        const voxelObjects = logic.environment.voxelObjects;
        voxelObjects.forEach(voxelObj => {
            // Only rebuild visual buffers if we load a new map, OR if explosion occurs
            if (voxelObj.dirty) {
                const instMesh = this.voxelMeshMap.get(voxelObj.id);
                if (!instMesh) return;

                const s = voxelObj.voxelScale;
                const count = voxelObj.totalVoxels;

                // Apply colors
                const colorArray = voxelObj.colors;
                const tempColor = new THREE.Color();
                for (let i = 0; i < count; i++) {
                    tempColor.setRGB(colorArray[i * 3], colorArray[i * 3 + 1], colorArray[i * 3 + 2]);
                    instMesh.setColorAt(i, tempColor);
                }
                if (instMesh.instanceColor) instMesh.instanceColor.needsUpdate = true;

                // Update matrix scale transforms with interior culling
                const { x: w, y: h, z: d } = voxelObj.dimensions;
                const wp = voxelObj.position;

                for (let x = 0; x < w; x++) {
                    for (let y = 0; y < h; y++) {
                        for (let z = 0; z < d; z++) {
                            const idx = voxelObj.getIndex(x, y, z);

                            const lx = (x - (w - 1) * 0.5) * s;
                            const ly = (y - (h - 1) * 0.5) * s;
                            const lz = (z - (d - 1) * 0.5) * s;

                            this._pos.set(wp.x + lx, wp.y + ly, wp.z + lz);

                            const vis = voxelObj.visibilityData[idx];
                            if (vis === 1) {
                                this._scale.set(s, s, s); // Surface (Visible)
                            } else {
                                this._scale.set(0, 0, 0); // Empty or Culled (Hidden)
                            }

                            this._matrix.compose(this._pos, this._quat, this._scale);
                            instMesh.setMatrixAt(idx, this._matrix);
                        }
                    }
                }

                instMesh.instanceMatrix.needsUpdate = true;
                voxelObj.dirty = false; // Reset dirty flag
            }
        });
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
        if (Math.abs(this.camera.fov - currentFOV) > 0.01) {
            this.camera.fov = currentFOV;
            this.camera.updateProjectionMatrix();
        }

        const isStaticMap = logic.config.gameplay.mapType === 'static';
        this.mapStatic.visible = isStaticMap;
        this.mapMoving.visible = !isStaticMap;

        // sync visual meshes dynamically
        this.syncVisualEnvironment(logic);

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