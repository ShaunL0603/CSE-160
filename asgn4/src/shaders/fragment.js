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
    uniform bool u_ShadowsOn;

    // --- SHADOW VARIABLES ---
    uniform sampler2D u_ShadowMapSampler;
    varying vec4 v_PosFromLight;

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

        // --- SHADOW MAPPING MATH ---
        float shadowVisibility = 1.0; 
        
        if (u_ShadowsOn) {
            // Perspective Divide, standardizing coordinates
            vec3 shadowCoord = (v_PosFromLight.xyz / v_PosFromLight.w);
            
            // Convert from WebGL Clip Space (-1 to 1) to Texture UV Space (0 to 1)
            shadowCoord = (shadowCoord + 1.0) * 0.5;

            // Default to fully lit

            // Only calculate shadows if the pixel is actually inside the Sun's camera box
            if (shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 &&
                shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0 &&
                shadowCoord.z >= 0.0 && shadowCoord.z <= 1.0) {

                // Read the depth recorded in Pass 1 (stored in the RED channel)
                float depthFromMap = texture2D(u_ShadowMapSampler, shadowCoord.xy).r;

                // Add a tiny bias to prevent self-shadowing glitchess
                float bias = 0.0001; 

                // If our current distance is greater than the recorded distance,
                // we are in shadow!
                if (shadowCoord.z > depthFromMap + bias) {
                    shadowVisibility = 0.0; // Turn off the light!
                }
            }
        }

        // For sun
        if (u_LightOn) {
            vec3 sunL = normalize(u_LightPos - vec3(v_VertPos));
            float sunNDotL = max(dot(N, sunL), 0.0);
            vec3 sunR = reflect(-sunL, N);
            float sunSpec = pow(max(dot(E, sunR), 0.0), u_Shininess);

            totalDiffuse += vec3(gl_FragColor) * u_LightColor * sunNDotL * 0.7 * shadowVisibility;
            totalSpecular += u_LightColor * sunSpec * shadowVisibility;
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

        // debugging
        // float depthFromMap = texture2D(u_ShadowMapSampler, shadowCoord.xy).r;
        // gl_FragColor = vec4(depthFromMap, depthFromMap, depthFromMap, 1.0);
    }
    `;

var SHADOW_FSHADER_SOURCE =
    `
    precision mediump float;
    void main() {
        // WebGL automatically writes Z-depth to our depth texture.
        // We just write a dummy color here to satisfy the compiler.
        gl_FragColor = vec4(gl_FragCoord.z, 0.0, 0.0, 1.0);
    }
    `;

var SHADOW_FL_FSHADER_SOURCE =
    `
    precision mediump float;
    void main() {
        // satisfy compiler
        gl_FragColor = vec4(gl_FragCoord.z, 0.0, 0.0, 1.0);
    }
    `;