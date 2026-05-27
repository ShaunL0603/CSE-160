import * as THREE from 'three';

export class VoxelObject {
    constructor(id, position, dimensions, voxelScale = 0.5, isDestructible = true) {
        this.id = id;
        this.position = position.clone();      // World center of the object
        this.dimensions = dimensions.clone();  // Voxel dimensions (e.g., width, height, depth)
        this.voxelScale = voxelScale;          // Size of one individual voxel block
        this.isDestructible = isDestructible;

        this.totalVoxels = this.dimensions.x * this.dimensions.y * this.dimensions.z;

        // Flat array maps (1 = Solid, 0 = Empty)
        this.data = new Uint8Array(this.totalVoxels);
        this.data.fill(1); // Set all voxels to solid initially

        // Visibility array (0 = Empty, 1 = Visible Surface, 2 = Culled Interior)
        this.visibilityData = new Uint8Array(this.totalVoxels);

        // Preallocated flat RGB Float32Array for instant GPU color copies
        this.colors = new Float32Array(this.totalVoxels * 3);

        this.boundingBox = new THREE.Box3();

        // Initialization
        this.initColors();
        this.computeVisibility();
        this.calculateAABB();
    }

    // Mathematical translation: Converts 3D grid coords to 1D flat array index
    getIndex(x, y, z) {
        return x + (y * this.dimensions.x) + (z * this.dimensions.x * this.dimensions.y);
    }

    // Mathematical translation: Converts 1D flat array index back to 3D grid coords
    getCoordinates(index) {
        const area = this.dimensions.x * this.dimensions.y;
        const z = Math.floor(index / area);
        const y = Math.floor((index % area) / this.dimensions.x);
        const x = index % this.dimensions.x;
        return { x, y, z };
    }

    isSolid(x, y, z) {
        // Out of bounds checks
        if (x < 0 || x >= this.dimensions.x ||
            y < 0 || y >= this.dimensions.y ||
            z < 0 || z >= this.dimensions.z) {
            return false;
        }
        return this.data[this.getIndex(x, y, z)] === 1;
    }

    // Interior Culling Algorithm
    isSurrounded(x, y, z) {
        const { x: w, y: h, z: d } = this.dimensions;
        
        // Edge boundary layers always count as unculled surfaces (exposed to air)
        if (x === 0 || x === w - 1 || 
            y === 0 || y === h - 1 || 
            z === 0 || z === d - 1) {
            return false;
        }

        // Checks all 6 adjacent neighbors (Up, Down, North, South, East, West)
        return (
            this.isSolid(x - 1, y, z) &&
            this.isSolid(x + 1, y, z) &&
            this.isSolid(x, y - 1, z) &&
            this.isSolid(x, y + 1, z) &&
            this.isSolid(x, y, z - 1) &&
            this.isSolid(x, y, z + 1)
        );
    }

    computeVisibility() {
        const { x: w, y: h, z: d } = this.dimensions;
        for (let x = 0; x < w; x++) {
            for (let y = 0; y < h; y++) {
                for (let z = 0; z < d; z++) {
                    const idx = this.getIndex(x, y, z);
                    if (this.data[idx] === 0) {
                        this.visibilityData[idx] = 0; // Empty
                    } else {
                        if (this.isSurrounded(x, y, z)) {
                            this.visibilityData[idx] = 2; // Hidden Interior (Culled)
                        } else {
                            this.visibilityData[idx] = 1; // Visible Surface
                        }
                    }
                }
            }
        }
    }

    initColors() {
        // Procedurally generates vaporwave shades to prove multi-color buffer operations
        // temp
        for (let i = 0; i < this.totalVoxels; i++) {
            const r = 0.2 + 0.4 * Math.random();
            const g = 0.3 + 0.4 * Math.random();
            const b = 0.6 + 0.4 * Math.random();
            this.colors[i * 3] = r;
            this.colors[i * 3 + 1] = g;
            this.colors[i * 3 + 2] = b;
        }
    }

    calculateAABB() {
        const halfX = (this.dimensions.x * this.voxelScale) * 0.5;
        const halfY = (this.dimensions.y * this.voxelScale) * 0.5;
        const halfZ = (this.dimensions.z * this.voxelScale) * 0.5;
        
        const min = new THREE.Vector3(this.position.x - halfX, this.position.y - halfY, this.position.z - halfZ);
        const max = new THREE.Vector3(this.position.x + halfX, this.position.y + halfY, this.position.z + halfZ);
        
        this.boundingBox.set(min, max);
    }
}