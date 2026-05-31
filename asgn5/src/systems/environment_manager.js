import * as THREE from 'three';
import { VoxelObject } from './voxel_objects.js';

export class EnvironmentManager {
    constructor() {
        this.walls = []; // Non-voxel solids
        this.voxelObjects = [];
        this.targetSpawnZones = [];
        this.models = [];
        this.currentMap = '';
        this.currentDensity = '';
        this.version = 0;
    }

    loadMap(mapType, assets, densityString = 'normal', force = false) {
        // Prevent map rebuilds if we are already in the correct map
        if (!force && this.currentMap === mapType && this.currentDensity === densityString) return;
        this.currentMap = mapType;
        this.currentDensity = densityString;
        this.version++;
        // clearing old objects
        this.walls = [];
        this.voxelObjects = [];
        this.targetSpawnZones = [];
        this.models = []

        // bounding objects
        this.addWall('base_floor', new THREE.Vector3(0, -0.5, 0), new THREE.Vector3(50, 1, 50), false, 'terrain_texture');
        this.addWall('wall_north', new THREE.Vector3(0, 2, -25), new THREE.Vector3(50, 4, 1), false, 'wall_texture');
        this.addWall('wall_south', new THREE.Vector3(0, 2, 25), new THREE.Vector3(50, 4, 1), false, 'wall_texture');
        this.addWall('wall_east', new THREE.Vector3(25, 2, 0), new THREE.Vector3(1, 4, 50), false, 'wall_texture');
        this.addWall('wall_west', new THREE.Vector3(-25, 2, 0), new THREE.Vector3(1, 4, 50), false, 'wall_texture');

        // Forest by Poly by Google [CC-BY] via Poly Pizza
        this.addModel('forest', 'forest_glb', 
            new THREE.Vector3(0, 5, -50), new THREE.Vector3(20, 20, 20), 
            new THREE.Euler(0, 0, 0), assets,
            new THREE.Vector3(0, 0, 0)
        );
        this.addModel('forest2', 'forest_glb', 
            new THREE.Vector3(50, 5, -30), new THREE.Vector3(20, 20, 20), 
            new THREE.Euler(0, 3 * Math.PI * 0.25, 0), assets,
            new THREE.Vector3(0, 0, 0)
        );
        this.addModel('forest3', 'forest_glb', 
            new THREE.Vector3(-50, 5, -30), new THREE.Vector3(20, 20, 20), 
            new THREE.Euler(0, Math.PI * 0.25, 0), assets,
            new THREE.Vector3(0, 0, 0)
        );
        
        if (mapType === 'static') {
            // map objects
            this.addVoxelObject('voxel_platform_center', new THREE.Vector3(0, 3.5, -10), new THREE.Vector3(10, 1, 10), densityString, true, 'wood_floor_texture');
            this.addSlope('ramp_center', new THREE.Vector3(0, 2.0, -3.1), new THREE.Vector3(3, 4, 4), -1, -5, 0, 4, 'Z');

            // Spawning Regions
            this.addTargetSpawnZone(new THREE.Vector3(-10, 0, -15), new THREE.Vector3(-4, 3, -5), 7);
            this.addTargetSpawnZone(new THREE.Vector3(4, 0, -15), new THREE.Vector3(10, 3, -5), 7);
            this.addTargetSpawnZone(new THREE.Vector3(-4, 4, -14), new THREE.Vector3(4, 7, -6), 6);
        } else if (mapType === 'moving') {
            // map objects
            this.addVoxelObject('voxel_center_block', new THREE.Vector3(0, 3, -10), new THREE.Vector3(4, 6 ,4), densityString, true);
            // this.addVoxelObject('voxel_block', new THREE.Vector3(0, 3, 5), new THREE.Vector3(4, 6, 4), densityString, true);
            this.addModel('witch', 'witch_glb', 
                new THREE.Vector3(0, 1, -1), new THREE.Vector3(1, 1, 1), 
                new THREE.Euler(0, 0, 0), assets,
                new THREE.Vector3(0, -1, 1)
            );
        }
    }

    addTargetSpawnZone(min, max, maxTargets) {
        this.targetSpawnZones.push({
            boundingBox: new THREE.Box3(min, max),
            maxTargets
        });
    }

    addVoxelObject(id, position, physicalSize, density, isDestructible = true, textureKey = null) {
        const voxelObj = new VoxelObject(id, position, physicalSize, density, isDestructible, textureKey);
        this.voxelObjects.push(voxelObj);

        // Also register its broad-phase bounding box inside our physical walls list
        // keep target spawing overlap checks
        const realScale = voxelObj.voxelScale;
        this.walls.push({
            id,
            boundingBox: voxelObj.boundingBox,
            position: position.clone(),
            size: new THREE.Vector3(voxelObj.dimensions.x * realScale, voxelObj.dimensions.y * realScale, voxelObj.dimensions.z * realScale),
            colliderType: 'VOXEL_GRID',
            isDestructible,
            voxelRef: voxelObj,
            textureKey
        });
    }

    addWall(id, position, dimensions, isDestructible = false, textureKey = null) {
        // Build the physical bounding box
        const halfSize = dimensions.clone().multiplyScalar(0.5);
        const min = position.clone().sub(halfSize);
        const max = position.clone().add(halfSize);
        const box = new THREE.Box3(min, max);

        // tagging structure
        this.walls.push({
            id,
            boundingBox: box,
            position: position.clone(), 
            size: dimensions.clone(), 
            colliderType: 'AABB',       // Physics routing instruction
            isDestructible,             // Destruction tag
            textureKey
        });
    }

    addSlope(id, position, size, startCoord, endCoord, yStart, yEnd, slopeAxis = 'Z', textureKey = null) {
        const halfSize = size.clone().multiplyScalar(0.5);
        const min = position.clone().sub(halfSize);
        const max = position.clone().add(halfSize);
        const box = new THREE.Box3(min, max);

        // correct bounding box to sync with visual slope
        const isUpwards = yEnd >= yStart;
        const physicalYStart = isUpwards ? min.y : max.y;
        const physicalYEnd = isUpwards ? max.y : min.y;

        const slopeObject = {
            id,
            boundingBox: box,
            position: position.clone(),
            size: size.clone(),
            colliderType: 'SLOPE',
            yStart: physicalYStart + 0.25,
            yEnd: physicalYEnd + 0.25,
            slopeAxis,
            isDestructible: false,
            textureKey
        };

        if (slopeAxis === 'X') {
            slopeObject.xStart = startCoord;
            slopeObject.xEnd = endCoord;
        } else {
            slopeObject.zStart = startCoord;
            slopeObject.zEnd = endCoord;
        }

        this.walls.push(slopeObject);
    }

    addModel(id, assetKey, position, 
        scale = new THREE.Vector3(1,1,1), rotation = new THREE.Euler(), assets,
        visualOffset = new THREE.Vector3()
    ) {
        if (!assets) {
            console.error("AssetManager must be passed to addModel to calculate physics bounds.");
            return;
        }
        const cachedModel = assets.models.get(assetKey);
        if (!cachedModel) {
            console.warn(`Model '${assetKey}' not found in cache. Physics bounds cannot be generated.`);
            return;
        }

        // Store visual placement data for the RenderPipeline
        this.models.push({
            id,
            assetKey,
            position: position.clone(),
            scale: scale.clone(),
            rotation: rotation.clone(),
            visualOffset: visualOffset.clone()
        });

        // Generate a hit box for model
        // Create a temporary clone to apply transforms without affecting the cached original
        const tempObj = cachedModel.model.clone();
        tempObj.position.copy(position);
        tempObj.scale.copy(scale);
        tempObj.rotation.copy(rotation);
        // Force Three.js to compute the world matrices for the transformed object
        tempObj.updateMatrixWorld(true);
        // Automatically wrap a bounding box around the complex geometry
        const box = new THREE.Box3().setFromObject(tempObj);
        // Calculate the resulting size for reference
        const size = new THREE.Vector3();
        box.getSize(size);
        // Register auto-calculated box as a solid wall in the physics engine
        this.walls.push({
            id: `${id}_physics`,
            boundingBox: box,
            position: position.clone(), 
            size: size, 
            colliderType: 'AABB',
            isDestructible: false,
            isVisible: false
        });
    }
}