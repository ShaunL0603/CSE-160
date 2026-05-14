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
    varying vec4 v_VertPos;

    uniform vec3 u_LightPos;
    uniform vec3 u_CameraPos;
    uniform vec4 u_FragColor;
    uniform sampler2D u_Sampler0; // Debug texture
    uniform sampler2D u_Sampler1; // Sky texture
    uniform sampler2D u_Sampler2; // Ground texture
    uniform sampler2D u_Sampler3; // Wall texture
    uniform sampler2D u_Sampler4; // 2nd wall texture
    uniform int u_WhichTexture;
    uniform float u_Shininess;
    uniform bool u_ShowNormals;
    uniform bool u_ShowTexture;
    uniform bool u_LightOn;

    void main() {
        if (u_ShowTexture) {
            if (u_WhichTexture == t_DEBUG) {
                gl_FragColor = texture2D(u_Sampler0, v_UV); // use debug texture
            } else if (u_WhichTexture == t_SKY) {
                gl_FragColor = texture2D(u_Sampler1, v_UV); // use sky texture
            } else if (u_WhichTexture == t_GROUND) {
                gl_FragColor = texture2D(u_Sampler2, v_UV); // use ground texture
            } else if (u_WhichTexture == t_WALL) {
                gl_FragColor = texture2D(u_Sampler3, v_UV); // use wall texture
            } else if (u_WhichTexture == t_RANGEWALL) {
                gl_FragColor = texture2D(u_Sampler4, v_UV); // use 2nd wall texture
            } else {
                gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0); // Error, put red
            }
        } else if (!u_ShowTexture) {
            if (u_ShowNormals) {
                gl_FragColor = vec4((v_Normal + 1.0) * 0.5, 1.0); // use normal
            } else {
                gl_FragColor = u_FragColor;
            }
        } else {
            gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0); // Error, put red
        }

        if (!u_LightOn) return;
        
        // light distance
        vec3 lightVec = u_LightPos - vec3(v_VertPos);
        float r = length(lightVec);
        // N dot L
        vec3 L = normalize(lightVec);
        vec3 N = normalize(v_Normal);
        float nDotL = max(dot(N, L), 0.0);
        // Reflection
        vec3 R = reflect(-L, N);
        // eye
        vec3 E = normalize(u_CameraPos - vec3(v_VertPos));
        // Specular
        // if (!u_Shininess) u_Shininess = 10.0;
        float specular = pow(max(dot(E, R), 0.0), u_Shininess);
    
        vec3 diffuse = vec3(gl_FragColor) * nDotL * 0.7;
        vec3 ambient = vec3(gl_FragColor) * 0.3;

        if (u_WhichTexture == t_SKY) {
            gl_FragColor = vec4(gl_FragColor.rgb, 1.0);
        } else if (u_WhichTexture == t_GROUND) {
            gl_FragColor = vec4(diffuse + ambient, 1.0);
        } else if (u_WhichTexture == t_WALL) {
            gl_FragColor = vec4(diffuse + ambient, 1.0);
        } else if (u_WhichTexture == t_RANGEWALL) {
            gl_FragColor = vec4(diffuse + ambient, 1.0);
        } else {
            gl_FragColor = vec4(specular + diffuse + ambient, 1.0);
        }
    }
    `;
