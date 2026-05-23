
// Three JS globals
var canvas;
var renderer;
var scene;
var loader;

// camera globals
var camera;
const fov = 120;
const aspect = 1;
const near = 0.1;
const far = 5;

// cube gemoetry globals
let cubes = [];
var flowerCube;
const boxWidth = 1;
const boxHeight = 1;
const boxDepth = 1;

// texture globals
let wallSrc = "./assets/imgs/wall.jpg";
let materials = [];
let textureSources = [
    "./assets/imgs/flower-1.jpg",
    "./assets/imgs/flower-2.jpg",
    "./assets/imgs/flower-3.jpg",
    "./assets/imgs/flower-4.jpg",
    "./assets/imgs/flower-5.jpg",
    "./assets/imgs/flower-6.jpg"
];