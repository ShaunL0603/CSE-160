class Square extends Point {
  constructor() {
      super();
      this.type = "square";
  }

  render() {
      var xy = this.position;
      var rgba = this.color;

      // Pass the color of a square to u_FragColor variable
      gl.uniform4f(u_FragColor, rgba[0], rgba[1], rgba[2], rgba[3]);
      // Pass the size of a square to u_Size variable
      gl.uniform1f(u_Size, this.size);  

      // Draw
      var d = this.size/200.0; // delta
      var scaledX = d * this.scaleX;
      var scaledY = d * this.scaleY;
      drawTriangle([xy[0]-scaledX, xy[1]+scaledY, xy[0]-scaledX, xy[1]-scaledY, xy[0]+scaledX, xy[1]+scaledY]);
      drawTriangle([xy[0]+scaledX, xy[1]+scaledY, xy[0]-scaledX, xy[1]-scaledY, xy[0]+scaledX, xy[1]-scaledY]);
  }
}
