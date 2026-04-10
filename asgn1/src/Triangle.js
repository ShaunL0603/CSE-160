class Point {
  constructor() {
      this.type = "point";
      this.position = [0.0, 0.0, 0.0];
      this.color = [1.0, 1.0, 1.0, 1.0];
      this.size = 10.0;
      this.scaleX = 1.0;
      this.scaleY = 1.0;
  }

  contains(x, y) {
    var d = this.size / 200.0;
    return (x >= this.position[0] - d && x <= this.position[0] + d && 
            y >= this.position[1] - d && y <= this.position[1] + d);
  }
}

class Triangle extends Point {
    constructor() {
        super();
        this.type = "triangle";
    }

    render() {
        var xy = this.position;
        var rgba = this.color;

        // Pass the color of a triangle to u_FragColor variable
        gl.uniform4f(u_FragColor, rgba[0], rgba[1], rgba[2], rgba[3]);
        // Pass the size of a triangle to u_Size variable
        gl.uniform1f(u_Size, this.size);
        // Draw
        var d = this.size/200.0; // delta
        var scaledX = d * this.scaleX;
        var scaledY = d * this.scaleY;
        drawTriangle([xy[0], xy[1]+scaledY, xy[0]-scaledX, xy[1]-scaledY, xy[0]+scaledX, xy[1]-scaledY]);
    }
}

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

class Circle extends Point {
  constructor() {
      super();
      this.type = "circle";
      this.segments = 10;
  }

  render() {
      var xy = this.position;
      var rgba = this.color;

      // Pass the color of a circle to u_FragColor variable
      gl.uniform4f(u_FragColor, rgba[0], rgba[1], rgba[2], rgba[3]);
      // Pass the size of a circle to u_Size variable
      gl.uniform1f(u_Size, this.size);
      // Draw
      var d = this.size/200.0;
      var scaledX = d * this.scaleX;
      var scaledY = d * this.scaleY;

      var angleStep = 360/this.segments;
      for (var angle = 0; angle < 360; angle=angle+angleStep) {
        let centerPt = [xy[0], xy[1]];
        let angle1 = angle;
        let angle2 = angle + angleStep;
        let vec1 = [Math.cos(angle1*Math.PI/180)*scaledX, Math.sin(angle1*Math.PI/180)*scaledY];
        let vec2 = [Math.cos(angle2*Math.PI/180)*scaledX, Math.sin(angle2*Math.PI/180)*scaledY];
        let pt1 = [centerPt[0]+vec1[0], centerPt[1]+vec1[1]];
        let pt2 = [centerPt[0]+vec2[0], centerPt[1]+vec2[1]];

        drawTriangle([xy[0], xy[1], pt1[0], pt1[1], pt2[0], pt2[1]]);
      }
  }
}

function drawTriangle(vertices) {
  var n = 3; // The number of vertices

  // Create a buffer object
  var vertexBuffer = gl.createBuffer();
  if (!vertexBuffer) {
    console.log('Failed to create the buffer object');
    return -1;
  }

  // Bind the buffer object to target
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
  // Write date into the buffer object
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.DYNAMIC_DRAW);
  
  // Assign the buffer object to a_Position variable
  gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0);

  // Enable the assignment to a_Position variable
  gl.enableVertexAttribArray(a_Position);

  gl.drawArrays(gl.TRIANGLES, 0, n);
}