import * as THREE from 'three';

export class VoxelObject {
    constructor(id, position, dimensions, voxelScale = 0.5, isDestructible = true) {
        this.id = id;
        this.position = position.clone();      // World center of the object
        this.dimensions = dimensions.clone();  // Voxel dimensions (e.g., width, height, depth)
        this.voxelScale = voxelScale;          // Size of one individual voxel block
        this.isDestructible = isDestructible;
        this.dirty = true;                     // Marks if rendering buffers need a rebuild

        this.totalVoxels = this.dimensions.x * this.dimensions.y * this.dimensions.z;

        // Flat array maps (1 = Solid, 0 = Empty)
        this.data = new Uint8Array(this.totalVoxels);
        this.data.fill(1); // Set all voxels to solid initially

        // Pre-allocated flat array for static voxel colors
        this.voxelColors = new Float32Array(this.totalVoxels * 3);

        // Max possible vertices/indices occurs if every single voxel is isolated in space
        const maxVertices = this.totalVoxels * 24; // 6 faces * 4 vertices per face
        const maxIndices = this.totalVoxels * 36;  // 6 faces * 6 indices per face

        this.positions = new Float32Array(maxVertices * 3);
        this.normals = new Float32Array(maxVertices * 3);
        this.colors = new Float32Array(maxVertices * 3);
        this.uvs = new Float32Array(maxVertices * 2);
        this.indices = new Uint32Array(maxIndices);

        this.exposedVertices = 0;
        this.exposedIndices = 0;

        this.boundingBox = new THREE.Box3();

        // Initialization
        this.initColors();
        this.rebuildMeshBuffers();
        this.calculateAABB();
    }

    getIndex(x, y, z) {
        return x + (y * this.dimensions.x) + (z * this.dimensions.x * this.dimensions.y);
    }

    getCoordinates(index) {
        const area = this.dimensions.x * this.dimensions.y;
        const z = Math.floor(index / area);
        const y = Math.floor((index % area) / this.dimensions.x);
        const x = index % this.dimensions.x;
        return { x, y, z };
    }

    isSolid(x, y, z) {
        if (x < 0 || x >= this.dimensions.x ||
            y < 0 || y >= this.dimensions.y ||
            z < 0 || z >= this.dimensions.z) {
            return false;
        }
        return this.data[this.getIndex(x, y, z)] === 1;
    }

    initColors() {
        // Procedurally generates vaporwave shades per voxel block
        for (let i = 0; i < this.totalVoxels; i++) {
            this.voxelColors[i * 3] = 0.2 + 0.4 * Math.random();     // R
            this.voxelColors[i * 3 + 1] = 0.3 + 0.4 * Math.random(); // G
            this.voxelColors[i * 3 + 2] = 0.6 + 0.4 * Math.random(); // B
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

    // Face-Culling Meshing Algorithm
    rebuildMeshBuffers() {
        const s = this.voxelScale;
        const { x: w, y: h, z: d } = this.dimensions;
        const halfS = s * 0.5;

        let vCount = 0;
        let iCount = 0;

        // Definition of the 6 cube faces (Offsets, Normals, and Vertex Positions)
        const faces = [
            { dir: [-1, 0, 0], norm: [-1, 0, 0], verts: [
                [-halfS, -halfS, -halfS],
                [-halfS, -halfS,  halfS],
                [-halfS,  halfS,  halfS],
                [-halfS,  halfS, -halfS]
            ]},
            { dir: [1, 0, 0], norm: [1, 0, 0], verts: [
                [halfS, -halfS,  halfS],
                [halfS, -halfS, -halfS],
                [halfS,  halfS, -halfS],
                [halfS,  halfS,  halfS]
            ]},
            { dir: [0, -1, 0], norm: [0, -1, 0], verts: [
                [-halfS, -halfS, -halfS],
                [ halfS, -halfS, -halfS],
                [ halfS, -halfS,  halfS],
                [-halfS, -halfS,  halfS]
            ]},
            { dir: [0, 1, 0], norm: [0, 1, 0], verts: [
                [-halfS,  halfS,  halfS],
                [ halfS,  halfS,  halfS],
                [ halfS,  halfS, -halfS],
                [-halfS,  halfS, -halfS]
            ]},
            { dir: [0, 0, -1], norm: [0, 0, -1], verts: [
                [ halfS, -halfS, -halfS],
                [-halfS, -halfS, -halfS],
                [-halfS,  halfS, -halfS],
                [ halfS,  halfS, -halfS]
            ]},
            { dir: [0, 0, 1], norm: [0, 0, 1], verts: [
                [-halfS, -halfS,  halfS],
                [ halfS, -halfS,  halfS],
                [ halfS,  halfS,  halfS],
                [-halfS,  halfS,  halfS]
            ]}
        ];

        for (let x = 0; x < w; x++) {
            for (let y = 0; y < h; y++) {
                for (let z = 0; z < d; z++) {
                    const idx = this.getIndex(x, y, z);
                    if (this.data[idx] === 0) continue; // Skip empty voxels

                    // World-space center of this specific voxel
                    const lx = (x - (w - 1) * 0.5) * s;
                    const ly = (y - (h - 1) * 0.5) * s;
                    const lz = (z - (d - 1) * 0.5) * s;
                    const wx = this.position.x + lx;
                    const wy = this.position.y + ly;
                    const wz = this.position.z + lz;

                    // Get pre-assigned color for this voxel block
                    const r = this.voxelColors[idx * 3];
                    const g = this.voxelColors[idx * 3 + 1];
                    const b = this.voxelColors[idx * 3 + 2];

                    // Check all 6 adjacent directions
                    for (let f = 0; f < 6; f++) {
                        const face = faces[f];
                        const nx = x + face.dir[0];
                        const ny = y + face.dir[1];
                        const nz = z + face.dir[2];

                        // Face Culling
                        if (!this.isSolid(nx, ny, nz)) {
                            const vStart = vCount;

                            // Write 4 vertices directly into arrays
                            for (let v = 0; v < 4; v++) {
                                const vIdx = (vStart + v) * 3;
                                const uvIdx = (vStart + v) * 2;
                                // Position
                                this.positions[vIdx] = wx + face.verts[v][0];
                                this.positions[vIdx + 1] = wy + face.verts[v][1];
                                this.positions[vIdx + 2] = wz + face.verts[v][2];
                                // Normal
                                this.normals[vIdx] = face.norm[0];
                                this.normals[vIdx + 1] = face.norm[1];
                                this.normals[vIdx + 2] = face.norm[2];
                                // Color
                                this.colors[vIdx] = r;
                                this.colors[vIdx + 1] = g;
                                this.colors[vIdx + 2] = b;
                                // UV Coordinates (Standard Quad mapping)
                                if (v === 0) { this.uvs[uvIdx] = 0; this.uvs[uvIdx + 1] = 0; }
                                else if (v === 1) { this.uvs[uvIdx] = 1; this.uvs[uvIdx + 1] = 0; }
                                else if (v === 2) { this.uvs[uvIdx] = 1; this.uvs[uvIdx + 1] = 1; }
                                else if (v === 3) { this.uvs[uvIdx] = 0; this.uvs[uvIdx + 1] = 1; }
                            }

                            // Write 6 indices (2 triangles) directly into index array
                            const iIdx = iCount;
                            this.indices[iIdx] = vStart;
                            this.indices[iIdx + 1] = vStart + 1;
                            this.indices[iIdx + 2] = vStart + 2;
                            this.indices[iIdx + 3] = vStart;
                            this.indices[iIdx + 4] = vStart + 2;
                            this.indices[iIdx + 5] = vStart + 3;

                            vCount += 4;
                            iCount += 6;
                        }
                    }
                }
            }
        }

        this.exposedVertices = vCount;
        this.exposedIndices = iCount;
    }

    applyExplosion(localPoint, radius) {
        const s = this.voxelScale;
        const { x: w, y: h, z: d } = this.dimensions;

        const offsetScalarX = (w - 1) * 0.5;
        const cx = Math.round(localPoint.x / s + offsetScalarX);
        
        const offsetScalarY = (h - 1) * 0.5;
        const cy = Math.round(localPoint.y / s + offsetScalarY);

        const offsetScalarZ = (d - 1) * 0.5;
        const cz = Math.round(localPoint.z / s + offsetScalarZ);

        const voxelRadius = Math.ceil(radius / s);

        const minI = Math.max(0, cx - voxelRadius);
        const maxI = Math.min(w - 1, cx + voxelRadius);

        const minJ = Math.max(0, cy - voxelRadius);
        const maxJ = Math.min(h - 1, cy + voxelRadius);

        const minK = Math.max(0, cz - voxelRadius);
        const maxK = Math.min(d - 1, cz + voxelRadius);

        let destroyedAny = false;
        const radiusSq = radius * radius;

        for (let x = minI; x <= maxI; x++) {
            for (let y = minJ; y <= maxJ; y++) {
                for (let z = minK; z <= maxK; z++) {
                    const idx = this.getIndex(x, y, z);
                    if (this.data[idx] === 0) continue; 

                    const lx = (x - (w - 1) * 0.5) * s;
                    const ly = (y - (h - 1) * 0.5) * s;
                    const lz = (z - (d - 1) * 0.5) * s;

                    const dx = lx - localPoint.x;
                    const dy = ly - localPoint.y;
                    const dz = lz - localPoint.z;
                    const distSq = dx * dx + dy * dy + dz * dz;

                    if (distSq <= radiusSq) {
                        this.data[idx] = 0;
                        destroyedAny = true;
                    }
                }
            }
        }

        if (destroyedAny) {
            // Re-mesh the flat arrays on the CPU instantly
            this.rebuildMeshBuffers();
            this.dirty = true; // Flag the renderer to upload the updated buffers
        }

        return destroyedAny;
    }
}