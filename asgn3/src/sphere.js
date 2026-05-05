class Sphere {
    constructor() {
        this.type = "sphere";
        this.color = [1.0, 0.0, 0.0, 1.0];
        this.matrix = new Matrix4();
        this.textureNum = 0; 
        this.UVScale = 1.0;  
    }

    render() {
        var rgba = this.color;
        // Pass texture number
        gl.uniform1i(u_whichTexture, this.textureNum);
        
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
        
        // Scale texture
        gl.uniform1f(u_UVScale, this.UVScale);
        
        // Draw
        gl.drawArrays(gl.TRIANGLES, 0, g_sphereVertices.length / 3);
    }
}

// Global variables for Sphere
var g_sphereVertices = null;
var g_sphereUVVertices = null;
var g_sphereVertBuffer = null;
var g_sphereUVVertBuffer = null;
function createSphereVertices(segments) {
    var d = Math.PI / segments;
    var dd = (Math.PI * 2) / segments;

    let vPositions = [];
    let vUVs = [];

    // Loop through polar and azimuthal angles
    for (var t = 0; t < Math.PI; t += d) {
        for (var s = 0; s < (Math.PI * 2); s += dd) {
            var p1 = [Math.sin(t) * Math.cos(s), Math.cos(t), Math.sin(t) * Math.sin(s)];
            var p2 = [Math.sin(t + d) * Math.cos(s), Math.cos(t + d), Math.sin(t + d) * Math.sin(s)];
            var p3 = [Math.sin(t) * Math.cos(s + dd), Math.cos(t), Math.sin(t) * Math.sin(s + dd)];
            var p4 = [Math.sin(t + d) * Math.cos(s + dd), Math.cos(t + d), Math.sin(t + d) * Math.sin(s + dd)];

            // Map UVs based on current angles relative to total angles (PI and 2*PI)
            var uv1 = [s / (Math.PI * 2), t / Math.PI];
            var uv2 = [s / (Math.PI * 2), (t + d) / Math.PI];
            var uv3 = [(s + dd) / (Math.PI * 2), t / Math.PI];
            var uv4 = [(s + dd) / (Math.PI * 2), (t + d) / Math.PI];

            // Triangle 1
            vPositions.push(...p1, ...p2, ...p4);
            vUVs.push(...uv1, ...uv2, ...uv4);

            // Triangle 2
            vPositions.push(...p1, ...p4, ...p3);
            vUVs.push(...uv1, ...uv4, ...uv3);
        }
    }

    g_sphereVertices = new Float32Array(vPositions);
    g_sphereUVVertices = new Float32Array(vUVs);
}

function createSphereBuffers() {
    g_sphereVertBuffer = gl.createBuffer();
    g_sphereUVVertBuffer = gl.createBuffer();
    if (!g_sphereVertBuffer || !g_sphereUVVertBuffer) {
        console.error("Failed to create global sphere buffers");
        return -1;
    }

    // --- Positions ---
    gl.bindBuffer(gl.ARRAY_BUFFER, g_sphereVertBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, g_sphereVertices, gl.DYNAMIC_DRAW);

    // --- UVs ---
    gl.bindBuffer(gl.ARRAY_BUFFER, g_sphereUVVertBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, g_sphereUVVertices, gl.DYNAMIC_DRAW);
}