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
    uniform vec3 u_CameraAtPos;
    uniform bool u_FlashlightOn;

    uniform vec3 u_LightColor;
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

        // --- LIGHTING ---
        vec3 N = normalize(v_Normal);
        vec3 E = normalize(u_CameraPos - vec3(v_VertPos)); // Eye vector
        vec3 ambient = vec3(gl_FragColor) * 0.3; // Ambient is always present

        vec3 totalDiffuse = vec3(0.0);
        vec3 totalSpecular = vec3(0.0);

        // For sun
        if (u_LightOn) {
            vec3 sunL = normalize(u_LightPos - vec3(v_VertPos));
            float sunNDotL = max(dot(N, sunL), 0.0);
            vec3 sunR = reflect(-sunL, N);
            float sunSpec = pow(max(dot(E, sunR), 0.0), u_Shininess);

            totalDiffuse += vec3(gl_FragColor) * u_LightColor * sunNDotL * 0.7;
            totalSpecular += u_LightColor * sunSpec;
        }

        // For flashlight (SPOTLIGHT)
        if (u_FlashlightOn) {
            vec3 flashL = normalize(u_CameraPos - vec3(v_VertPos)); // Vector TO the camera
            vec3 spotDir = normalize(u_CameraAtPos - u_CameraPos); // Where camera is looking
            
            // dot product of inverted light vector and spot direction
            float spotDot = dot(-flashL, spotDir); 
            
            // Cutoff angle 15 degrees, cos(15) about 0.965
            float cutoff = 0.965; 

            // If pixel inside 15-degree cone
            if (spotDot > cutoff) {
                float flashNDotL = max(dot(N, flashL), 0.0);
                vec3 flashR = reflect(-flashL, N);
                float flashSpec = pow(max(dot(E, flashR), 0.0), u_Shininess);

                // Add a smooth falloff to the edges of the flashlight beam
                float edgeFalloff = pow(spotDot, 20.0); 
                vec3 flashColor = vec3(1.0, 1.0, 1.0); // White flashlight

                totalDiffuse += vec3(gl_FragColor) * flashColor * flashNDotL * 0.8 * edgeFalloff;
                totalSpecular += flashColor * flashSpec * edgeFalloff;
            }
        }

        // --- COMBINE, APPLY TO TEXTURES ---
        if (u_WhichTexture == t_SKY) {
            gl_FragColor = vec4(gl_FragColor.rgb, 1.0); // Sky ignores all light
        } else if (u_WhichTexture == t_GROUND || u_WhichTexture == t_WALL || u_WhichTexture == t_RANGEWALL) {
            gl_FragColor = vec4(totalDiffuse + ambient, 1.0); // No specular for maze/ground
        } else {
            gl_FragColor = vec4(totalSpecular + totalDiffuse + ambient, 1.0); // Everything else
        }
    }
    `;