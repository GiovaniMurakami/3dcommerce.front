<!-- ModelModal.vue -->
<template>
  <div class="modal-overlay" @click.self="close">
      <button class="close-button" @click="close">X</button>
      <div class="model-wrapper">
        <ModelViewer :modelPath="modelPath" class="modal-content"/>
      </div>
  </div>
</template>

<script>
import ModelViewer from './ModelViewer.vue';

export default {
  props: {
    modelPath: String,
    show: Boolean
  },
  components: { ModelViewer },
  methods: {
    close() {
      this.$emit('close');
    }
  }
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  padding: 2px;
  border-radius: 4px;
  width: 100%;
  height: 100%;
  overflow: auto;
  position: relative;
}

.model-wrapper {
  width: 80vw;
  height: 80vh;
  border: 1px solid #ccc;
  border-radius: 8px;
  overflow: hidden;
}

.close-button {
  position: absolute;
  top: 8px;
  right: 12px;
  background: transparent;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
}
</style>
