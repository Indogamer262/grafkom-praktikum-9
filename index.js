import * as THREE from "three";
import { WireframeGeometry } from "three";

const scene = new THREE.Scene();

// satuan asumsikan dalam meters
const cam = new THREE.PerspectiveCamera(
    75,
    window.innerWidth/window.innerHeight,
    0.1,
    1000
);
cam.position.z = 3;

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Start drawing
// BOX
let boxGeo = new THREE.BoxGeometry(1,1,1,1);
let boxMat = new THREE.MeshBasicMaterial({color:0xffFF00,wireframe:true});

// SPHERE
const geometry = new THREE.SphereGeometry(0.6, 32, 16 );
const material = new THREE.MeshBasicMaterial( {color:0x00ff00, wireframe:true} );

// Create MESH
let boxMesh = new THREE.Mesh(boxGeo, boxMat);
let boxMesh2 = new THREE.Mesh(boxGeo, boxMat);
let boxMesh3 = new THREE.Mesh(boxGeo, boxMat);
const sphere = new THREE.Mesh(geometry, material);

boxMesh2.position.x += 1.5;
boxMesh3.position.x -= 1.5;
sphere.position.x = 0;

scene.add(boxMesh);
scene.add(boxMesh2);
scene.add(boxMesh3);
scene.add(sphere);

function animate() {
    boxMesh.rotation.x += 0.01;
    boxMesh2.rotation.z += 0.01;

    boxMesh3.rotation.x += 0.01;
    boxMesh3.rotation.z += 0.01;

    boxMesh.position.y += 0.01;

    renderer.render(scene,cam);
    requestAnimationFrame(animate);
}
animate();
