class Sphere {
    constructor() {
        this.type = "sphere";
        this.color = [1.0, 0.0, 0.0, 1.0];
        this.matrix = new Matrix4();
        this.segments = 8;

        this.buffer = null;
        this.colorBuffer = null;
        this.vertices = null;
        this.colorShades = null;
    }

    generateVertices() {
        var d = Math.PI / this.segments;
        var dd = (Math.PI * 2) / this.segments;

        let v1 = [];
        let v2 = [];
        for (var t = 0; t < Math.PI; t += d) {
            for (var s = 0; s < (Math.PI * 2); s += dd) {
                var p1 = [Math.sin(t) * Math.cos(s), Math.cos(t), Math.sin(t) * Math.sin(s)];
                var p2 = [Math.sin(t + d) * Math.cos(s), Math.cos(t + d), Math.sin(t + d) * Math.sin(s)];
                var p3 = [Math.sin(t) * Math.cos(s + dd), Math.cos(t), Math.sin(t) * Math.sin(s + dd)];
                var p4 = [Math.sin(t + d) * Math.cos(s + dd), Math.cos(t + d), Math.sin(t + d) * Math.sin(s + dd)];

                // var v1 = [];
                v1 = v1.concat(p1);
                v1 = v1.concat(p2);
                v1 = v1.concat(p4);

                // let uvColor = [rgba[0] * (1 - t / Math.PI), rgba[1] * (1 - t / Math.PI), rgba[2] * (1 - t / Math.PI), rgba[3]];
                // gl.uniform4f(u_FragColor, uvColor[0], uvColor[1], uvColor[2], uvColor[3]);

                // var v2 = [];
                v2 = v2.concat(p1);
                v2 = v2.concat(p4);
                v2 = v2.concat(p3);
            }
        }

        v1 = v1.concat(v2);
        this.vertices = new Float32Array(v1);
    }

    generateColorShades() {
        let [r, g, b, a] = this.color;
        // console.log(r, g, b, a);
    
        // let shades = [1.0, 0.83, 0.66, 0.49, 0.32, 0.15];
        let colorData = [];
        
        let vertexCount = this.vertices.length / 3;
        for (let i = 0; i < vertexCount; ++i) {
            colorData.push(r, g, b, a);
        }
    
        this.colorShades = new Float32Array(colorData);
    }

    render() {
        // var rgba = this.color;
        // // Pass the color of a circle to u_FragColor variable
        // gl.uniform4f(u_FragColor, rgba[0], rgba[1], rgba[2], rgba[3]);

        // Pass the matrix to u_ModelMatrix attribute
        gl.uniformMatrix4fv(u_ModelMatrix, false, this.matrix.elements);

        drawTriangle3D(this);
    }
}