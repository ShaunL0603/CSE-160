import * as THREE from 'three';

export class AssetManager {
    constructor() {
        this.sounds = new Map();
        this.loadingManager = new THREE.LoadingManager();
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

        // Process parallel loading with grace fallbacks
        await Promise.all(
            Object.entries(soundAssets).map(async ([key, path]) => {
                try {
                    const buffer = await this.loadAudioFile(path, audioContext);
                    this.sounds.set(key, buffer);
                } catch (e) {
                    console.warn(`Could not load audio file: ${path}. Synthesizing dynamic fallbacks.`);
                    this.sounds.set(key, null); // Marked for runtime synthesis
                }
            })
        );
        
        // Artificial brief delay for loading screens transitions
        await new Promise(r => setTimeout(r, 400));
    }

    async loadAudioFile(url, audioContext) {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);
        const arrayBuffer = await response.arrayBuffer();
        return await audioContext.decodeAudioData(arrayBuffer);
    }
}