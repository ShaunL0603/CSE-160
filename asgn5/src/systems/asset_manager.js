import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

export class AssetManager {
    constructor() {
        this.sounds = new Map();
        this.models = new Map();
        this.textures = new Map();
        this.loadingManager = new THREE.LoadingManager();
        this.gltfLoader = new GLTFLoader(this.loadingManager);
        this.textureLoader = new THREE.TextureLoader(this.loadingManager);
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
            "sky_texture": './assets/imgs/sky_cloud.jpg'
        };

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

        // Load textures
        const texturePromises = Object.entries(textureAssets).map(async ([key, path]) => {
            try {
                const texture = await this.loadTexture(path);
                this.textures.set(key, texture);
            } catch (e) {
                console.error(`Failed to load model: ${path}`, e);
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

    loadTexture(src) {
        return new Promise((resolve, reject) => {
            this.textureLoader.load(
                src,
                (texture) => {
                    texture.colorSpace = THREE.SRGBColorSpace;
                    // Set up repeat wrapping for scaling/tiling
                    texture.wrapS = THREE.RepeatWrapping;
                    texture.wrapT = THREE.RepeatWrapping;
                    
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