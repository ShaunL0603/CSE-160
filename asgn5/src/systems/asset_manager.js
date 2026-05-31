import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { EXRLoader } from 'three/addons/loaders/EXRLoader.js';

export class AssetManager {
    constructor() {
        this.sounds = new Map();
        this.models = new Map();
        this.textures = new Map();
        this.loadingManager = new THREE.LoadingManager();
        this.gltfLoader = new GLTFLoader(this.loadingManager);
        this.textureLoader = new THREE.TextureLoader(this.loadingManager);
        this.exrLoader = new EXRLoader(this.loadingManager);
    }

    async loadAll(audioContext) {
        const progressBar = document.querySelector('.progressbar');
        
        this.loadingManager.onProgress = (url, loaded, total) => {
            if (progressBar) {
                progressBar.style.transform = `scaleX(${loaded / total})`;
            }
        };

        // Manifest of targets to fetch
        const soundAssets = {
            shoot: './assets/sounds/shoot.mp3',
            hit: './assets/sounds/hit.mp3',
            miss: './assets/sounds/miss.mp3'
        };

        const textureAssets = {
            'floor_texture': {
                src: './assets/imgs/asphalt_02_diff_4k.jpg',
                repeat_horizontal: 10,
                repeat_vertical: 10,
            },
            'wood_floor_texture': {
                src: './assets/imgs/plank_flooring_04_diff_1k.jpg',
                repeat_horizontal: 5,
                repeat_vertical: 1,
            },
            'wall_texture': {
                src: './assets/imgs/concrete_slab_wall_02_diff_4k.jpg',
                repeat_horizontal: 10,
                repeat_vertical: 1,
            },
        };

        const exrAssets = {
            "sky_texture": './assets/imgs/citrus_orchard_road_puresky_2k.exr'
        }

        const modelAssets = {
            'witch_glb': './assets/Witch.glb'
        };

        // Load audio
        const audioPromises = Object.entries(soundAssets).map(async ([key, path]) => {
            try {
                const buffer = await this.loadAudioFile(path, audioContext);
                this.sounds.set(key, buffer);
            } catch (e) {
                console.warn(`Could not load audio file: ${path}. Synthesizing dynamic fallbacks.`);
                this.sounds.set(key, null); // Marked for runtime synthesis
            }
        });

        // load sky box texture
        const exrPromises = Object.entries(exrAssets).map(async ([key, path]) => {
            try {
                const exrTexture = await this.loadEXRTexture(path);
                this.textures.set(key, exrTexture); // Cache in textures Map
            } catch (e) {
                console.error(`Failed to load EXR environment: ${path}`, e);
            }
        });

        // Load textures
        const texturePromises = Object.entries(textureAssets).map(async ([key, config]) => {
            try {
                const texture = await this.loadTexture(config);
                this.textures.set(key, texture);
            } catch (e) {
                console.error(`Failed to load model: ${config.src}`, e);
            }
        });

        // Load models
        const modelPromises = Object.entries(modelAssets).map(async ([key, path]) => {
            try {
                const modelGroup = await this.loadGLTFModel(path);
                this.models.set(key, modelGroup);
            } catch (e) {
                console.error(`Failed to load model: ${path}`, e);
            }
        });

        await Promise.all([...audioPromises, ...texturePromises, ...modelPromises]);
        
        // Artificial brief delay for loading screens transitions
        await new Promise(r => setTimeout(r, 400));
    }

    async loadAudioFile(url, audioContext) {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);
        const arrayBuffer = await response.arrayBuffer();
        return await audioContext.decodeAudioData(arrayBuffer);
    }

    loadTexture(config) {
        return new Promise((resolve, reject) => {
            this.textureLoader.load(
                config.src,
                (texture) => {
                    texture.colorSpace = THREE.SRGBColorSpace;
                    // Set up repeat wrapping for scaling/tiling
                    texture.wrapS = THREE.RepeatWrapping;
                    texture.wrapT = THREE.RepeatWrapping;

                    texture.repeat.set(config.repeat_horizontal, config.repeat_vertical);
                    
                    resolve(texture);
                },
                undefined,
                (error) => reject(error)
            );
        });
    }

    loadEXRTexture(src) {
        return new Promise((resolve, reject) => {
            this.exrLoader.load(
                src,
                (texture) => {
                    // Map equirectangular projection coordinate wrapper
                    texture.mapping = THREE.EquirectangularReflectionMapping;
                    // Apply linear color space so WebGL processes the HDR exposures correctly
                    texture.colorSpace = THREE.LinearSRGBColorSpace;
                    
                    resolve(texture);
                },
                undefined,
                (error) => reject(error)
            );
        });
    }

    loadGLTFModel(src) {
        return new Promise((resolve, reject) => {
            this.gltfLoader.load(
                src,
                (gltf) => {
                    const model = gltf.scene;
                    // Traverse the model to enable shadows on all sub-meshes
                    model.traverse((child) => {
                        if (child.isMesh) {
                            child.castShadow = true;
                            child.receiveShadow = true;
                        }
                    });
                    resolve(model);
                },
                undefined, // Progress is handled globally by loading manager
                (error) => reject(error)
            );
        });
    }
}