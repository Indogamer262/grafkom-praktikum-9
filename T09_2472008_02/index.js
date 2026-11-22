// 2472008 - Christian Anthony Hermawan

// USER
import * as THREE from "three";
import { WireframeGeometry } from "three";

const scene = new THREE.Scene();

// satuan asumsikan dalam meters
const cam = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
); // params: fov, aspect ratio, near, far
cam.position.z = 3;

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// ===============================================
// 3D Drawing goes here
// ===============================================
// Prisma dengan manual vetex THREE.BufferGeometry
const vertices = [
    
];

const geometry = new THREE.BufferGeometry().setFromPoints(vertices);
const material = new THREE.MeshNormalMaterial();
const diamondMesh = new THREE.Mesh(geometry, material)

// add to scene
scene.add(diamondMesh);

//function animate() {
//    renderer.render(scene, cam);
//    requestAnimationFrame(animate);
//}
//animate();

// rengder it
renderer.render(scene, cam);