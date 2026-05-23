import * as THREE from 'three';


function main() {
    // Loading three.js
    canvas = document.querySelector('#c');
    renderer = new THREE.WebGLRenderer({antialias: true, canvas});
    // setting up camera
    camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.z = 2;
    // set up scene
    scene = new THREE.Scene();
    // loading manager
    const loadManager = new THREE.LoadingManager();
    loader = new THREE.TextureLoader(loadManager);
    const loadingElement = document.querySelector('#loading');
    const progressBarElement = loadingElement.querySelector('.progressbar');
    // set up cube's geometry and material
    const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);
    // creating light
    const color = 0xFFFFFF;
    const intensity = 3;
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(-1, 2, 4);
    scene.add(light);

    // loading flower cube
    loadManager.onLoad = () => {
        loadingElement.style.display = 'none';
        const flowerCube = new THREE.Mesh(geometry, materials);
        flowerCube.position.y = -2;
        scene.add(flowerCube);
        cubes.push(flowerCube);
        cubes.push(makeInstance(geometry, 0x44aa88,  0, 0, wallTexture));
        cubes.push(makeInstance(geometry, 0x8844aa, -2));
        cubes.push(makeInstance(geometry, 0xaa8844,  2));
    };
    loadManager.onProgress = (urlOfLastItemLoaded, itemsLoaded, itemsTotal) => {
        const progress = itemsLoaded / itemsTotal;
        progressBarElement.style.transform = `scaleX(${progress})`;
    };
    // textures
    let wallTexture = initTextures(wallSrc);
    for (let i = 0; i < textureSources.length; ++i) {
        let texture = new THREE.MeshPhongMaterial({ map: initTextures(textureSources[i]) });
        materials.push(texture);
    }
    
    // render scene
    requestAnimationFrame(render);
}

function initTextures(src) {
    const texture = loader.load(src);
    texture.colorSpace = THREE.SRGBColorSpace;
    return texture;
}

function makeInstance(geometry, color, x = 0, y = 0, texture) {
    let material;
    if (texture !== undefined) { 
        material = new THREE.MeshPhongMaterial({
            map: texture
        });
    } else {
        material = new THREE.MeshPhongMaterial({
            color, 
        });
    }
    // create cube mesh, nead geometry (shape of object) and material (how to draw object)
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);
    cube.position.x = x;
    cube.position.y = y;
    
    return cube;
}

function render(time) {
    time *= 0.001; // conver time to seconds

    cubes.forEach((cube, ndx) => {
        const speed = 1 + ndx * 0.1;
        const rot = time * speed;

        cube.rotation.x = rot;
        cube.rotation.y = rot;
    });

    renderer.render(scene, camera);
    requestAnimationFrame(render);
}

main();