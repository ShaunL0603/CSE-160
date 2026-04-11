## Assignment 1
A simple web program that allows users to draw geometric shapes made out of points and triangles.

### Assignment Objectives
- To create a simple paint program that draws on the screen when you drag with your mouse.  
- To draw a simple picture using a set of triangles

### Files and directories involved
- **/src**: source folder.
- **/lib**: libraries folder.
- **/assets**: Contains files for style, e.g. css files.
- **asgn1.html**: Web page containing the paint program.
- **asgn1.js**: Holds main() function and all necessary functions to run paint program.
- **Triangle.js**: Holds classes for points, triangles, squares, and circles, OOP.
- **asgn1.css**: Style sheet. Currently just holds code that fixes the slider spazzing out when moving between singular and multiple digit values.

### Known issues
- In drag mode
    - if you move the mouse too fast you could potentially lose the shape you're dragging. Most prominent for smaller sized shapes (around size of 16).
    - You can usually keep dragging the same shape across another shape but sometimes the mouse will grab hold of the other shape. Most likely due to the previous issue.

### Additional Information
- You can have both modes active but delete mode will take precedent over dragging, but should be expected.
- Default values of the shape scaling is 1. You can set the size to the max (40) and the x and y scaling values to 5 that creates a large shape that covers the whole canvas. Opposite is true.
- Distance between newly created shapes adjusted based on the shapes size.
    - Currently, more shapes would be created if the size is smaller while fewer shapes will be crated for larger sizes.
- I used the 'awesome' implementations to create the image.

### References
UCSC CSE 160 Prof. James assignment playlist: https://www.youtube.com/watch?v=rfyhLGeylGA&list=PLbyTU_tFIkcMK5FiV6btXxHQAy15p0j7X
Google AI Overview/Gemini 3: "Checking distance between new shapes being created.", "Changing text on the web page based off values from the sliders."