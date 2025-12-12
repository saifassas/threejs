import * as THREE from 'three';
import {OrbitControls} from "jsm/controls/OrbitControls.js";


const w = window.innerWidth;
const h = window.innerHeight;
const fov =100;
const aspect = w / h;
const near= 0.1;
const far = 10;

const camera = new THREE.PerspectiveCamera(fov,aspect , near , far  );
camera.position.z=2;

const renderer = new THREE.WebGLRenderer({antialias:true}) ;
renderer.setSize(w,h);
document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();
const controls = new OrbitControls(camera,renderer.domElement)
controls.enableDamping = true ;
controls.dampingFactor = 0.03;

const geo = new THREE.IcosahedronGeometry(1.0, 2);
const mat = new THREE.MeshStandardMaterial({ 
    color: 0xffffff ,
    flatShading: true 
});
 
const mesh = new THREE.Mesh(geo,mat);
scene.add(mesh);
const wiremat= new THREE.MeshBasicMaterial({
    color: 0xffffff,
    wireframe: true
});
const wiremesh = new THREE.Mesh(geo , wiremat);
wiremesh.scale.setScalar(1.001);
mesh.add(wiremesh);
renderer.render(scene,camera );
const hemilight = new THREE.HemisphereLight(0xff99ff, 0xaa5500);
scene.add(hemilight);

function animate(){
    requestAnimationFrame(animate);
        // mesh.rotation.x += 0.007;
        // mesh.rotation.y += 0.007;
        controls.update();

    renderer.render(scene,camera );

}


animate();
window.addEventListener('resize', () => {
            camera.aspect = innerWidth / innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(innerWidth, innerHeight);
        });

        // optional: simple interaction
        // document.getElementById('action').addEventListener('click', (e) => {
        //     e.preventDefault();
        //     mesh.rotation.x += 1.2;
        //     mesh.rotation.y += 1.2;
        // });
