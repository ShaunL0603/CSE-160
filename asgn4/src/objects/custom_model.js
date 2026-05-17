class CustomModel {
    constructor() {
        this.type = "customModel";
        this.subType = "None";
        this.color = [0.5, 0.5, 0.5, 1.0];
        this.matrix = new Matrix4();
        this.normalMat = new Matrix4();
        this.texture = t_COLOR;
        this.showTexture = false;
        this.UVScale = 1.0;
        this.active = true;
        this.shininess = 10.0;
        this.vertBuffer = null;
        this.uvBuffer = null;
        this.normBuffer = null;
        this.indexBuffer = null;
        this.vertexCount = 0;
        this.loaded = false; // Flag to prevent rendering before data is ready
        this.mtlLoaded = false;
        this.materials = {};
        this.drawCalls = [];
    }

    async loadOBJ(filepath) {
        try {
            const response = await fetch(filepath);
            if (!response.ok) {
                throw new Error(`status: ${response.status}`);
            }
            const text = await response.text();
            this.parseOBJ(text);
            this.createBuffers();
            this.loaded = true;
        } catch (error) {
            console.error("Failed to load OBJ:", error);
        }
    }

    async loadMTL(filepath) {
        try {
            const response = await fetch(filepath);
            if (!response.ok) {
                throw new Error(`status: ${response.status}`);
            }
            const text = await response.text();
            this.parseMTL(text);
            this.mtlLoaded = true;
        } catch (error) {
            console.error("Failed to load OBJ:", error);
        }
    }

    parseOBJ(text) {
        const lines = text.split('\n');
        
        // Temporary arrays to hold raw data from the file
        let rawPositions = [];
        let rawUVs = [];
        let rawNormals = [];
        
        // Final flattened arrays for WebGL
        let finalPositions = [];
        let finalUVs = [];
        let finalNormals = [];
        let finalIndices = [];

        // Cache map, when looking at new string, i.e. "1710/22301/6943" if we've already
        // seen it and it's in vertexCache we grab same vertices and push to indices array
        let vertexCache = {};
        let unifiedIndex = 0;

        // Track chunks
        let currDrawCall = null;
        let vertCounter = 0;

        for (let line of lines) {
            line = line.trim();
            if (line === '' || line.startsWith('#')) continue;

            // Split by one or more spaces
            const parts = line.split(/\s+/);
            const type = parts[0];

            if (type === "mtllib") {
                const mtlFilename = parts[1];
                this.loadMTL(`./objects/customObjs/WeBareBears/${mtlFilename}`);
            }

            if (type === 'v') {
                rawPositions.push([parseFloat(parts[1]), parseFloat(parts[2]), parseFloat(parts[3])]);
            } else if (type === 'vt') {
                rawUVs.push([parseFloat(parts[1]), parseFloat(parts[2])]);
            } else if (type === 'vn') {
                rawNormals.push([parseFloat(parts[1]), parseFloat(parts[2]), parseFloat(parts[3])]);
            } 

            if (type === 'usemtl') {
                const matName = parts[1];

                if (currDrawCall && currDrawCall.count > 0) {
                    this.drawCalls.push(currDrawCall);
                }

                currDrawCall = {
                    material: matName,
                    start: vertCounter,
                    count: 0
                }
            } else if (type === 'f') {
                // Create a quick helper function to process a single vertex string (e.g., "1/1/1")
                const processVertex = (vertexString) => {
                    if (vertexCache[vertexString] !== undefined) {
                        finalIndices.push(vertexCache[vertexString]);
                    } else {
                        const indices = vertexString.split('/');
                        
                        // Position
                        const posIndex = parseInt(indices[0]) - 1;
                        finalPositions.push(...rawPositions[posIndex]);

                        // UVs
                        if (indices[1] && indices[1] !== '') {
                            const uvIndex = parseInt(indices[1]) - 1;
                            finalUVs.push(...rawUVs[uvIndex]);
                        } else {
                            finalUVs.push(0.0, 0.0); 
                        }

                        // Normals
                        if (indices[2] && indices[2] !== '') {
                            const normIndex = parseInt(indices[2]) - 1;
                            finalNormals.push(...rawNormals[normIndex]);
                        } else {
                            finalNormals.push(0.0, 1.0, 0.0); 
                        }

                        vertexCache[vertexString] = unifiedIndex;
                        finalIndices.push(unifiedIndex);
                        ++unifiedIndex;
                    };
                };

                // Triangle fan loop
                // start at 2nd idx and loop up to 2nd-to-last vertex
                for (let i = 2; i < parts.length - 1; ++i) {
                    processVertex(parts[1]);
                    processVertex(parts[i]);
                    processVertex(parts[i + 1]);

                    vertCounter += 3;
                    if (currDrawCall) currDrawCall.count += 3;
                }
            }
        }
        // Catch very last chunk at end of file
        if (currDrawCall && currDrawCall.count > 0) {
            this.drawCalls.push(currDrawCall);
        }

        // Store them in the class to be pushed to the GPU
        this.vertices = new Float32Array(finalPositions);
        this.indices = new Uint16Array(finalIndices);
        this.uvs = new Float32Array(finalUVs);
        this.normals = new Float32Array(finalNormals);
        this.vertexCount = vertCounter;
    }

    parseMTL(text) {
        const lines = text.split('\n');
        let currentMaterial = null;

        for (let line of lines) {
            line = line.trim();
            if (line === '' || line.startsWith('#')) continue;

            const parts = line.split(/\s+/);
            const type = parts[0];

            if (type === 'newmtl') {
                currentMaterial = parts[1];
                // Initialize defaults for the new material
                this.materials[currentMaterial] = { 
                    color: [1.0, 1.0, 1.0, 1.0], 
                    shininess: 10.0 
                };
            } else if (type === 'Kd' && currentMaterial) {
                this.materials[currentMaterial].color = [
                    parseFloat(parts[1]), 
                    parseFloat(parts[2]), 
                    parseFloat(parts[3]), 
                    1.0
                ];
            } else if (type === 'Ns' && currentMaterial) {
                this.materials[currentMaterial].shininess = parseFloat(parts[1]);
            }
        }
    }

    createBuffers() {
        this.vertBuffer = gl.createBuffer();
        this.uvBuffer = gl.createBuffer();
        this.normBuffer = gl.createBuffer();
        this.indexBuffer = gl.createBuffer();

        if (!this.vertBuffer || !this.uvBuffer || !this.normBuffer || !this.indexBuffer) {
            console.error("Failed to create buffers for CustomModel");
            return;
        }

        // Send positions to GPU
        gl.bindBuffer(gl.ARRAY_BUFFER, this.vertBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, this.vertices, gl.STATIC_DRAW);

        // Send UVs to GPU
        gl.bindBuffer(gl.ARRAY_BUFFER, this.uvBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, this.uvs, gl.STATIC_DRAW);

        // Send Normals to GPU
        gl.bindBuffer(gl.ARRAY_BUFFER, this.normBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, this.normals, gl.STATIC_DRAW);

        // indices
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, this.indices, gl.STATIC_DRAW);
    }

    render() {
        // Don't try to draw if the fetch request hasn't finished yet
        if (!this.loaded) return;

        var rgba = this.color;
        gl.uniform1i(u_WhichTexture, this.texture);
        gl.uniform4f(u_FragColor, rgba[0], rgba[1], rgba[2], rgba[3]);
        gl.uniformMatrix4fv(u_ModelMatrix, false, this.matrix.elements);
        gl.uniformMatrix4fv(u_NormalMatrix, false, this.normalMat.elements);
        
        // Bind THIS instance's private buffers
        gl.bindBuffer(gl.ARRAY_BUFFER, this.vertBuffer);
        gl.vertexAttribPointer(a_Position, 3, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(a_Position);
        
        gl.bindBuffer(gl.ARRAY_BUFFER, this.uvBuffer);
        gl.vertexAttribPointer(a_UV, 2, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(a_UV);

        gl.bindBuffer(gl.ARRAY_BUFFER, this.normBuffer);
        gl.vertexAttribPointer(a_Normal, 3, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(a_Normal);

        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);

        gl.uniform1f(u_UVScale, this.UVScale);
        gl.uniform1f(u_Shininess, this.shininess);
        gl.uniform1i(u_ShowNormals, g_toggleNormals ? 1 : 0);
        gl.uniform1i(u_ShowTexture, toggleTexture(this.showTexture));

        // draw model with multiple materials
        if (this.drawCalls.length > 0) {
            for (let call of this.drawCalls) {
                let mat = this.materials[call.material];
                gl.uniform4f(u_FragColor, 1.0, 0.0, 1.0, 1.0); // default magenta for debugging
                gl.uniform1f(u_Shininess, 10.0);

                if (mat) {
                    gl.uniform4f(u_FragColor, mat.color[0], mat.color[1], mat.color[2], mat.color[3]);
                    gl.uniform1f(u_Shininess, mat.shininess);
                }
                let byteOffset = call.start * 2;
                gl.drawElements(gl.TRIANGLES, call.count, gl.UNSIGNED_SHORT, byteOffset);
            }
        } 
        // model has no material, draw
        else {
            gl.uniform4f(u_FragColor, this.color[0], this.color[1], this.color[2], this.color[3]);
            gl.drawElements(gl.TRIANGLES, this.indices.length, gl.UNSIGNED_SHORT, 0);
        }
    }
}