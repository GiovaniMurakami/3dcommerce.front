import * as THREE from 'three'

function createRenderer(canvas) {
    const renderer = new THREE.WebGLRenderer({ canvas: canvas })
    renderer.setSize(canvas.innerWidth, canvas.innerHeight)
    renderer.shadowMap.enabled = true
    return renderer;
}
 
export { createRenderer };