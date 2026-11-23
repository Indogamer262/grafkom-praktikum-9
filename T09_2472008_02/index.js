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
cam.position.z = 3.5;
//cam.position.y = -3.0
//cam.rotation.x = 0.50;

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// ===============================================
// 3D Drawing goes here
// ===============================================
// gambar Krystal, terdiri dari:
// atas meruncing
// tengah melebar dengan 6 sisi
// bawah meruncing
const geometry = new THREE.BufferGeometry();

// bagian tengah melebar dihitung dengan rumus
// (R*cos(theta), 0, R*sin(theta))
// ada 6 steps --> 60 degree each, R=1
// - (1*cos(0), 0, 1*sin(0))
// - (1*cos(60), 0, 1*sin(60))
// - (1*cos(120), 0, 1*sin(120))
// - (1*cos(180), 0, 1*sin(180))
// - (1*cos(240), 0, 1*sin(240))
// - (1*cos(300), 0, 1*sin(300))

/*
let theta = 0;
let step = Math.PI / 3;

for (let i = 0; i < 6; i++) {
    let x = Math.cos(theta);
    let z = Math.sin(theta);
    console.log(`${x.toFixed(2)}, 0, ${z.toFixed(2)},`);
    theta += step;
}
*/

const vertices = new Float32Array([
    // atas meruncing
    0, 2.0, 0,
    // tengah melebar
    1.00, 0, 0.00,
    0.50, 0, 0.87,
    -0.50, 0, 0.87,
    -1.00, 0, 0.00,
    -0.50, 0, -0.87,
    0.50, 0, -0.87,
    // bawah meruncing
    0, -2.0, 0
]);
geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3))

// AI GEN - untuk ./T09_2472008_02/index.js  ini hasilnya kok masih beda yah sama di soal Praktikum 09.pdf dan itu di soal pewarnaanya gimana ceritanya?
// 1. Buat array warna (Float32Array) dengan ukuran sama seperti vertices
// Format: R, G, B per vertex (rentang nilai 0.0 s/d 1.0)
const colors = new Float32Array([
    // Index 0: Puncak atas (Magenta)
    1.0, 0.0, 1.0, 0.85,
    // Index 1 - 6: Titik heksagon tengah (Cyan)
    0.0, 1.0, 1.0, 0.85,
    // USER
    1.0, 0.0, 1.0, 0.85,
    // AI GEN - untuk ./T09_2472008_02/index.js  ini hasilnya kok masih beda yah sama di soal Praktikum 09.pdf dan itu di soal pewarnaanya gimana ceritanya?
    0.0, 1.0, 1.0, 0.85,
    0.0, 1.0, 1.0, 0.85,
    // USER
    1.0, 0.0, 1.0, 0.85,
    // AI GEN - untuk ./T09_2472008_02/index.js  ini hasilnya kok masih beda yah sama di soal Praktikum 09.pdf dan itu di soal pewarnaanya gimana ceritanya?
    0.0, 1.0, 1.0, 0.85,
    // Index 7: Puncak bawah (Magenta)
    1.0, 0.0, 1.0, 0.85,
]);
geometry.setAttribute('color', new THREE.BufferAttribute(colors, 4));

// AI FIX - kali ini hasilnya adalah blank hitam, bagaimana sebanarnya cara penggunaan SetIndex yang tepat? --> Penyebab layarnya blank hitam adalah karena geometry.setIndex() mengharapkan array 1 dimensi datar (flat array), bukan array 2 dimensi (array di dalam array). Cukup hilangkan kurung siku di tiap barisnya sehingga menjadi array 1 dimensi.
geometry.setIndex([
    0, 1, 2,
    0, 2, 3,
    0, 3, 4,
    0, 4, 5,
    0, 5, 6,
    0, 6, 1,
    7, 1, 2,
    7, 2, 3,
    7, 3, 4,
    7, 4, 5,
    7, 5, 6,
    7, 6, 1,
])

// AI MOD - untuk ./T09_2472008_02/index.js  ini hasilnya kok masih beda yah sama di soal Praktikum 09.pdf dan itu di soal pewarnaanya gimana ceritanya? --> Ubah material agar membaca vertexColors dan merender solid (wireframe: false)
const material = new THREE.MeshBasicMaterial({ vertexColors: true, side: THREE.DoubleSide, transparent: true });

// USER
const materialFrame = new THREE.MeshBasicMaterial({ color: 0x00ffff, wireframe: true });
const mesh = new THREE.Mesh(geometry, material)
const meshFrame = new THREE.Mesh(geometry, materialFrame)

// add to scene
scene.add(mesh);
scene.add(meshFrame)

// Animasikan untuk berputar terhadap sumbu Y
function animate() {
    mesh.rotation.y += 0.01;
    meshFrame.rotation.y += 0.01;

    renderer.render(scene, cam);
    requestAnimationFrame(animate);
}
//animate();

// rengder it
mesh.rotation.y = 0.01;
meshFrame.rotation.y = 0.01;
renderer.render(scene, cam);