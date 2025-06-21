import { createMesh } from './mesh'
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader'

function loadModel(filePath, scene, onLoad) {
  const loader = new STLLoader()

  loader.load(
    filePath,
    (geometry) => {
      geometry.center()
      const mesh = createMesh(geometry)
      scene.add(mesh)
      if (onLoad) onLoad(mesh)
    },
    (xhr) => {
    },
    (error) => {
      console.error(error)
    }
  )

  return loader
}

export { loadModel }
