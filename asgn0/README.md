### Assignment 0: Vector Library

This assignment introduces us to WebGL and reviews select concepts from linear algebra. Uses a modified matrix library provided by the WebGL Programming Guide textbook by Kouichi Matsuda and Rodger Lea.

## Assignment Objectives:
- How to create objected oriented graphics projects in Javascript.
- How to draw to a <canvas> element using a 2D context.
- Review fundamental concepts of Linear Algebra.

## Files involved and directories

Relevant files, directories, and their descriptions


**/lib**: Folder contains the matrix library 'cuon-matrix-cse160.js'.

**/src**: Folder contains .html and .js files.

**cuon-matrix-cse160.js**: Matrix library provided bby the WebGL textbook that's been modified to support basic vector x vector operations.

**asgn0.html**: Interface for users of the site.

**asgn0.js**: main file with functions to produce vectors in the canvas.

## References

Matrix Library: WebGL Programming Guide by Matsuda & Lea from this link https://sites.google.com/site/webglbook/home/downloads.
CSE 160 assignment 0 vidoe playlist. Link: https://www.youtube.com/watch?v=CkbO7_jYAmM&list=PLbyTU_tFIkcOUaZ9kLznqF6Eyv4jUwgmS.
Google AI overview

## Additional Information

- asgn0.css in the 'assets' folder in the 'src' folder holds nothing.
- Uses vector3s but z coordinates set to zero.
- Only one, two, or three vectors drawn at one time.
- Results from the operations 'Magnitude', 'Angle Between', and 'Area' are printed to the console. Will not draw anything new to the canvas.
- New vectors from an operation will be displayed as green in the canvas
- 'Multiply' and 'Divide' are the only operations requiring a scalar input. Will display nothing new if no input in scalar box.