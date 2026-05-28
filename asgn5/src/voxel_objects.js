import * as THREE from 'three';

const CHUNK_SIZE = 16; // 16x16x16 voxels per chunk

class VoxelChunk {
    constructor(parent, cx, cy, cz, width, height, depth) {
        this.parent = parent;
        // chunk coordinates
        this.cx = cx;
        this.cy = cy;
        this.cz = cz;
        this.dimensions = { x: width, y: height, z: depth };
        this.totalVoxels = width * height * depth;
        this.dirty = true;

        this.data = new Uint8Array(this.totalVoxels).fill(1);
        this.visibilityData = new Uint8Array(this.totalVoxels);
        this.voxelColors = new Float32Array(this.totalVoxels * 3);

        const maxVertices = this.totalVoxels * 24;
        const maxIndices = this.totalVoxels * 36;

        this.positions = new Float32Array(maxVertices * 3);
        this.normals = new Float32Array(maxVertices * 3);
        this.colors = new Float32Array(maxVertices * 3);
        this.uvs = new Float32Array(maxVertices * 2);
        this.indices = new Uint32Array(maxIndices);

        this.exposedVertices = 0;
        this.exposedIndices = 0;
    }

    getIndex(lx, ly, lz) {
        return lx + (ly * this.dimensions.x) + (lz * this.dimensions.x * this.dimensions.y);
    }

    rebuildMeshBuffers() {
        const s = this.parent.voxelScale;
        const { x: pw, y: ph, z: pd } = this.parent.dimensions;
        const { x: w, y: h, z: d } = this.dimensions; // chunk dimensions
        const halfS = s * 0.5;

        let vCount = 0;
        let iCount = 0;

        // halfS to build the cuber around the (0,0,0) center
        const faces = [
            { dir: [-1, 0, 0], norm: [-1, 0, 0], verts: [[-halfS, -halfS, -halfS], [-halfS, -halfS, halfS], [-halfS, halfS, halfS], [-halfS, halfS, -halfS]] },
            { dir: [1, 0, 0], norm: [1, 0, 0], verts: [[halfS, -halfS, halfS], [halfS, -halfS, -halfS], [halfS, halfS, -halfS], [halfS, halfS, halfS]] },
            { dir: [0, -1, 0], norm: [0, -1, 0], verts: [[-halfS, -halfS, -halfS], [halfS, -halfS, -halfS], [halfS, -halfS, halfS], [-halfS, -halfS, halfS]] },
            { dir: [0, 1, 0], norm: [0, 1, 0], verts: [[-halfS, halfS, halfS], [halfS, halfS, halfS], [halfS, halfS, -halfS], [-halfS, halfS, -halfS]] },
            { dir: [0, 0, -1], norm: [0, 0, -1], verts: [[halfS, -halfS, -halfS], [-halfS, -halfS, -halfS], [-halfS, halfS, -halfS], [halfS, halfS, -halfS]] },
            { dir: [0, 0, 1], norm: [0, 0, 1], verts: [[-halfS, -halfS, halfS], [halfS, -halfS, halfS], [halfS, halfS, halfS], [-halfS, halfS, halfS]] }
        ];

        for (let lx = 0; lx < w; lx++) {
            for (let ly = 0; ly < h; ly++) {
                for (let lz = 0; lz < d; lz++) {
                    const idx = this.getIndex(lx, ly, lz);
                    if (this.data[idx] === 0) continue;

                    // Global voxel coordinates
                    const gx = this.cx * CHUNK_SIZE + lx;
                    const gy = this.cy * CHUNK_SIZE + ly;
                    const gz = this.cz * CHUNK_SIZE + lz;

                    // Bake local offsets relative to the MASTER object's center
                    const offsetX = (gx - (pw - 1) * 0.5) * s;
                    const offsetY = (gy - (ph - 1) * 0.5) * s;
                    const offsetZ = (gz - (pd - 1) * 0.5) * s;

                    const r = this.voxelColors[idx * 3];
                    const g = this.voxelColors[idx * 3 + 1];
                    const b = this.voxelColors[idx * 3 + 2];

                    // face culling
                    for (let f = 0; f < 6; f++) {
                        const face = faces[f];
                        // Ask parent if neighbor is solid and handle cross-chunk boundaries
                        if (!this.parent.isSolid(gx + face.dir[0], gy + face.dir[1], gz + face.dir[2])) {
                            const vStart = vCount;
                            // gneratng 4 vertices for the exposed face
                            for (let v = 0; v < 4; v++) {
                                const vIdx = (vStart + v) * 3;
                                const uvIdx = (vStart + v) * 2;

                                this.positions[vIdx] = offsetX + face.verts[v][0];
                                this.positions[vIdx + 1] = offsetY + face.verts[v][1];
                                this.positions[vIdx + 2] = offsetZ + face.verts[v][2];

                                this.normals[vIdx] = face.norm[0];
                                this.normals[vIdx + 1] = face.norm[1];
                                this.normals[vIdx + 2] = face.norm[2];

                                this.colors[vIdx] = r;
                                this.colors[vIdx + 1] = g;
                                this.colors[vIdx + 2] = b;

                                if (v === 0) { this.uvs[uvIdx] = 0; this.uvs[uvIdx + 1] = 0; }
                                else if (v === 1) { this.uvs[uvIdx] = 1; this.uvs[uvIdx + 1] = 0; }
                                else if (v === 2) { this.uvs[uvIdx] = 1; this.uvs[uvIdx + 1] = 1; }
                                else if (v === 3) { this.uvs[uvIdx] = 0; this.uvs[uvIdx + 1] = 1; }
                            }
                            // draw triangles for our square
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
        // save our finall vertex and indice count since our arrays could
        // be larger than we actually used. Tell BufferGeometry where to stop
        this.exposedVertices = vCount;
        this.exposedIndices = iCount;
    }
}

export class VoxelObject {
    constructor(id, position, dimensions, voxelScale = 0.5, isDestructible = true) {
        this.id = id;
        this.position = position.clone();
        this.dimensions = dimensions.clone();
        this.voxelScale = voxelScale;
        this.isDestructible = isDestructible;

        this.chunks = [];
        this.chunkDims = {
            x: Math.ceil(this.dimensions.x / CHUNK_SIZE),
            y: Math.ceil(this.dimensions.y / CHUNK_SIZE),
            z: Math.ceil(this.dimensions.z / CHUNK_SIZE)
        };

        // Instantiate Chunks
        for (let cz = 0; cz < this.chunkDims.z; cz++) {
            for (let cy = 0; cy < this.chunkDims.y; cy++) {
                for (let cx = 0; cx < this.chunkDims.x; cx++) {
                    const w = Math.min(CHUNK_SIZE, this.dimensions.x - cx * CHUNK_SIZE);
                    const h = Math.min(CHUNK_SIZE, this.dimensions.y - cy * CHUNK_SIZE);
                    const d = Math.min(CHUNK_SIZE, this.dimensions.z - cz * CHUNK_SIZE);
                    
                    this.chunks.push(new VoxelChunk(this, cx, cy, cz, w, h, d));
                }
            }
        }

        this.boundingBox = new THREE.Box3();

        this.initColors();
        this.computeVisibility();
        this.calculateAABB();
    }

    getChunk(gx, gy, gz) {
        if (gx < 0 || gx >= this.dimensions.x || gy < 0 || gy >= this.dimensions.y || gz < 0 || gz >= this.dimensions.z) return null;
        const cx = Math.floor(gx / CHUNK_SIZE);
        const cy = Math.floor(gy / CHUNK_SIZE);
        const cz = Math.floor(gz / CHUNK_SIZE);
        const idx = cx + (cy * this.chunkDims.x) + (cz * this.chunkDims.x * this.chunkDims.y);
        return this.chunks[idx];
    }

    isSolid(gx, gy, gz) {
        const chunk = this.getChunk(gx, gy, gz);
        if (!chunk) return false;
        const lx = gx % CHUNK_SIZE;
        const ly = gy % CHUNK_SIZE;
        const lz = gz % CHUNK_SIZE;
        return chunk.data[chunk.getIndex(lx, ly, lz)] === 1;
    }

    initColors() {
        for (let i = 0; i < this.chunks.length; i++) {
            const chunk = this.chunks[i];
            for (let v = 0; v < chunk.totalVoxels; v++) {
                chunk.voxelColors[v * 3] = 0.2 + 0.4 * Math.random();
                chunk.voxelColors[v * 3 + 1] = 0.3 + 0.4 * Math.random();
                chunk.voxelColors[v * 3 + 2] = 0.6 + 0.4 * Math.random();
            }
        }
    }

    isSurrounded(gx, gy, gz) {
        if (gx === 0 || gx === this.dimensions.x - 1 || 
            gy === 0 || gy === this.dimensions.y - 1 || 
            gz === 0 || gz === this.dimensions.z - 1) {
            return false;
        }
        return (
            this.isSolid(gx - 1, gy, gz) && this.isSolid(gx + 1, gy, gz) &&
            this.isSolid(gx, gy - 1, gz) && this.isSolid(gx, gy + 1, gz) &&
            this.isSolid(gx, gy, gz - 1) && this.isSolid(gx, gy, gz + 1)
        );
    }

    computeVisibility() {
        for (let gx = 0; gx < this.dimensions.x; gx++) {
            for (let gy = 0; gy < this.dimensions.y; gy++) {
                for (let gz = 0; gz < this.dimensions.z; gz++) {
                    const chunk = this.getChunk(gx, gy, gz);
                    const lx = gx % CHUNK_SIZE;
                    const ly = gy % CHUNK_SIZE;
                    const lz = gz % CHUNK_SIZE;
                    const idx = chunk.getIndex(lx, ly, lz);

                    if (chunk.data[idx] === 0) {
                        chunk.visibilityData[idx] = 0;
                    } else {
                        chunk.visibilityData[idx] = this.isSurrounded(gx, gy, gz) ? 2 : 1;
                    }
                }
            }
        }
        // Build initial meshes
        for (let i = 0; i < this.chunks.length; i++) {
            this.chunks[i].rebuildMeshBuffers();
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

    exposeNeighbor(gx, gy, gz) {
        const chunk = this.getChunk(gx, gy, gz);
        if (!chunk) return;
        const lx = gx % CHUNK_SIZE;
        const ly = gy % CHUNK_SIZE;
        const lz = gz % CHUNK_SIZE;
        const idx = chunk.getIndex(lx, ly, lz);
        
        if (chunk.visibilityData[idx] === 2) {
            chunk.visibilityData[idx] = 1;
            chunk.dirty = true; // Mark this specific chunk for a rebuild
        }
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

        for (let gx = minI; gx <= maxI; gx++) {
            for (let gy = minJ; gy <= maxJ; gy++) {
                for (let gz = minK; gz <= maxK; gz++) {
                    const chunk = this.getChunk(gx, gy, gz);
                    if (!chunk) continue;

                    const lx = gx % CHUNK_SIZE;
                    const ly = gy % CHUNK_SIZE;
                    const lz = gz % CHUNK_SIZE;
                    const idx = chunk.getIndex(lx, ly, lz);

                    if (chunk.data[idx] === 0) continue; 

                    const worldX = (gx - (w - 1) * 0.5) * s;
                    const worldY = (gy - (h - 1) * 0.5) * s;
                    const worldZ = (gz - (d - 1) * 0.5) * s;

                    const dx = worldX - localPoint.x;
                    const dy = worldY - localPoint.y;
                    const dz = worldZ - localPoint.z;
                    const distSq = dx * dx + dy * dy + dz * dz;

                    if (distSq <= radiusSq) {
                        chunk.data[idx] = 0;
                        chunk.visibilityData[idx] = 0;
                        chunk.dirty = true;
                        destroyedAny = true;

                        // Expose neighbors (automatically crosses chunk boundaries!)
                        this.exposeNeighbor(gx - 1, gy, gz);
                        this.exposeNeighbor(gx + 1, gy, gz);
                        this.exposeNeighbor(gx, gy - 1, gz);
                        this.exposeNeighbor(gx, gy + 1, gz);
                        this.exposeNeighbor(gx, gy, gz - 1);
                        this.exposeNeighbor(gx, gy, gz + 1);
                    }
                }
            }
        }

        if (destroyedAny) {
            // Only rebuild the chunks that were actually affected by the blast
            for (let i = 0; i < this.chunks.length; i++) {
                if (this.chunks[i].dirty) {
                    this.chunks[i].rebuildMeshBuffers();
                }
            }
        }

        return destroyedAny;
    }
}