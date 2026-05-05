// Vertex shader program
var VSHADER_SOURCE =
    `
    precision mediump float;

    attribute vec4 a_Position;
    attribute vec2 a_UV;

    varying vec2 v_UV;

    uniform mat4 u_ModelMatrix;
    // uniform mat4 u_GlobalRotationMatrix;
    uniform mat4 u_ViewMatrix;
    uniform mat4 u_ProjectionMatrix;
    uniform float u_UVScale;

    void main() {
        gl_Position = u_ProjectionMatrix * u_ViewMatrix *  u_ModelMatrix * a_Position;
        v_UV = a_UV * u_UVScale;
    }
    `;

// Fragment shader program
var FSHADER_SOURCE =
    `
    precision mediump float;

    varying vec2 v_UV;

    uniform vec4 u_FragColor;
    uniform sampler2D u_Sampler0; // Debug texture
    uniform sampler2D u_Sampler1; // Sky texture
    uniform sampler2D u_Sampler2; // Ground texture
    uniform sampler2D u_Sampler3; // Wall texture
    uniform int u_whichTexture;

    void main() {
        if (u_whichTexture == -2) {
            gl_FragColor = u_FragColor; // use color
        } else if (u_whichTexture == -1) {
            gl_FragColor = texture2D(u_Sampler0, v_UV); // use debug texture
        } else if (u_whichTexture == 0) {
            gl_FragColor = texture2D(u_Sampler1, v_UV); // use sky texture
        } else if (u_whichTexture == 1) {
            gl_FragColor = texture2D(u_Sampler2, v_UV); // use ground texture
        } else if (u_whichTexture == 2) {
            gl_FragColor = texture2D(u_Sampler3, v_UV); // use wall texture
        }else {
            gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0); // Error, put red
        }
    }
    `;
