class Cube {
    constructor() {
        this.type = "cube"; // give type name to put right texture on cube
        this.color = [1.0, 0.0, 0.0, 1.0];
        this.matrix = new Matrix4();
        this.normalMat = new Matrix4();
        this.texture = t_COLOR;
        this.showTexture = true;
        this.UVScale = 1.0;
        this.active = true;
        this.shininess = 10.0;
    }

    render() {
        var rgba = this.color;
        // Pass texture number
        gl.uniform1i(u_WhichTexture, this.texture);
        // Pass the color of a triangle to u_FragColor variable
        gl.uniform4f(u_FragColor, rgba[0], rgba[1], rgba[2], rgba[3]);
        // Pass the matrix to u_ModelMatrix attribute
        gl.uniformMatrix4fv(u_ModelMatrix, false, this.matrix.elements);
        // Pass normal matrix
        gl.uniformMatrix4fv(u_NormalMatrix, false, this.normalMat.elements);
        
        // Rebind vert buffers
        gl.bindBuffer(gl.ARRAY_BUFFER, g_cubeVertBuffer);
        // Assign the buffer object to a_Position variable
        gl.vertexAttribPointer(a_Position, 3, gl.FLOAT, false, 0, 0);
        // Enable the assignment to a_Position variable
        gl.enableVertexAttribArray(a_Position);
        
        // Rebind uv vert buffers
        gl.bindBuffer(gl.ARRAY_BUFFER, g_cubeUVVertBuffer);
        // Assign the buffer object to a_UV variable
        gl.vertexAttribPointer(a_UV, 2, gl.FLOAT, false, 0, 0);
        // Enable the assignment to a_UV variable
        gl.enableVertexAttribArray(a_UV);

        // Rebind normals vert buffers
        gl.bindBuffer(gl.ARRAY_BUFFER, g_cubeNormBuffer);
        // Assign the buffer object to a_Normal variable
        gl.vertexAttribPointer(a_Normal, 3, gl.FLOAT, false, 0, 0);
        // Enable the assignment to a_Normal variable
        gl.enableVertexAttribArray(a_Normal);

        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, g_cubeIndexBuffer);

        // Scale texture
        gl.uniform1f(u_UVScale, this.UVScale);
        // object shininess
        gl.uniform1f(u_Shininess, this.shininess);
        // toggle normal
        gl.uniform1i(u_ShowNormals, g_toggleNormals ? 1 : 0);
        // toggle texture
        gl.uniform1i(u_ShowTexture, toggleTexture(this.showTexture));
        
        gl.drawElements(gl.TRIANGLES, 36, gl.UNSIGNED_SHORT, 0);
    }
}

let g_cubeIndices = null;
let g_cubeIndexBuffer = null;

function createCubeVertices() {
    g_cubeVertices = new Float32Array([
        // Front Face
        0.0, 0.0, 1.0,  1.0, 0.0, 1.0,  1.0, 1.0, 1.0,  0.0, 1.0, 1.0,  
        // Back Face
        1.0, 0.0, 0.0,  0.0, 0.0, 0.0,  0.0, 1.0, 0.0,  1.0, 1.0, 0.0,  
        // Left Face
        0.0, 0.0, 0.0,  0.0, 0.0, 1.0,  0.0, 1.0, 1.0,  0.0, 1.0, 0.0,  
        // Right Face
        1.0, 0.0, 1.0,  1.0, 0.0, 0.0,  1.0, 1.0, 0.0,  1.0, 1.0, 1.0,  
        // Top Face
        0.0, 1.0, 0.0,  1.0, 1.0, 0.0,  1.0, 1.0, 1.0,  0.0, 1.0, 1.0,  
        // Bottom Face
        0.0, 0.0, 1.0,  1.0, 0.0, 1.0,  1.0, 0.0, 0.0,  0.0, 0.0, 0.0
    ]);
    
    g_cubeUVVerts = new Float32Array([
        // Front Face
        0.0, 0.0,  1.0, 0.0,  1.0, 1.0,  0.0, 1.0,  
        // Back Face
        0.0, 0.0,  1.0, 0.0,  1.0, 1.0,  0.0, 1.0,  
        // Left Face
        0.0, 0.0,  1.0, 0.0,  1.0, 1.0,  0.0, 1.0,  
        // Right Face
        0.0, 0.0,  1.0, 0.0,  1.0, 1.0,  0.0, 1.0,  
        // Top Face
        0.0, 0.0,  1.0, 0.0,  1.0, 1.0,  0.0, 1.0,  
        // Bottom Face
        0.0, 0.0,  1.0, 0.0,  1.0, 1.0,  0.0, 1.0
    ]);

    g_cubeNormals = new Float32Array([
        // Front face
        0.0, 0.0, 1.0,  0.0, 0.0, 1.0,  0.0, 0.0, 1.0,  0.0, 0.0, 1.0,  
        // Back face
        0.0, 0.0, -1.0,  0.0, 0.0, -1.0,  0.0, 0.0, -1.0,  0.0, 0.0, -1.0,  
        // Left face
        -1.0, 0.0, 0.0,  -1.0, 0.0, 0.0,  -1.0, 0.0, 0.0,  -1.0, 0.0, 0.0,  
        // Right face
        1.0, 0.0, 0.0,  1.0, 0.0, 0.0,  1.0, 0.0, 0.0,  1.0, 0.0, 0.0,  
        // Top face
        0.0, 1.0, 0.0,  0.0, 1.0, 0.0,  0.0, 1.0, 0.0,  0.0, 1.0, 0.0,  
        // Bottom face
        0.0, -1.0, 0.0,  0.0, -1.0, 0.0,  0.0, -1.0, 0.0,  0.0, -1.0, 0.0  
    ]);

    g_cubeIndices = new Uint16Array([
        // front
        0, 1, 2,  0, 2, 3,  
        // back
        4, 5, 6,  4, 6 ,7,  
        // left
        8, 9, 10,  8, 10, 11,  
        // right
        12, 13, 14,  12, 14, 15,  
        // top
        16, 17, 18,  16, 18, 19,  
        // bottom
        20, 21, 22,  20, 22, 23
    ]);
}

function createCubeBuffers() {
    g_cubeVertBuffer = gl.createBuffer();
    g_cubeUVVertBuffer = gl.createBuffer();
    g_cubeNormBuffer = gl.createBuffer();
    g_cubeIndexBuffer = gl.createBuffer();
    if (!g_cubeVertBuffer || !g_cubeUVVertBuffer || !g_cubeNormBuffer || !g_cubeIndexBuffer) {
        console.error("Failed to creaete global cube buffers");
        return -1;
    }
        
    // Bind the buffer object to target
    gl.bindBuffer(gl.ARRAY_BUFFER, g_cubeVertBuffer);
    // Write date into the buffer object
    gl.bufferData(gl.ARRAY_BUFFER, g_cubeVertices, gl.STATIC_DRAW);

    // --- UV ---
    // Bind the buffer object to target
    gl.bindBuffer(gl.ARRAY_BUFFER, g_cubeUVVertBuffer);
    // Write date into the buffer object
    gl.bufferData(gl.ARRAY_BUFFER, g_cubeUVVerts, gl.STATIC_DRAW);

    // --- NORMALS ---
    // Bind the buffer object to target
    gl.bindBuffer(gl.ARRAY_BUFFER, g_cubeNormBuffer);
    // Write date into the buffer object
    gl.bufferData(gl.ARRAY_BUFFER, g_cubeNormals, gl.STATIC_DRAW);


    // --- INDICES ---
    // Bind the buffer object to target
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, g_cubeIndexBuffer);
    // Write date into the buffer object
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, g_cubeIndices, gl.STATIC_DRAW);
}
