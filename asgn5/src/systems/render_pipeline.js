import * as THREE from 'three';

export class RenderPipeline {
    constructor(canvas) {
        this.canvas = canvas;
        
        this.renderer = new THREE.WebGLRenderer({
            canvas: this.canvas,
            antialias: true,
            powerPreference: "high-performance"
        });
        
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        this.renderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight, false);
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFShadowMap;
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

        this._pos = new THREE.Vector3();
        this._scale = new THREE.Vector3();
        this._quat = new THREE.Quaternion();
        this._matrix = new THREE.Matrix4();
        this._zeroScale = new THREE.Vector3(0, 0, 0); // hide inactive targets

        this.initEnvironment();
        this.initResizeHandler();
    }

    initEnvironment() {
        // Lighting
        const ambient = new THREE.AmbientLight(0xffffff, 0.3);
        this.scene.add(ambient);

        let dirLightX = 25;
        let dirLightY = 20;
        let dirLightZ = 25;
        const dirLight = new THREE.DirectionalLight(0xffffff, 1.4);
        dirLight.position.set(dirLightX, dirLightY, dirLightZ);
        dirLight.target.position.set(0, 0, -5);
        dirLight.castShadow = true;
        // Access the underlying orthographic camera
        const cam = dirLight.shadow.camera;
        // Define the boundaries of the shadow's orthographic view volume
        cam.left = -40;
        cam.right = 40;
        cam.top = 20;
        cam.bottom = -20;
        // Set near and far clipping planes for the shadow
        cam.near = 0.5;
        cam.far = 70;
        // visualize the shadow camera boundaries in scene
        // const helper = new THREE.CameraHelper(cam);
        // this.scene.add(helper);
        this.scene.add(dirLight);
        this.scene.add(dirLight.target);

        const geometry = new THREE.BoxGeometry( 1, 1, 1 );
        const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
        const dirLightCube = new THREE.Mesh( geometry, material );
        dirLightCube.position.set(dirLightX, dirLightY, dirLightZ);
        dirLightCube.scale.set(0.5, 0.5, 0.5);
        this.scene.add( dirLightCube );

        // --- Map 1: Moving Targets ---
        this.mapMoving = new THREE.Group();
        this.mapMoving.visible = true;
        this.scene.add(this.mapMoving);

        // --- Map 2: Static Targets ---
        this.mapStatic = new THREE.Group();
        this.mapStatic.visible = false;
        this.scene.add(this.mapStatic);

        this.wallMeshesGroup = new THREE.Group();
        this.scene.add(this.wallMeshesGroup);
        this.voxelMeshesGroup = new THREE.Group();
        this.scene.add(this.voxelMeshesGroup);

        // 3D models
        this.modelMeshesGroup = new THREE.Group();
        this.scene.add(this.modelMeshesGroup);

        // debug stuff
        this.debugSpawnZonesGroup = new THREE.Group();
        this.scene.add(this.debugSpawnZonesGroup);
        this.debugVoxelChunksGroup = new THREE.Group();
        this.scene.add(this.debugVoxelChunksGroup);

        this.voxelMeshMap = new Map();
        this.currentVisualMap = '';

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

    syncVisualEnvironment(logic, assets) {
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
            // Disopse old voxel objects
            this.voxelMeshesGroup.children.forEach(child => {
                if (child.geometry) child.geometry.dispose();
                if (child.material) child.material.dispose();
            });
            this.voxelMeshesGroup.clear();
            this.voxelMeshMap.clear();
            // Dispose old models
            this.modelMeshesGroup.children.forEach(child => {
                // We don't dispose the geometry/material here because they are shared 
                // from the AssetManager cache! We just remove them from the scene.
                this.modelMeshesGroup.remove(child);
            });
            this.modelMeshesGroup.clear();

            // debug wireframe disposals
            this.debugSpawnZonesGroup.clear();
            this.debugVoxelChunksGroup.clear();

            // Build structural meshes directly from current math constraints
            const walls = logic.environment.walls;
            const wallMaterial = new THREE.MeshPhongMaterial({ 
                color: 0x3e3e4f, 
                shininess: 30
            });

            walls.forEach(wall => {
                if (wall.colliderType === 'AABB' &&  wall.isVisible !== false) { 
                    const geo = new THREE.BoxGeometry(wall.size.x, wall.size.y, wall.size.z);
                    const mesh = new THREE.Mesh(geo, wallMaterial);
                    mesh.position.copy(wall.position);
                    mesh.castShadow = true;
                    mesh.receiveShadow = true;
                    this.wallMeshesGroup.add(mesh);
                }
                else if (wall.colliderType === 'SLOPE') {
                    const isXAxis = wall.slopeAxis === 'X';
                    
                    // Get rise and run along the active axis
                    const run = isXAxis ? Math.abs(wall.xEnd - wall.xStart) : Math.abs(wall.zEnd - wall.zStart);
                    const rise = Math.abs(wall.yEnd - wall.yStart);
                    const length = Math.sqrt(run * run + rise * rise);
                    const thickness = 0.2; 

                    // Orient box dimensions to match the active direction axis
                    const sizeX = isXAxis ? length : wall.size.x;
                    const sizeZ = isXAxis ? wall.size.z : length;

                    const geo = new THREE.BoxGeometry(sizeX, thickness, sizeZ);
                    const mesh = new THREE.Mesh(geo, wallMaterial);
                    mesh.position.copy(wall.position);

                    const angle = Math.atan2(rise, run);
                    
                    // Apply correct visual rotations
                    if (isXAxis) {
                        const rotationDir = (wall.xEnd < wall.xStart) ? -1 : 1;
                        mesh.rotation.z = angle * rotationDir; // Tilt left/right
                    } else {
                        const rotationDir = (wall.zEnd < wall.zStart) ? 1 : -1;
                        mesh.rotation.x = angle * rotationDir; // Tilt front/back
                    }

                    mesh.castShadow = true;
                    mesh.receiveShadow = true;
                    this.wallMeshesGroup.add(mesh);
                }
            });

            // Initialize Chunk Meshes
            const voxelObjects = logic.environment.voxelObjects;
            voxelObjects.forEach(voxelObj => {
                voxelObj.chunks.forEach(chunk => {
                    const geo = new THREE.BufferGeometry();

                    const posAttr = new THREE.BufferAttribute(chunk.positions, 3);
                    const normAttr = new THREE.BufferAttribute(chunk.normals, 3);
                    const colorAttr = new THREE.BufferAttribute(chunk.colors, 3);
                    const uvAttr = new THREE.BufferAttribute(chunk.uvs, 2);

                    posAttr.setUsage(THREE.DynamicDrawUsage);
                    normAttr.setUsage(THREE.DynamicDrawUsage);
                    colorAttr.setUsage(THREE.DynamicDrawUsage);
                    uvAttr.setUsage(THREE.DynamicDrawUsage);

                    geo.setAttribute('position', posAttr);
                    geo.setAttribute('normal', normAttr);
                    geo.setAttribute('color', colorAttr);
                    geo.setAttribute('uv', uvAttr);

                    const indexAttr = new THREE.BufferAttribute(chunk.indices, 1);
                    indexAttr.setUsage(THREE.DynamicDrawUsage);
                    geo.setIndex(indexAttr);
                    
                    // assign our pre-calculated static bounding box and sphere
                    // fix clipping bugs
                    geo.boundingBox = chunk.boundingBox.clone();
                    geo.boundingSphere = new THREE.Sphere();
                    geo.boundingBox.getBoundingSphere(geo.boundingSphere);

                    const mat = new THREE.MeshPhongMaterial({
                        vertexColors: true,
                        shininess: 30,
                        flatShading: true
                    });

                    const mesh = new THREE.Mesh(geo, mat);
                    mesh.castShadow = true;
                    mesh.receiveShadow = true;
                    
                    // All chunks share the master object's world position!
                    mesh.position.copy(voxelObj.position);

                    this.voxelMeshesGroup.add(mesh);
                    
                    // Cache using a unique composite ID
                    const chunkId = `${voxelObj.id}_${chunk.cx}_${chunk.cy}_${chunk.cz}`;
                    this.voxelMeshMap.set(chunkId, mesh);

                    chunk.dirty = true; // Force initial upload

                    // White wireframe for chunk
                    // Translate the Box3 into world space before creating helper
                    const worldBox = chunk.boundingBox.clone().translate(voxelObj.position);
                    const helper = new THREE.Box3Helper(worldBox, 0xffffff);
                    this.debugVoxelChunksGroup.add(helper);
                });
            });

            // Build green wireframe Box3Helpers for all active target spawn zones
            const zones = logic.environment.targetSpawnZones;
            zones.forEach(zone => {
                const helper = new THREE.Box3Helper(zone.boundingBox, 0x00ff00);
                this.debugSpawnZonesGroup.add(helper);
            });

            // initializing model meshes
            const models = logic.environment.models;
            models.forEach(modelDef => {
                // Fetch the pre-loaded model from the AssetManager cache
                const cachedModel = assets.models.get(modelDef.assetKey);
                
                if (cachedModel) {
                    // Clone the model so we can place multiple copies of the same asset
                    const mesh = cachedModel.clone();
                    
                    mesh.position.copy(modelDef.position);
                    mesh.scale.copy(modelDef.scale);
                    mesh.rotation.copy(modelDef.rotation);
                    
                    this.modelMeshesGroup.add(mesh);
                } else {
                    console.warn(`Model asset key '${modelDef.assetKey}' not found in cache.`);
                }
            });
        }

        // Update Dirty Chunks (Runs every frame)
        const voxelObjects = logic.environment.voxelObjects;
        voxelObjects.forEach(voxelObj => {
            voxelObj.chunks.forEach(chunk => {
                if (chunk.dirty) {
                    const chunkId = `${voxelObj.id}_${chunk.cx}_${chunk.cy}_${chunk.cz}`;
                    const mesh = this.voxelMeshMap.get(chunkId);
                    if (!mesh) return;

                    const geo = mesh.geometry;

                    geo.attributes.position.needsUpdate = true;
                    geo.attributes.normal.needsUpdate = true;
                    geo.attributes.color.needsUpdate = true;
                    geo.attributes.uv.needsUpdate = true;
                    geo.index.needsUpdate = true;

                    geo.setDrawRange(0, chunk.exposedIndices);

                    chunk.dirty = false;
                }
            });
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
    render(logic, alpha, assets) {
        const player = logic.player;
        // ensure stable camera (no stuttering), interpolate
        this.camera.position.lerpVectors(player.prevPosition, player.position, alpha);

        // interpolate visual eye height and apply vertical offset
        const currentEyeHeight = THREE.MathUtils.lerp(player.prevEyeHeight, player.prevEyeHeight, alpha);
        this.camera.position.y += (currentEyeHeight - player.radius);

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
        this.syncVisualEnvironment(logic, assets);
        
        // Toggle debug wireframes
        this.debugSpawnZonesGroup.visible = logic.config.debug.showSpawnZones;
        this.debugVoxelChunksGroup.visible = logic.config.debug.showVoxelChunks;

        // synchronize and interpolate targets
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