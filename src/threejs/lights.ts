import * as THREE from 'three'

export function createDefaultLights(): THREE.Object3D {
  const group = new THREE.Group();

  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  group.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight(0xffffff, 3.5);
  directionalLight.position.set(1, 1, 1);
  directionalLight.castShadow = true;

  const d = 1;
  directionalLight.shadow.camera.left = -d;
  directionalLight.shadow.camera.right = d;
  directionalLight.shadow.camera.top = d;
  directionalLight.shadow.camera.bottom = -d;

  directionalLight.shadow.camera.near = 1;
  directionalLight.shadow.camera.far = 4;
  directionalLight.shadow.bias = -0.002;

  group.add(directionalLight);

  return group;
}