import * as THREE from 'three';

export class EnvironmentManager {
    constructor() {
        this.walls = []; // Array of physical AABB definitions
        this.currentMap = '';
    }

    loadMap(mapType) {
        // Prevent map rebuilds if we are already in the correct map
        if (this.currentMap === mapType) return;
        this.currentMap = mapType;
        this.walls = [];

        if (mapType === 'static') {
            // Static Target Map: Solid floor with two tall pillars (temp)
            this.addWall('pillar_left', new THREE.Vector3(-6, 4, -10), new THREE.Vector3(2, 8, 2), false);
            this.addWall('pillar_right', new THREE.Vector3(6, 4, -10), new THREE.Vector3(2, 8, 2), false);
        } else if (mapType === 'moving') {
            // Moving Target Map: Grid with a central block obstacle to navigate around (temp)
            this.addWall('center_block', new THREE.Vector3(0, 3, -10), new THREE.Vector3(4, 6, 4), false);
        }
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