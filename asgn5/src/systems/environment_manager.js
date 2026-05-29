import * as THREE from 'three';
import { VoxelObject } from '../voxel_objects.js';

export class EnvironmentManager {
    constructor() {
        this.walls = []; // Non-voxel solids
        this.voxelObjects = [];
        this.currentMap = '';
    }

    loadMap(mapType) {
        // Prevent map rebuilds if we are already in the correct map
        if (this.currentMap === mapType) return;
        this.currentMap = mapType;
        this.walls = [];
        this.voxelObjects = [];
        
        if (mapType === 'static') {
            this.addWall('base_floor', new THREE.Vector3(0, -0.5, 0), new THREE.Vector3(50, 1, 50), false);

            this.addWall('wall_north', new THREE.Vector3(0, 2, -25), new THREE.Vector3(50, 4, 1), false);
            this.addWall('wall_south', new THREE.Vector3(0, 2, 25), new THREE.Vector3(50, 4, 1), false);
            this.addWall('wall_east', new THREE.Vector3(25, 2, 0), new THREE.Vector3(1, 4, 50), false);
            this.addWall('wall_west', new THREE.Vector3(-25, 2, 0), new THREE.Vector3(1, 4, 50), false);

            this.addVoxelObject('voxel_platform_center', new THREE.Vector3(0, 3.75, -10), new THREE.Vector3(40, 2, 40), 0.25, true);

            this.addSlope('ramp_center', new THREE.Vector3(0, 1.9, -3.1), new THREE.Vector3(3, 4, 4), -1, -5, 0, 4, 'Z');

        } else if (mapType === 'moving') {
            this.addWall('base_floor', new THREE.Vector3(0, -0.5, 0), new THREE.Vector3(50, 1, 50), false);
            this.addWall('wall_north', new THREE.Vector3(0, 2, -25), new THREE.Vector3(50, 4, 1), false);
            this.addWall('wall_south', new THREE.Vector3(0, 2, 25), new THREE.Vector3(50, 4, 1), false);
            this.addWall('wall_east', new THREE.Vector3(25, 2, 0), new THREE.Vector3(1, 4, 50), false);
            this.addWall('wall_west', new THREE.Vector3(-25, 2, 0), new THREE.Vector3(1, 4, 50), false);

            this.addVoxelObject('voxel_center_block', new THREE.Vector3(0, 3, -10), new THREE.Vector3(8, 12, 8), 0.5, true);
        }
    }

    addVoxelObject(id, position, dimensions, voxelScale = 0.5, isDestructible = true) {
        const voxelObj = new VoxelObject(id, position, dimensions, voxelScale, isDestructible);
        this.voxelObjects.push(voxelObj);

        // Also register its broad-phase bounding box inside our physical walls list
        // keep target spawing overlap checks
        this.walls.push({
            id,
            boundingBox: voxelObj.boundingBox,
            position: position.clone(),
            size: new THREE.Vector3(dimensions.x * voxelScale, dimensions.y * voxelScale, dimensions.z * voxelScale),
            colliderType: 'VOXEL_GRID',
            isDestructible,
            voxelRef: voxelObj
        });
    }

    addWall(id, position, dimensions, isDestructible = false) {
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
            isDestructible              // Destruction tag
        });
    }

    addSlope(id, position, size, startCoord, endCoord, yStart, yEnd, slopeAxis = 'Z') {
        const halfSize = size.clone().multiplyScalar(0.5);
        const min = position.clone().sub(halfSize);
        const max = position.clone().add(halfSize);
        const box = new THREE.Box3(min, max);

        const slopeObject = {
            id,
            boundingBox: box,
            position: position.clone(),
            size: size.clone(),
            colliderType: 'SLOPE',
            yStart,
            yEnd,
            slopeAxis,
            isDestructible: false
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
}