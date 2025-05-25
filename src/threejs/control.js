// createControls.js
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

export function createControls(camera, domElement) {
  const controls = new OrbitControls(camera, domElement)
  controls.enableDamping = true
  controls.dampingFactor = 0.05
  controls.rotateSpeed = 0.5
  controls.zoomSpeed = 0.8
  controls.panSpeed = 0.5

  return controls
}
