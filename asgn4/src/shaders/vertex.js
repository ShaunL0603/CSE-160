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
    uniform mat4 u_ViewMatrix;
    uniform mat4 u_ProjectionMatrix;
    uniform mat4 u_NormalMatrix;

    uniform float u_UVScale;

    // --- SHADOW VARIABLES ---
    varying vec4 v_PosFromLight;
    uniform mat4 u_LightViewMatrix;
    uniform mat4 u_LightProjMatrix;
    varying vec4 v_PosFromFlashlight;
    uniform mat4 u_FLLightViewMatrix;
    uniform mat4 u_FLLightProjMatrix;

    void main() {
        gl_Position = u_ProjectionMatrix * u_ViewMatrix *  u_ModelMatrix * a_Position;
        v_UV = a_UV * u_UVScale;
        v_Normal = normalize(vec3(u_NormalMatrix * vec4(a_Normal, 1.0)));
        v_VertPos = u_ModelMatrix * a_Position;

        // --- SHADOW CALCULATION ---
        v_PosFromLight = u_LightProjMatrix * u_LightViewMatrix * v_VertPos;
        v_PosFromFlashlight = u_FLLightProjMatrix * u_FLLightViewMatrix * v_VertPos;
    }
    `;

var VSHADER_SOURCE_SHADOW =
    `    
    precision mediump float;

    attribute vec4 a_Position;
    uniform mat4 u_ModelMatrix;
    
    // The "Sun Camera" matrices
    uniform mat4 u_LightViewMatrix;
    uniform mat4 u_LightProjMatrix;
    
    void main() {
        gl_Position = u_LightProjMatrix * u_LightViewMatrix * u_ModelMatrix * a_Position;
    }
    `;