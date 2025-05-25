import * as THREE from 'three'

function createCamera(canvas) {
  const camera = new THREE.PerspectiveCamera(
    75,
    canvas.clientWidth / canvas.clientHeight,
    0.1,
    2000
  );
  camera.position.z = 10;
  return camera;
}

export { createCamera };