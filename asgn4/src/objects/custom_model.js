class CustomModel {
    constructor() {
        this.type = "customModel";
        this.subType = "None";
        this.color = [0.5, 0.5, 0.5, 1.0];
        this.matrix = new Matrix4();
        this.normalMat = new Matrix4();
        this.texture = t_COLOR;
        this.showTexture = true;
        this.UVScale = 1.0;
        this.active = true;
        this.shininess = 10.0;
        this.vertBuffer = null;
        this.uvBuffer = null;
        this.normBuffer = null;
        this.vertexCount = 0;
        this.loaded = false; // Flag to prevent rendering before data is ready
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

        for (let line of lines) {
            line = line.trim();
            if (line === '' || line.startsWith('#')) continue;

            // Split by one or more spaces
            const parts = line.split(/\s+/);
            const type = parts[0];

            if (type === 'v') {
                rawPositions.push([parseFloat(parts[1]), parseFloat(parts[2]), parseFloat(parts[3])]);
            } else if (type === 'vt') {
                rawUVs.push([parseFloat(parts[1]), parseFloat(parts[2])]);
            } else if (type === 'vn') {
                rawNormals.push([parseFloat(parts[1]), parseFloat(parts[2]), parseFloat(parts[3])]);
            } else if (type === 'f') {
                // Faces are usually defined as: f v/vt/vn v/vt/vn v/vt/vn (Assuming triangles)
                for (let i = 1; i <= 3; i++) {
                    const indices = parts[i].split('/');
                    
                    // OBJ indices are 1-based, so subtract 1 for JavaScript 0-based arrays
                    const posIndex = parseInt(indices[0]) - 1;
                    finalPositions.push(...rawPositions[posIndex]);

                    // Textures might not exist on all models
                    if (indices[1] && indices[1] !== '') {
                        const uvIndex = parseInt(indices[1]) - 1;
                        finalUVs.push(...rawUVs[uvIndex]);
                    } else {
                        finalUVs.push(0.0, 0.0); // Default UV
                    }

                    // Normals might not exist on all models
                    if (indices[2] && indices[2] !== '') {
                        const normIndex = parseInt(indices[2]) - 1;
                        finalNormals.push(...rawNormals[normIndex]);
                    } else {
                        finalNormals.push(0.0, 1.0, 0.0); // Default pointing up
                    }
                }
            }
        }

        // Store them in the class to be pushed to the GPU
        this.vertices = new Float32Array(finalPositions);
        this.uvs = new Float32Array(finalUVs);
        this.normals = new Float32Array(finalNormals);
        this.vertexCount = finalPositions.length / 3;
    }

    createBuffers() {
        this.vertBuffer = gl.createBuffer();
        this.uvBuffer = gl.createBuffer();
        this.normBuffer = gl.createBuffer();

        if (!this.vertBuffer || !this.uvBuffer || !this.normBuffer) {
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
    }

    render() {
        // Guard clause: Don't try to draw if the fetch request hasn't finished yet!
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

        gl.uniform1f(u_UVScale, this.UVScale);
        gl.uniform1f(u_Shininess, this.shininess);
        gl.uniform1i(u_ShowNormals, g_toggleNormals ? 1 : 0);
        gl.uniform1i(u_ShowTexture, toggleTexture(this.showTexture));
        
        gl.drawArrays(gl.TRIANGLES, 0, this.vertexCount);
    }
}