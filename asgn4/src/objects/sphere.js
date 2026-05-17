class Sphere {
    constructor() {
        this.type = "sphere";
        this.color = [1.0, 0.0, 0.0, 1.0];
        this.matrix = new Matrix4();
        this.normalMat = new Matrix4();
        this.texture = t_COLOR; 
        this.showTexture = true;
        this.UVScale = 1.0; 
        this.baseMatrix = new Matrix4();
        this.hitbox = new Cube();
        this.active = true; // render objectsif they're active, not hit
        this.tod = 0.0; // save sphere's time of death
        this.respawnDelay = 2.0; // time until respawn
        this.pos = [];
        this.shininess = 10.0;
    }

    render() {
        var rgba = this.color;
        // Pass texture number
        gl.uniform1i(u_WhichTexture, this.texture);
        // Pass the color to u_FragColor variable
        gl.uniform4f(u_FragColor, rgba[0], rgba[1], rgba[2], rgba[3]);
        // Pass the matrix to u_ModelMatrix attribute
        gl.uniformMatrix4fv(u_ModelMatrix, false, this.matrix.elements);
        // Pass normal matrix
        gl.uniformMatrix4fv(u_NormalMatrix, false, this.normalMat.elements);
        
        // Rebind position buffer
        gl.bindBuffer(gl.ARRAY_BUFFER, g_sphereVertBuffer);
        gl.vertexAttribPointer(a_Position, 3, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(a_Position);
        
        // Rebind UV buffer
        gl.bindBuffer(gl.ARRAY_BUFFER, g_sphereUVVertBuffer);
        gl.vertexAttribPointer(a_UV, 2, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(a_UV);

        // Rebind normal buffer
        gl.bindBuffer(gl.ARRAY_BUFFER, g_sphereNormBuffer);
        gl.vertexAttribPointer(a_Normal, 3, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(a_Normal);

        // rebind indices buffer
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, g_sphereIndexBuffer)
        
        // Scale texture
        gl.uniform1f(u_UVScale, this.UVScale);
        // object shininess
        gl.uniform1f(u_Shininess, this.shininess);
        // toggle normal
        gl.uniform1i(u_ShowNormals, g_toggleNormals ? 1 : 0);
        // toggle texture
        gl.uniform1i(u_ShowTexture, toggleTexture(this.showTexture));
        
        // Draw
        gl.drawElements(gl.TRIANGLES, g_sphereIndices.length, gl.UNSIGNED_SHORT, 0);
    }
}

function initSphere(segments) {
    // generate spheres data once
    if (g_sphereVertices) return;

    let invSeg = 1 / segments;
    let d = Math.PI / segments;
    let dd = (Math.PI * 2) / segments;

    let vPositions = [];
    let vUVs = [];
    let vNormals = [];
    let vIndices = [];

    // Generate unique vertices
    for (var latNum = 0; latNum <= segments; ++latNum) {
        var theta = latNum * d;
        var sinTheta = Math.sin(theta);
        var cosTheta = Math.cos(theta);

        for (var lonNum = 0; lonNum <= segments; ++lonNum) {
            let phi = lonNum * dd;
            let sinPhi = Math.sin(phi);
            let cosPhi = Math.cos(phi);

            // X,Y,Z coords
            let x = cosPhi * sinTheta;
            let y = cosTheta;
            let z = sinPhi * sinTheta;

            // U,V texture coords
            let u = 1 - (lonNum * invSeg);
            let v = 1 - (latNum * invSeg);

            vPositions.push(x, y, z);
            vNormals.push(x, y, z);
            vUVs.push(u, v);
        }
    }

    // generate indices
    for (var latNum = 0; latNum < segments; ++latNum) {
        for (var lonNum = 0; lonNum < segments; ++lonNum) {
            let first = (latNum * (segments + 1)) + lonNum;
            let second = first + segments + 1;

            // 1st triangle
            vIndices.push(first);
            vIndices.push(second);
            vIndices.push(first + 1);

            // 2nd triangle
            vIndices.push(second);
            vIndices.push(second + 1);
            vIndices.push(first + 1);
        }
    }

    g_sphereVertices = new Float32Array(vPositions);
    g_sphereUVVerts = new Float32Array(vUVs);
    g_sphereNormals = new Float32Array(vNormals);
    g_sphereIndices = new Uint16Array(vIndices);
}

function createSphereBuffers() {
    g_sphereVertBuffer = gl.createBuffer();
    g_sphereUVVertBuffer = gl.createBuffer();
    g_sphereNormBuffer = gl.createBuffer();
    g_sphereIndexBuffer = gl.createBuffer();
    if (!g_sphereVertBuffer || !g_sphereUVVertBuffer || 
        !g_sphereNormBuffer || !g_sphereIndexBuffer) {
        console.error("Failed to create global sphere buffers");
        return -1;
    }

    // --- Positions ---
    gl.bindBuffer(gl.ARRAY_BUFFER, g_sphereVertBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, g_sphereVertices, gl.STATIC_DRAW);

    // --- UVs ---
    gl.bindBuffer(gl.ARRAY_BUFFER, g_sphereUVVertBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, g_sphereUVVerts, gl.STATIC_DRAW);

    // --- NORMALS ---
    gl.bindBuffer(gl.ARRAY_BUFFER, g_sphereNormBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, g_sphereNormals, gl.STATIC_DRAW);

    // --- INDICES ---
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, g_sphereIndexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, g_sphereIndices, gl.STATIC_DRAW);
}
