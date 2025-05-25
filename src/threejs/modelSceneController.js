import * as THREE from 'three'
import { createDefaultLights } from './lights'
import { createCamera } from './camera'
import { createRenderer } from './renderer'
import { loadModel } from './loader'
import { fitCameraToObject } from './utils/cameraUtils'
import Stats from 'three/examples/jsm/libs/stats.module'
import { createControls } from './control'

export default class ModelSceneController {
  constructor(canvas) {
    this.canvas = canvas
    this.scene = null
    this.camera = null
    this.renderer = null
    this.controls = null
    this.model = null
    this.resizeObserver = null
  }

  init(modelUrl, onLoadedCallback) {
    this.scene = new THREE.Scene()
    this.scene.add(createDefaultLights())

    this.renderer = createRenderer(this.canvas)
    this.camera = createCamera(this.canvas)
    this.controls = createControls(this.camera, this.renderer.domElement)

    loadModel(modelUrl, this.scene, (mesh) => {
      this.model = mesh
      fitCameraToObject(this.camera, mesh, this.controls)
      if (onLoadedCallback) onLoadedCallback()
    })

    this.stats = new Stats()
    document.body.appendChild(this.stats.dom)

    this.observeResize()
    this.animateScene()
  }

  animateScene() {
    requestAnimationFrame(() => this.animateScene())
    this.controls.update()
    this.renderer.render(this.scene, this.camera)
    this.stats.update()
  }

  observeResize() {
    this.resizeObserver = new ResizeObserver(() => {
      const width = this.canvas.clientWidth
      const height = this.canvas.clientHeight

      this.renderer.setSize(width, height, false)
      this.camera.aspect = width / height

      if (this.model) {
        fitCameraToObject(this.camera, this.model, this.controls)
      }
    })

    this.resizeObserver.observe(this.canvas)
  }
}
