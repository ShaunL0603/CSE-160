class Cube {
  constructor() {
    this.type = "cube"; // give type name to put right texture on cube
    this.color = [1.0, 0.0, 0.0, 1.0];
    this.matrix = new Matrix4();
    this.texture = t_COLOR;
    this.UVScale = 1.0;
    this.active = true;
  }

    render() {
        var rgba = this.color;
        // Pass texture number
        gl.uniform1i(u_whichTexture, this.texture);
        // Pass the color of a triangle to u_FragColor variable
        gl.uniform4f(u_FragColor, rgba[0], rgba[1], rgba[2], rgba[3]);
        // Pass the matrix to u_ModelMatrix attribute
        gl.uniformMatrix4fv(u_ModelMatrix, false, this.matrix.elements);
        
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
        // Scale texture
        gl.uniform1f(u_UVScale, this.UVScale);
        
        gl.drawArrays(gl.TRIANGLES, 0, g_cubeVertices.length / 3);
    }
}

function createCubeVertices() {
    g_cubeVertices = new Float32Array([
        // Front Face
        0.0, 0.0, 1.0, 1.0, 0.0, 1.0, 1.0, 1.0, 1.0, 
        0.0, 0.0, 1.0, 1.0, 1.0, 1.0, 0.0, 1.0, 1.0, 
        // Back Face
        1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 
        1.0, 0.0, 0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 0.0, 
        // Left Face
        0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 
        0.0, 0.0, 0.0, 0.0, 1.0, 1.0, 0.0, 1.0, 0.0, 
        // Right Face
        1.0, 0.0, 1.0, 1.0, 0.0, 0.0, 1.0, 1.0, 0.0, 
        1.0, 0.0, 1.0, 1.0, 1.0, 0.0, 1.0, 1.0, 1.0, 
        // Top Face
        0.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0, 1.0, 1.0, 
        0.0, 1.0, 0.0, 1.0, 1.0, 1.0, 0.0, 1.0, 1.0, 
        // Bottom Face
        0.0, 0.0, 1.0, 1.0, 0.0, 1.0, 1.0, 0.0, 0.0, 
        0.0, 0.0, 1.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0
    ]);
    
    g_cubeUVVertices = new Float32Array([
        // Front Face
        0.0, 0.0,  1.0, 0.0,  1.0, 1.0, 
        0.0, 0.0,  1.0, 1.0,  0.0, 1.0, 
        // Back Face
        0.0, 0.0,  1.0, 0.0,  1.0, 1.0, 
        0.0, 0.0,  1.0, 1.0,  0.0, 1.0, 
        // Left Face
        0.0, 0.0,  1.0, 0.0,  1.0, 1.0, 
        0.0, 0.0,  1.0, 1.0,  0.0, 1.0, 
        // Right Face
        0.0, 0.0,  1.0, 0.0,  1.0, 1.0, 
        0.0, 0.0,  1.0, 1.0,  0.0, 1.0, 
        // Top Face
        0.0, 0.0,  1.0, 0.0,  1.0, 1.0, 
        0.0, 0.0,  1.0, 1.0,  0.0, 1.0, 
        // Bottom Face
        0.0, 0.0,  1.0, 0.0,  1.0, 1.0, 
        0.0, 0.0,  1.0, 1.0,  0.0, 1.0
    ]);
}

function createCubeBuffers() {
    g_cubeVertBuffer = gl.createBuffer();
    g_cubeUVVertBuffer = gl.createBuffer();
    if (!g_cubeVertBuffer || !g_cubeUVVertBuffer) {
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
    gl.bufferData(gl.ARRAY_BUFFER, g_cubeUVVertices, gl.STATIC_DRAW);
}
