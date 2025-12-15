import * as THREE from 'three';
import { OrbitControls } from 'jsm/controls/OrbitControls.js';

const w = window.innerWidth;
const h = window.innerHeight;

const camera = new THREE.PerspectiveCamera(60, w / h, 0.1, 10);
camera.position.z = 2;

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(w, h);
renderer.setClearColor(0x000000);
document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.03;

const loader = new THREE.TextureLoader();
const geo = new THREE.IcosahedronGeometry(1, 5);
const mat = new THREE.MeshStandardMaterial({
    map: loader.load('../assets/8k_earth_nightmap.jpg'),
});
const mesh = new THREE.Mesh(geo, mat);
scene.add(mesh);

// Lighting
const hemilight = new THREE.HemisphereLight(0xffffff, 0x444444, 0.6);
scene.add(hemilight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(5, 5, 5);
scene.add(directionalLight);

function animate() {
    requestAnimationFrame(animate);
    mesh.rotation.y += 0.001; // slow rotation
    controls.update();
    renderer.render(scene, camera);
}

animate();

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
