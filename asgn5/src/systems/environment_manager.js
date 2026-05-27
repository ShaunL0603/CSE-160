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
            // Static Target Map: Solid floor with two tall pillars (temp)
            this.addVoxelObject('voxel_pillar_left', new THREE.Vector3(-6, 4, -10), new THREE.Vector3(4, 16, 4), 0.5, true);
            this.addVoxelObject('voxel_pillar_right', new THREE.Vector3(6, 4, -10), new THREE.Vector3(4, 16, 4), 0.5, true);
        } else if (mapType === 'moving') {
            // Moving Target Map: Grid with a central block obstacle to navigate around (temp)
            this.addVoxelObject('voxel_center_block', new THREE.Vector3(0, 6, -10), new THREE.Vector3(16, 24, 16), 0.5, true);
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

    addWall(id, position, size, isDestructible = false) {
        // Build the physical bounding box
        const halfSize = size.clone().multiplyScalar(0.5);
        const min = position.clone().sub(halfSize);
        const max = position.clone().add(halfSize);
        const box = new THREE.Box3(min, max);

        // tagging structure
        this.walls.push({
            id,
            boundingBox: box,
            position: position.clone(), 
            size: size.clone(), 
            colliderType: 'AABB',       // Physics routing instruction
            isDestructible              // Destruction tag
        });
    }
}