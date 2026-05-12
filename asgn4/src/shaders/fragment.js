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
    uniform sampler2D u_Sampler4; // 2nd wall texture
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
        } else if (u_whichTexture == 3) {
            gl_FragColor = texture2D(u_Sampler4, v_UV); // use 2nd wall texture
        } else {
            gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0); // Error, put red
        }
    }
    `;
