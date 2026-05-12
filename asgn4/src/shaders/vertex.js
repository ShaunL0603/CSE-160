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
