var renderer;
var scene;
var camera;
var cube;
var control;

function generateScene(){
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(45,window.innerWidth/window.innerHeight,0.1,1000);
  camera.position.x = 15;
  camera.position.y = 16;
  camera.position.z = 13;
  camera.lookAt(scene.position);

  renderer = new THREE.WebGLRenderer();
  renderer.setClearColor(0x000000,1.0);
  renderer.setSize(window.innerWidth,window.innerHeight);
}


function addCube(){
  var cubeGeometry = new THREE.BoxGeometry(10*Math.random(),10*Math.random(),10*Math.random());
  var cubeMaterial = new THREE.MeshNormalMaterial();

  cube = new THREE.Mesh(cubeGeometry,cubeMaterial);
  cube.name="cube";
  scene.add(cube);
}

function animateCube(){
  scene.getObjectByName('cube').rotation.x += control.rotationSpeed;
  scene.getObjectByName('cube').scale.set(control.scale,control.scale,control.scale);
}

function render(){
  renderer.render(scene,camera);
  animateCube();
  requestAnimationFrame(render);
}

function addControls(controlObject){
  var gui = new dat.GUI();
  gui.add(controlObject,'rotationSpeed',-0.1,0.1);
  gui.add(controlObject, 'scale', 0.01,2);
}

function setControlObject(){
  control = new function(){
    this.rotationSpeed = 0.005;
    this.scale = 1;
  };
}

function onLoadCallback(loaded){
  if (loaded.length){
    console.log('Loaded'.loaded.length);
  }
  else {
    console.log("Loaded",loaded);
  }
}

function onProgressCallback(progress){
  console.log("Progress",progress);
}

function onErrorCallback(error){
  console.log("Error",error);
}

function loadTexture(texture){
  var texture = THREE.ImageUtils.loadTexture(textureUrl,null,onLoadCallback,onErrorCallback);
  console.log("texture after loadTexture call", texture);
}

function setupKeyControls(){

  document.onkeydown = function(e) {
    switch (e.keyCode) {
      case 37:
      cube.rotation.x += 0.05;
      break;
      case 38:
      cube.rotation.z -= 0.05;
      break;
      case 39:
      cube.rotation.x -=0.05;
      break;
      case 40:
      cube.rotation.z += 0.05;
      break;
    }
  }
}

function init(){

  setControlObject();

  addControls(control);

  generateScene();
  addCube();
  setupKeyControls();

  document.body.appendChild(renderer.domElement);
  render();
}

window.onload = init;