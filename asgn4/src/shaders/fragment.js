// Fragment shader program
var FSHADER_SOURCE =
    `
    precision mediump float;
    #define t_COLOR -2
    #define t_DEBUG -1
    #define t_SKY 0
    #define t_GROUND 1
    #define t_WALL 2
    #define t_RANGEWALL 3

    varying vec2 v_UV;
    varying vec3 v_Normal;

    uniform vec4 u_FragColor;
    uniform sampler2D u_Sampler0; // Debug texture
    uniform sampler2D u_Sampler1; // Sky texture
    uniform sampler2D u_Sampler2; // Ground texture
    uniform sampler2D u_Sampler3; // Wall texture
    uniform sampler2D u_Sampler4; // 2nd wall texture
    uniform int u_whichTexture;

    void main() {
        if (u_whichTexture == t_COLOR) {
            gl_FragColor = u_FragColor; // use color
        } else if (u_whichTexture == t_DEBUG) {
            gl_FragColor = texture2D(u_Sampler0, v_UV); // use debug texture
        } else if (u_whichTexture == t_SKY) {
            gl_FragColor = texture2D(u_Sampler1, v_UV); // use sky texture
        } else if (u_whichTexture == t_GROUND) {
            gl_FragColor = texture2D(u_Sampler2, v_UV); // use ground texture
        } else if (u_whichTexture == t_WALL) {
            gl_FragColor = texture2D(u_Sampler3, v_UV); // use wall texture
        } else if (u_whichTexture == t_RANGEWALL) {
            gl_FragColor = texture2D(u_Sampler4, v_UV); // use 2nd wall texture
        } else {
            gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0); // Error, put red
        }
    }
    `;
