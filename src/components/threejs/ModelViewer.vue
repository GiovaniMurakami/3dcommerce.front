<!-- ModelViewer.vue -->
<template>
  <div class="model-viewer">
    <div class="canvas-container" :class="{ loading: isLoading }">
      <canvas ref="canvas"></canvas>
      <div v-if="isLoading" class="loading-overlay">
        <div class="spinner"></div>
      </div>
    </div>
          <button class="fullscreen-button" @click="toggleFullscreen">
        ⛶
      </button>
  </div>
</template>

<script>
import ModelSceneController from '../../threejs/modelSceneController'

export default {
  name: 'ModelViewer',
  props: {
    modelPath: { type: String, required: true }
  },
  methods: {
    toggleFullscreen() {
      const container = this.$el;
      if (!document.fullscreenElement) {
        container.requestFullscreen().catch((err) => {
          console.error(`Erro ao ativar fullscreen: ${err.message}`);
        });
      } else {
        document.exitFullscreen();
      }
    }
  },
  data() {
    return {
      isLoading: true
    }
  },
  mounted() {
    this.threeScene = new ModelSceneController(this.$refs.canvas)
    this.threeScene.init(this.modelPath, () => {
      this.isLoading = false
    })
  },
}
</script>

<style scoped>
.canvas-container {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.canvas-container.loading canvas {
  filter: blur(4px) brightness(0.9);
  transition: filter 0.3s ease;
}

canvas {
  width: 100%;
  height: 100%;
  display: block;
}

.modal-content {
  padding: 2px;
  border-radius: 4px;
  width: 100%;
  height: 100%;
  overflow: auto;
  position: relative;
}

.loading-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  backdrop-filter: blur(2px);
  display: flex;
  align-items: center;
  justify-content: center;
}

.spinner {
  width: 32px;
  height: 32px;
  border: 4px solid #ccc;
  border-top: 4px solid #1e90ff;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.fullscreen-button {
  position: absolute;
  bottom: 10px;
  right: 10px;
  background-color: rgba(240, 240, 240, 0.5);
  border: none;
  border-radius: 4px;
  padding: 6px 10px;
  cursor: pointer;
  font-size: 18px;
  transition: background-color 0.2s ease;
}

.fullscreen-button:hover {
  background-color: rgba(200, 200, 200, 0.9);
}
</style>
