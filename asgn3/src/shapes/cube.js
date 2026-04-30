class Cube {
  constructor() {
      this.type = "cube";
      this.color = [1.0, 0.0, 0.0, 1.0];
      this.matrix = new Matrix4();
      this.vertices = null;
      this.uvVertices = null;
      this.uvBuffer = null;
      this.buffer = null;
  }

  generateVertices() {
    this.vertices = new Float32Array([
        // Face 1
        0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 1.0, 0.0,
        0.0, 0.0, 0.0, 1.0, 1.0, 0.0, 0.0, 1.0, 0.0,
        // Face 2
        0.0, 1.0, 0.0, 1.0, 1.0, 1.0, 0.0, 1.0, 1.0,
        0.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0, 1.0, 1.0,
        // Face 3
        0.0, 0.0, 1.0, 1.0, 0.0, 1.0, 1.0, 1.0, 1.0,
        0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 1.0, 1.0, 1.0,
        // Face 4
        0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 1.0,
        0.0, 0.0, 0.0, 0.0, 1.0, 1.0, 0.0, 0.0, 1.0,
        // Face 5
        1.0, 0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 1.0, 1.0,
        1.0, 0.0, 0.0, 1.0, 1.0, 1.0, 1.0, 1.0, 0.0,
        // Face 6
        0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 1.0, 0.0, 1.0,
        0.0, 0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 0.0, 0.0
    ]);
  }

  generateUVVertices() {
    this.uvVertices = new Float32Array([
    // Face 1 - 2 triangles = 6 vertices = 12 floats
    0.0,0.0, 1.0,0.0, 1.0,1.0, 
    0.0,0.0, 1.0,1.0, 0.0,1.0,
    // Face 2
    0.0,0.0, 1.0,0.0, 1.0,1.0, 
    0.0,0.0, 1.0,1.0, 0.0,1.0,
    // Face 3
    0.0,0.0, 1.0,0.0, 1.0,1.0, 
    0.0,0.0, 1.0,1.0, 0.0,1.0,
    // Face 4
    0.0,0.0, 1.0,0.0, 1.0,1.0, 
    0.0,0.0, 1.0,1.0, 0.0,1.0,
    // Face 5
    0.0,0.0, 1.0,0.0, 1.0,1.0, 
    0.0,0.0, 1.0,1.0, 0.0,1.0,
    // Face 6
    0.0,0.0, 1.0,0.0, 1.0,1.0, 
    0.0,0.0, 1.0,1.0, 0.0,1.0,
    ]);
  }

  render() {
    var rgba = this.color;

    // Pass the color of a triangle to u_FragColor variable
    gl.uniform4f(u_FragColor, rgba[0], rgba[1], rgba[2], rgba[3]);
    // Pass the matrix to u_ModelMatrix attribute
    gl.uniformMatrix4fv(u_ModelMatrix, false, this.matrix.elements);

    // Generate new vertices
    if (this.vertices === null) {
        this.generateVertices();
    }

    if (this.uvVertices === null) {
        this.generateUVVertices();
    }
    
    // Create a buffer object
    if (this.buffer === null) {
        this.buffer = gl.createBuffer();
        if (!this.buffer) {
            console.log("Failed to create the buffer object");
            return -1;
        }
    }

    // Create uvBuffer
    if (this.uvBuffer === null) {
        this.uvBuffer = gl.createBuffer();
        if (!this.uvBuffer) {
            console.log("Failed to create the uv buffer");
            return -1;
        }
    }

    drawTriangle3DUV(this, this.uvVertices);
  }
}

function drawTriangle3DUV(obj, uv) {    
    // Bind the buffer object to target
    gl.bindBuffer(gl.ARRAY_BUFFER, obj.buffer);
    // Write date into the buffer object
    gl.bufferData(gl.ARRAY_BUFFER, obj.vertices, gl.DYNAMIC_DRAW);
    // Assign the buffer object to a_Position variable
    gl.vertexAttribPointer(a_Position, 3, gl.FLOAT, false, 0, 0);
    // Enable the assignment to a_Position variable
    gl.enableVertexAttribArray(a_Position);

    // --- UV ---
    // Bind the buffer object to target
    gl.bindBuffer(gl.ARRAY_BUFFER, obj.uvBuffer);
    // Write date into the buffer object
    gl.bufferData(gl.ARRAY_BUFFER, obj.uvVertices, gl.DYNAMIC_DRAW);
    // Assign the buffer object to a_UV variable
    gl.vertexAttribPointer(a_UV, 2, gl.FLOAT, false, 0, 0);
    // Enable the assignment to a_UV variable
    gl.enableVertexAttribArray(a_UV);
    
    gl.drawArrays(gl.TRIANGLES, 0, obj.vertices.length / 3);
}

function drawTriangle3D(shape) {
    if (shape === null) {
        console.log('Failed to create the vertices of the triangle');
        return -1;
    }
    
    // Bind the buffer object to target
    gl.bindBuffer(gl.ARRAY_BUFFER, shape.buffer);
    // Write date into the buffer object
    gl.bufferData(gl.ARRAY_BUFFER, shape.vertices, gl.DYNAMIC_DRAW);
    
    // Assign the buffer object to a_Position variable
    gl.vertexAttribPointer(a_Position, 3, gl.FLOAT, false, 0, 0);
    
    // Enable the assignment to a_Position variable
    gl.enableVertexAttribArray(a_Position);

    // if (shape.colorShades === null) {
    //     shape.generateColorShades();
    // }

    // if (shape.colorBuffer === null) {
    //     shape.colorBuffer = gl.createBuffer();
    //     if (!shape.colorBuffer) {
    //         console.log("Failed to create the color buffer object");
    //         return -1;
    //     }
    // }

    // gl.bindBuffer(gl.ARRAY_BUFFER, shape.colorBuffer);
    // gl.bufferData(gl.ARRAY_BUFFER, shape.colorShades, gl.DYNAMIC_DRAW);
    // gl.vertexAttribPointer(a_Color, 4, gl.FLOAT, false, 0, 0);
    // gl.enableVertexAttribArray(a_Color);
    
    gl.drawArrays(gl.TRIANGLES, 0, shape.vertices.length / 3);
}
