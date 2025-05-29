import * as THREE from 'three'

function fitCameraToObject(camera, object, controls, offset = 1.5) {
  const boundingBox = new THREE.Box3().setFromObject(object)

  const size = boundingBox.getSize(new THREE.Vector3())
  const center = boundingBox.getCenter(new THREE.Vector3())
  const maxDim = Math.max(size.x, size.y, size.z)

  const fov = camera.fov * (Math.PI / 180)
  const cameraZ = Math.abs((maxDim / 2) / Math.tan(fov / 2)) * offset

  camera.position.set(center.x, center.y + cameraZ * 0.2, center.z + cameraZ)

  camera.near = cameraZ / 100
  camera.far = cameraZ * 10
  camera.updateProjectionMatrix()

  camera.lookAt(center)

  if (controls) {
    controls.target.copy(center)
    controls.update()
  }
}

export { fitCameraToObject }
