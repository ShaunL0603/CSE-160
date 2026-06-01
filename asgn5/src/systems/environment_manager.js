import * as THREE from 'three';
import { VoxelObject } from './voxel_objects.js';

export class EnvironmentManager {
    constructor() {
        this.walls = []; // Non-voxel solids
        this.voxelObjects = [];
        this.targetSpawnZones = [];
        this.mapBounds = new THREE.Box3();
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
        this.mapBounds.makeEmpty();
        this.models = []

        // Forest by Poly by Google [CC-BY] via Poly Pizza
        this.addModel('forest', 'forest_glb', 
            new THREE.Vector3(0, 5, -70), new THREE.Vector3(20, 20, 20), 
            new THREE.Euler(0, 0, 0), assets,
            new THREE.Vector3(0, 0, 0), false
        );
        this.addModel('forest2', 'forest_glb', 
            new THREE.Vector3(50, 5, -30), new THREE.Vector3(20, 20, 20), 
            new THREE.Euler(0, 3 * Math.PI * 0.25, 0), assets,
            new THREE.Vector3(0, 0, 0), false
        );
        this.addModel('forest3', 'forest_glb', 
            new THREE.Vector3(-50, 5, -30), new THREE.Vector3(20, 20, 20), 
            new THREE.Euler(0, Math.PI * 0.25, 0), assets,
            new THREE.Vector3(0, 0, 0), false
        );
        this.addModel('forest4', 'forest_glb', 
            new THREE.Vector3(0, 5, 70), new THREE.Vector3(20, 20, 20), 
            new THREE.Euler(0, 0, 0), assets,
            new THREE.Vector3(0, 0, 0), false
        );
        this.addModel('forest5', 'forest_glb', 
            new THREE.Vector3(50, 5, 30), new THREE.Vector3(20, 20, 20), 
            new THREE.Euler(0, 7 * Math.PI * 0.25, 0), assets,
            new THREE.Vector3(0, 0, 0), false
        );
        this.addModel('forest6', 'forest_glb', 
            new THREE.Vector3(-50, 5, 30), new THREE.Vector3(20, 20, 20), 
            new THREE.Euler(0, 5 * Math.PI * 0.25, 0), assets,
            new THREE.Vector3(0, 0, 0), false
        );
        
        if (mapType === 'static') {
            // bounding objects
            this.addWall('base_floor', new THREE.Vector3(0, -0.5, 0), new THREE.Vector3(50, 1, 70), false, 'terrain_texture');
            this.addWall('wall_north', new THREE.Vector3(0, 2, -35), new THREE.Vector3(50, 4, 1), false, 'wall_texture');
            this.addWall('wall_south', new THREE.Vector3(0, 2, 35), new THREE.Vector3(50, 4, 1), false, 'wall_texture');
            this.addWall('wall_east', new THREE.Vector3(25, 2, 0), new THREE.Vector3(1, 4, 70), false, 'wall_texture');
            this.addWall('wall_west', new THREE.Vector3(-25, 2, 0), new THREE.Vector3(1, 4, 70), false, 'wall_texture');

            // --- Map objects ---
            this.addWall('solid_east_wall', new THREE.Vector3(17.5, 5, 0), new THREE.Vector3(1.01, 10.01, 30.01), false);
            this.addWall('solid_west_wall', new THREE.Vector3(-17.5, 5, 0), new THREE.Vector3(1.01, 10.01, 30.01), false);
            this.addVoxelObject('voxel_wall_north', new THREE.Vector3(0, 5, -21.5), new THREE.Vector3(36, 10, 1), densityString, true);
            // first floor main platform
            this.addVoxelObject('voxel_platform_center', new THREE.Vector3(0, 4.5, -10), new THREE.Vector3(10, 1, 10), densityString, true,);
            this.addSlope('ramp_center', new THREE.Vector3(0, 2.5, -2.75), new THREE.Vector3(3, 5.0, 5.0), -0.5, -5, 0, 5.0);
            this.addWall('platform_left_connector', new THREE.Vector3(-9, 4.75, -10), new THREE.Vector3(8, 0.5, 4), false, 'wood_floor_texture');
            this.addWall('platform_right_connector', new THREE.Vector3(9, 4.75, -10), new THREE.Vector3(8, 0.5, 4), false, 'wood_floor_texture');

            // side walkways
            this.addVoxelObject('voxel_wall_left', new THREE.Vector3(-12, 1, 0), new THREE.Vector3(0.5, 2, 10), densityString, true);
            this.addVoxelObject('voxel_walkway_left', new THREE.Vector3(-15, 4.5, 0), new THREE.Vector3(4, 1, 30), densityString, true,);
            this.addSlope('ramp_left', new THREE.Vector3(-15, 2.5, 17.5), new THREE.Vector3(3, 5.0, 5.0), 20, 15, 0, 5.0);
            // ramps: coords so physical and collision match
            // start and end Coord = position.z +- (size.z / 2)
            // y start and end = position.y +- (size.y / 2)
            this.addSlope('ramp_second_floor_left', new THREE.Vector3(-11, 7.5, -14.5), new THREE.Vector3(3, 5.0, 5.0), -12, -17, 3.5, 8.5);
            this.addWall('ramp_base2', new THREE.Vector3(-11, 4.6, -14.5), new THREE.Vector3(4.2, 1, 5.2), false, 'wood_floor_texture');

            this.addVoxelObject('voxel_walkway_right', new THREE.Vector3(15, 4.5, 0), new THREE.Vector3(4, 1, 30), densityString, true,);
            this.addSlope('ramp_right', new THREE.Vector3(15, 2.5, 17.5), new THREE.Vector3(3, 5.0, 5.0), 20, 15, 0, 5.0);
            this.addSlope('ramp_second_floor_right', new THREE.Vector3(11, 7.5, -14.5), new THREE.Vector3(3, 5.0, 5.0), -12, -17, 3.5, 8.5);
            this.addWall('ramp_base1', new THREE.Vector3(11, 4.6, -14.5), new THREE.Vector3(4.2, 1, 5.2), false, 'wood_floor_texture');

            // upper floor platforms
            this.addWall('platform_top_north', new THREE.Vector3(0, 9.75, -19), new THREE.Vector3(36, 0.5, 4), false, 'wood_floor_texture');
            this.addWall('platform_top_south', new THREE.Vector3(0, 9.75, 19), new THREE.Vector3(36, 0.5, 4), false, 'wood_floor_texture');
            this.addWall('platform_top_east', new THREE.Vector3(16, 9.75, 0), new THREE.Vector3(4, 0.5, 30), false, 'wood_floor_texture');
            // upper floor, small building
            this.addWall('platform_top_west ', new THREE.Vector3(-16, 9.75, 0), new THREE.Vector3(4, 0.5, 30), false, 'wood_floor_texture');
            this.addWall('floor_upper_platform', new THREE.Vector3(0, 9.75, 4.5), new THREE.Vector3(10, 0.5, 10), false, 'wood_floor_texture');
            this.addWall('roof_upper_platform', new THREE.Vector3(0, 14, 4.5), new THREE.Vector3(10, 0.5, 10), false);
            this.addWall('south_wall_upper_platform', new THREE.Vector3(0, 12, 9.25), new THREE.Vector3(10, 4, 0.5), false);
            this.addWall('east_wall_upper_platform', new THREE.Vector3(4.75, 12, 4.5), new THREE.Vector3(0.5, 4, 10), false);
            this.addWall('west_wall_upper_platform', new THREE.Vector3(-4.75, 12, 4.5), new THREE.Vector3(0.5, 4, 10), false);
            this.addWall('north_doorway_upper_platform', new THREE.Vector3(-3.25, 11.5, -0.25), new THREE.Vector3(3.5, 3, 0.5), false);
            this.addWall('north_doorway2_upper_platform', new THREE.Vector3(3.25, 11.5, -0.25), new THREE.Vector3(3.5, 3, 0.5), false);
            this.addWall('north_doorway3_upper_platform', new THREE.Vector3(0, 13.25, -0.25), new THREE.Vector3(10, 1, 0.5), false);
            
            // Spawning Regions
            this.addTargetSpawnZone(new THREE.Vector3(-4, 5.0, -14), new THREE.Vector3(4, 7, -6), 10);  // center platform
            this.addTargetSpawnZone(new THREE.Vector3(-17, 5, -13), new THREE.Vector3(-13, 7, 14), 5);  // left walkway
            this.addTargetSpawnZone(new THREE.Vector3(-17, 0, -13), new THREE.Vector3(-13, 2, 14), 5);  // base floor left
            this.addTargetSpawnZone(new THREE.Vector3(13, 5, -13), new THREE.Vector3(17, 7, 14), 5);    // right walkway

            this.addModel('witch', 'witch_glb', 
                new THREE.Vector3(3, 11, 2), new THREE.Vector3(1, 1, 1), 
                new THREE.Euler(0, -Math.PI * 0.5, 0), assets,
                new THREE.Vector3(0, -1, 1), false
            );
            this.addModel('bears', 'bears_glb', 
                new THREE.Vector3(-3, 11, 7), new THREE.Vector3(0.25, 0.25, 0.25), 
                new THREE.Euler(0, Math.PI * 0.25, 0), assets,
                new THREE.Vector3(0, -1, 1), false
            );
            
        } else if (mapType === 'moving') {
            // bounding objects
            this.addWall('base_floor', new THREE.Vector3(0, -0.5, 0), new THREE.Vector3(30, 1, 35), false, 'terrain_texture');
            this.addWall('wall_north', new THREE.Vector3(0, 2, -17), new THREE.Vector3(30, 4, 1), false, 'wall_texture');
            this.addWall('wall_south', new THREE.Vector3(0, 2, 17), new THREE.Vector3(30, 4, 1), false, 'wall_texture');
            this.addWall('wall_east', new THREE.Vector3(15.5, 2, 0), new THREE.Vector3(1, 4, 35), false, 'wall_texture');
            this.addWall('wall_west', new THREE.Vector3(-15.5, 2, 0), new THREE.Vector3(1, 4, 35), false, 'wall_texture');

            // map objects
            this.addVoxelObject('voxel_center_block', new THREE.Vector3(0, 3, -10), new THREE.Vector3(4, 6 ,4), densityString, true);
            this.addSlope('ramp_center', new THREE.Vector3(0, 2.5, 10), new THREE.Vector3(3, 5.0, 5.0), 12.5, 7.5, 0, 5.0);
            this.addVoxelObject('voxel_walkway_south', new THREE.Vector3(0, 4.5, 5.5), new THREE.Vector3(16, 1, 4), densityString, true);

            // mvoing targets box boundaries
            this.mapBounds.set(
                new THREE.Vector3(-12, 1.5, -15), // Min X, Y, Z
                new THREE.Vector3(12, 7.5, -5)    // Max X, Y, Z
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

    addSlope(id, position, size, startCoord, endCoord, yStart, yEnd, textureKey = null) {
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
            isDestructible: false,
            textureKey
        };

        slopeObject.zStart = startCoord;
        slopeObject.zEnd = endCoord;

        this.walls.push(slopeObject);

        const wallThickness = 0.5;
        // Left Wall
        this.addWall(
            `${id}_wall_left`, 
            new THREE.Vector3(position.x - (size.x * 0.5 + wallThickness * 0.5), position.y - 0.01, position.z), 
            new THREE.Vector3(wallThickness, size.y, size.z), 
            false
        );
        // Right Wall
        this.addWall(
            `${id}_wall_right`, 
            new THREE.Vector3(position.x + (size.x * 0.5 + wallThickness * 0.5), position.y - 0.01, position.z), 
            new THREE.Vector3(wallThickness, size.y, size.z), 
            false
        );
        // Back Wall
        const highZ = min.z;
        const offsetZ = wallThickness * 0.5;
        this.addWall(
            `${id}_wall_back`,
            new THREE.Vector3(position.x, position.y - 0.7, highZ + offsetZ),
            new THREE.Vector3(size.x + wallThickness * 2, size.y, wallThickness),
            false
        );
    }

    addModel(id, assetKey, position, 
        scale = new THREE.Vector3(1,1,1), rotation = new THREE.Euler(), assets,
        visualOffset = new THREE.Vector3(), hasCollision = true
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
        if (hasCollision) {
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
}