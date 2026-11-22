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
);
cam.position.z = 3;

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// ===============================================
// 3D Drawing goes here
// ===============================================
// Es krim spehere ada 3 biji
// AI FIX - ini emang bisa dalem struct tuh manggil variabel di dalem struct dirinya sendiri? biar dapetin variabel dari dalem struktur dirinya sendiri gimana sih? --> Tidak bisa. Harus bikin mesh-nya di luar struct.
const circTop = {
    geo: new THREE.SphereGeometry(0.2, 32, 16), // params: radius, widthSegments, heightSegments
    mat: new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: false }),
}
const circTopMesh = new THREE.Mesh(circTop.geo, circTop.mat);

const circMid = {
    geo: new THREE.SphereGeometry(0.5, 32, 16),
    mat: new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: false }),
}
const circMidMesh = new THREE.Mesh(circMid.geo, circMid.mat)

const circBot = {
    geo: new THREE.SphereGeometry(0.6, 32, 16),
    mat: new THREE.MeshBasicMaterial({ color: 0xffdddd, wireframe: false }),
}
const circBotMesh = new THREE.Mesh(circBot.geo, circBot.mat)

// cone es krim dari cone biasa tapi dibalik
const cone = {
    geo: new THREE.ConeGeometry(0.55, 1.5, 32), // params: radius, height, radialSegments
    mat: new THREE.MeshBasicMaterial({ color: 0xbd9d59, wireframe: false }),
}
const coneMesh = new THREE.Mesh(cone.geo, cone.mat)

// atur posisi tiap mesh-nya
// USER
circTopMesh.position.y = 1.3;
circMidMesh.position.y = 0.7;
circBotMesh.position.y = 0.2;
coneMesh.position.y = -0.80;
coneMesh.rotation.x = 3.14

// add to scene
scene.add(circTopMesh);
scene.add(circMidMesh);
scene.add(circBotMesh);
scene.add(coneMesh);

// Animasikan untuk berputar terhadap sumbu Y
function animate() {
    circTopMesh.rotation.y += 0.01;
    circMidMesh.rotation.y += 0.01;
    circBotMesh.rotation.y += 0.01;
    coneMesh.rotation.y += 0.01;

    renderer.render(scene, cam);
    requestAnimationFrame(animate);
}
animate();

// rengder it
renderer.render(scene, cam);