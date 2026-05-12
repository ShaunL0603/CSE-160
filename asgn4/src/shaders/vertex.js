// Vertex shader program
var VSHADER_SOURCE =
    `
    precision mediump float;

    attribute vec4 a_Position;
    attribute vec2 a_UV;
    attribute vec3 a_Normal;

    varying vec2 v_UV;
    varying vec3 v_Normal;
    varying vec4 v_VertPos;

    uniform mat4 u_ModelMatrix;
    // uniform mat4 u_GlobalRotationMatrix;
    uniform mat4 u_ViewMatrix;
    uniform mat4 u_ProjectionMatrix;
    uniform float u_UVScale;

    void main() {
        gl_Position = u_ProjectionMatrix * u_ViewMatrix *  u_ModelMatrix * a_Position;
        v_UV = a_UV * u_UVScale;
        v_Normal = a_Normal;
        v_VertPos = u_ModelMatrix * a_Position;
    }
    `;
