import './style.css'

import * as THREE from 'three';
//import orbit controls
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import gsap from "gsap";
import {TextureLoader} from "three";
//import axes helper from three js
import {AxesHelper} from "three";


const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 20, window.innerWidth / window.innerHeight, 0.05, 1000 );
//add orthographic camera

//turn camera position to screen position
camera.position.z = 5;
camera.position.y = -10;

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );


//add axes helper
const axesHelper = new AxesHelper(5);
scene.add(axesHelper);

const controls = new OrbitControls(camera, renderer.domElement);

const textureLoader = new TextureLoader();
const texture = textureLoader.load("/textures/monalisa.jpeg");

const group = new THREE.Group();

const geometry = new THREE.BoxGeometry( 1, 1, 0.05 );
const material = new THREE.MeshBasicMaterial();
material.map = texture;
const cube = new THREE.Mesh( geometry, material );
cube.position.x = -3;
group.add(cube);

//add plane
const geometry1 = new THREE.PlaneGeometry(5, 5, 32);
const material1 = new THREE.MeshBasicMaterial({color: 'green', side: THREE.DoubleSide});
const plane = new THREE.Mesh(geometry1, material1);
//plane.rotation.x = Math.PI * 0.5;
plane.position.y = 0;
//plane in middle of screen

group.add(plane);

//add box on top of plane
const geometry2 = new THREE.BoxGeometry(1, 1, 1);
const material2 = new THREE.MeshBasicMaterial({color: '#d3d8e6'});
const box = new THREE.Mesh(geometry2, material2);
box.position.y = 0;
box.position.z = 0.5;
//make box wider
box.scale.x =2.5;
box.scale.y = 2;

group.add(box);

//add brown cone
const geometry3 = new THREE.ConeGeometry(2, 1, 4);
const material3 = new THREE.MeshBasicMaterial({color: "#526b89"});
const cone = new THREE.Mesh(geometry3, material3);
cone.position.z = 1.5;

//rotate cone
cone.rotation.x = Math.PI * 0.5;
cone.rotation.y = 3.93;

//add plane
const geometry4 = new THREE.PlaneGeometry(0.5, 0.8, 32);
const material4 = new THREE.MeshBasicMaterial({color: '#141924', side: THREE.DoubleSide});
const plane1 = new THREE.Mesh(geometry4, material4);
//plane.rotation.x = Math.PI * 0.5;
plane1.position.y = -1.01;
plane1.rotation.x = Math.PI * 0.5;
plane1.position.z = 0.4;
plane1.position.x = 0.5;

group.add(plane1);



group.add(cone);



scene.add(group);


const clock = new THREE.Clock();
function animate() {
  const elapsedTime = clock.getElapsedTime();
  //console.log("animate")
  const speed = elapsedTime * 1.5;
	requestAnimationFrame( animate );

  //group.position.x = speed; //1cm per second
  //group.rotation.y = Math.PI * 0.5; //kwart laten draaien
 // group.position.y = Math.cos(speed); //(-1 tot 1)
 // group.position.x = Math.sin(speed); //(0 tot 1)

	renderer.render( scene, camera );
}

animate();