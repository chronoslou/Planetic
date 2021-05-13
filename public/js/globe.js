import * as THREE from '/build/three.module.js';
import {OrbitControls} from 'https://unpkg.com/three@0.119.0/examples/jsm/controls/OrbitControls.js';


// DATA IMPORT
let data = [];
fetch("/api/locations")
    .then(res => res.json())
    .then(json => data = json)


// Scene
const scene = new THREE.Scene();

// Camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);

// Renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);//appends it to body

// Controls
const controls = new OrbitControls(camera, renderer.domElement);

// Raycaster
const raycaster = new THREE.Raycaster();

// Vector2
const mouse = new THREE.Vector2();
const touch = new THREE.Vector2();

//////////////////////And then he created the earth
let earthMap = new THREE.TextureLoader().load('/IMAGES/earthpic.jpg');

//earth sphere
let earthGeometry = new THREE.SphereGeometry( 10, 32, 32);

// Material is how the globe will look like
let earthMaterial = new THREE.MeshPhongMaterial({
    map: earthMap,
    specular: new THREE.Color('grey')
});

let earth = new THREE.Mesh(earthGeometry, earthMaterial);

// add to scene
scene.add( earth );


// and he said let there be light!!!
let lights = [];

// CreateLights is a function which creates the lights and adds them to the scene.
function createLights(scene){
    lights[0] = new THREE.PointLight("#378adb", .4, 0);
    lights[1] = new THREE.PointLight("#378adb", .4, 0);
    lights[2] = new THREE.PointLight("#378adb", .5, 0);
    const color = 0xFFFFFF;
    const intensity = 1;
    lights[3] = new THREE.AmbientLight(color, intensity);

    lights[0].position.set(200, 0, -400);
    lights[1].position.set(200, 200, 400);
    lights[2].position.set(-200, -200, -50);

    scene.add(lights[0]);
    scene.add(lights[1]);
    scene.add(lights[2]);
    scene.add(lights[3]);
}

function addSceneObjects(scene) {
    createLights(scene);
}

addSceneObjects(scene);

camera.position.z = 20;

// Don't zoom too close!
controls.minDistance = 12;
controls.maxDistance = 30;
controls.enablePan = false;
controls.update();
controls.saveState();

//Event Listeners
window.addEventListener('resize', onWindowResize, false);
window.addEventListener('click', onWindowClick, false);


//Makes it responsive
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
};



//Clicking on a point
function onWindowClick(event) {
    event.preventDefault();
    document.getElementById("location-info").style.display = "flex";
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);

    let intersects = raycaster.intersectObjects(earth.children);


   for (let i = 0; i < intersects.length; i++){
         document.querySelector("#city-info").innerText = intersects[0].object.userData.location_name;
         document.querySelector("#location-btn").innerText = "Join the conversation in " + intersects[0].object.userData.location_name;
         document.querySelector("#location-btn").value = intersects[0].object.userData.id;
    }

    const item = intersects[0];
    let point = item.point;
    let camDistance = camera.position.copy(point).normalize.multiplyScalar(camDistance); // zooms into point
};

// Let's it rolllll
function animate() {
    requestAnimationFrame( animate );
    render();
	controls.update();
};

// Updates camera renderer
function render() {
    renderer.render( scene, camera );
    //Rotate the earth about the y-axis
    earth.rotation.y -= .0005;
};

// Cleaning up!
function removeChildren(){
    let destroy = earth.children.length;
    while(destroy--) {
        earth.remove(earth.children[destroy].material.dispose())
        earth.remove(earth.children[destroy].geometry.dispose())
        earth.remove(earth.children[destroy])
    }
};

// Add data points
function addCountryCoord(earth, location_name, latitude, longitude, id, color){

    let pointOfInterest = new THREE.SphereGeometry(.1, 32, 32);
    let lat = latitude * (Math.PI/180);
    let lon = -longitude * (Math.PI/180);
    const radius = 10;

    let material = new THREE.MeshBasicMaterial({
        color:color
    });

    let mesh = new THREE.Mesh(
        pointOfInterest,
        material
    );

    mesh.position.set(
        Math.cos(lat) * Math.cos(lon) * radius,
        Math.sin(lat) * radius,
        Math.cos(lat) * Math.sin(lon) * radius
    );

    mesh.rotation.set(0.0, -lon, lat-Math.PI*0.5);

    mesh.userData.location_name = location_name;
    mesh.userData.color = color;
    mesh.userData.id = id;
    earth.add(mesh)

};

window.addEventListener('load', (event) => {
    changeToCountry();
  });//runs changeToCountry on page load (generates points on the map)

// Allows data to show on map
function changeToCountry() {

    removeChildren();

    for (let i = 0; i < data.length; i++){
        
            addCountryCoord(earth,data[i].location_name, data[i].latitude, data[i].longitude, data[i].id, 'yellow');
       
    }
};

// Run it!!
animate();