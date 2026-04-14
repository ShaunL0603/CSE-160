class Cube extends Point {
  constructor() {
      super();
      this.type = "cube";
      this.matrix = new Matrix4();
  }

  render() {

    //var xy = this.position;
    var rgba = this.color;

    // Pass the color of a circle to u_FragColor variable
    gl.uniform4f(u_FragColor, rgba[0], rgba[1], rgba[2], rgba[3]);

    //drawTriangle3D([xy[0], xy[1], xy[2], xy[0], xy[1]+0.1, xy[2], xy[0]+0.1, xy[1], xy[2]]);

    // Pass the matrix to u_ModelMatrix attribute
    gl.uniformMatrix4fv(u_ModelMatrix, false, this.matrix.elements);

    
    // Front of cube
    drawTriangle3D([0.0, 0.0, 0.0, 1.0, 1.0, 0.0, 1.0, 0.0, 0.0]);
    drawTriangle3D([0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 0.0]);
    
    // Fake lighting by darkening the color for the other faces
    gl.uniform4f(u_FragColor, rgba[0]*.9, rgba[1]*.9, rgba[2]*.9, rgba[3]);

    // Top of cube
    drawTriangle3D( [0.0, 1.0, 0.0, 0.0, 1.0, 1.0, 1.0, 1.0, 1.0] );
    drawTriangle3D( [0.0, 1.0, 0.0, 1.0, 1.0, 1.0, 1.0, 1.0, 0.0] );

    // // Back of cube
    // drawTriangle3D([0.0, 0.0, -1.0, 1.0, 1.0, -1.0, 1.0, 0.0, -1.0]);
    // drawTriangle3D([0.0, 0.0, -1.0, 0.0, 1.0, -1.0, 1.0, 1.0, -1.0]);

    // // Left of cube
    // drawTriangle3D([0.0, 0.0, 0.0, 0.0, 1.0, -1.0, 0.0, 1.0, 0.0]);
    // drawTriangle3D([0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, -1.0]);

    // // Right of cube
    // drawTriangle3D([1.0, 0.0, 0.0, 1.0, 1.0, -1.0, 1.0, 1.0, 0.0]);
    // drawTriangle3D([1.0, 0.0, 0.0, 1.0, 1.0, 0.0, 1.0, 1.0, -1.0]);
  }
}
