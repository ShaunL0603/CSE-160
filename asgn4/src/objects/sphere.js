class Sphere {
    constructor() {
        this.type = "sphere";
        this.color = [1.0, 0.0, 0.0, 1.0];
        this.matrix = new Matrix4();
        this.texture = t_COLOR; 
        this.UVScale = 1.0; 
        
        this.baseMatrix = new Matrix4();
        this.hitbox = new Cube();
        this.active = true; // render objectsif they're active, not hit
        this.tod = 0.0; // save sphere's time of death
        this.respawnDelay = 2.0; // time until respawn
        this.pos = [];
    }

    render() {
        var rgba = this.color;
        // Pass texture number
        gl.uniform1i(u_WhichTexture, this.texture);
        
        // Pass the color to u_FragColor variable
        gl.uniform4f(u_FragColor, rgba[0], rgba[1], rgba[2], rgba[3]);
        
        // Pass the matrix to u_ModelMatrix attribute
        gl.uniformMatrix4fv(u_ModelMatrix, false, this.matrix.elements);
        
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
        
        // Scale texture
        gl.uniform1f(u_UVScale, this.UVScale);
        // toggle normal
        gl.uniform1i(u_ShowNormals, g_toggleNormals ? 1 : 0);
        
        // Draw
        gl.drawArrays(gl.TRIANGLES, 0, g_sphereVertices.length / 3);
    }
}

function createSphereVertices(segments) {
    var d = Math.PI / segments;
    var dd = (Math.PI * 2) / segments;
    let invTwoPI = 1 / (Math.PI * 2);
    let invPi = 1 / Math.PI;

    let vPositions = [];
    let vUVs = [];
    let vNormals = [];

    // Loop through polar and azimuthal angles
    for (var t = 0; t < Math.PI; t += d) {
        for (var s = 0; s < (Math.PI * 2); s += dd) {
            var p1 = [Math.sin(t) * Math.cos(s), Math.cos(t), Math.sin(t) * Math.sin(s)];
            var p2 = [Math.sin(t + d) * Math.cos(s), Math.cos(t + d), Math.sin(t + d) * Math.sin(s)];
            var p3 = [Math.sin(t) * Math.cos(s + dd), Math.cos(t), Math.sin(t) * Math.sin(s + dd)];
            var p4 = [Math.sin(t + d) * Math.cos(s + dd), Math.cos(t + d), Math.sin(t + d) * Math.sin(s + dd)];
            
            // Map UVs based on current angles relative to total angles (PI and 2*PI)
            var uv1 = [s * invTwoPI, t * invPi];
            var uv2 = [s * invTwoPI, (t + d) * invPi];
            var uv3 = [(s + dd) * invTwoPI, t * invPi];
            var uv4 = [(s + dd) * invTwoPI, (t + d) * invPi];

            // Triangle 1
            vPositions.push(...p1, ...p2, ...p4);
            vUVs.push(...uv1, ...uv2, ...uv4);
            vNormals.push(...p1, ...p2, ...p4);

            // Triangle 2
            vPositions.push(...p1, ...p4, ...p3);
            vUVs.push(...uv1, ...uv4, ...uv3);
            vNormals.push(...p1, ...p4, ...p3);
        }
    }

    g_sphereVertices = new Float32Array(vPositions);
    g_sphereUVVerts = new Float32Array(vUVs);
    g_sphereNormVerts = new Float32Array(vNormals);
}

function createSphereBuffers() {
    g_sphereVertBuffer = gl.createBuffer();
    g_sphereUVVertBuffer = gl.createBuffer();
    g_sphereNormBuffer = gl.createBuffer();
    if (!g_sphereVertBuffer || !g_sphereUVVertBuffer || !g_sphereNormBuffer) {
        console.error("Failed to create global sphere buffers");
        return -1;
    }

    // --- Positions ---
    gl.bindBuffer(gl.ARRAY_BUFFER, g_sphereVertBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, g_sphereVertices, gl.DYNAMIC_DRAW);

    // --- UVs ---
    gl.bindBuffer(gl.ARRAY_BUFFER, g_sphereUVVertBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, g_sphereUVVerts, gl.DYNAMIC_DRAW);

    // --- NORMALS ---
    gl.bindBuffer(gl.ARRAY_BUFFER, g_sphereNormBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, g_sphereNormVerts, gl.DYNAMIC_DRAW);
}
