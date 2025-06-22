<template>
  <div class="skeleton-page-container">
    <div class="skeleton-product-section">
      <div class="skeleton-product-images-container">
        <div class="skeleton-main-image"></div>
        <div class="skeleton-secondary-images-container">
          <div class="skeleton-secondary-image" v-for="n in 3" :key="n"></div>
        </div>
      </div>
      <div class="skeleton-product-info-container">
        <div class="skeleton-title"></div>
        <div class="skeleton-price"></div>
        <div class="skeleton-buttons-container">
          <div class="skeleton-cart-button"></div>
        </div>
      </div>
    </div>
    <div class="skeleton-description-section">
      <div class="skeleton-description-title"></div>
      <div class="skeleton-description-text" v-for="n in 4" :key="n"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Skeleton puro, sem lógica
</script>

<style scoped>
.skeleton-page-container {
  margin: 8vh 15%;
  display: flex;
  flex-direction: column;
  gap: 3rem;
}

.skeleton-product-section {
  display: flex;
  gap: 8rem;
  align-items: flex-start;
}

.skeleton-product-images-container {
  width: 70%;
  display: flex;
  flex-direction: column;
}

.skeleton-main-image {
  width: 100%;
  aspect-ratio: 1 / 0.7;
  background: #ddd;
  border-radius: 8px;
  border: 2px solid #AFB1B6;
  animation: pulse 1.5s infinite ease-in-out;
}

.skeleton-secondary-images-container {
  display: flex;
  gap: 0.3rem;
  margin-top: 0.75rem;
  padding-bottom: 0.5rem;
}

.skeleton-secondary-image {
  width: 33.33%;
  aspect-ratio: 1 / 1;
  background: #ddd;
  border-radius: 6px;
  border: 2px solid #AFB1B6;
  animation: pulse 1.5s infinite ease-in-out;
}

.skeleton-product-info-container {
  width: 30%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.skeleton-title {
  width: 80%;
  height: 32px;
  background: #ddd;
  border-radius: 6px;
  margin-bottom: 12px;
  animation: pulse 1.5s infinite ease-in-out;
}

.skeleton-price {
  width: 60%;
  height: 24px;
  background: #ddd;
  border-radius: 6px;
  margin-bottom: 40px;
  animation: pulse 1.5s infinite ease-in-out;
}

.skeleton-buttons-container {
  display: flex;
  gap: 10px;
}

.skeleton-cart-button {
  width: 100px;
  height: 48px;
  background: #ddd;
  border-radius: 10px;
  animation: pulse 1.5s infinite ease-in-out;
  cursor: default;
}

.skeleton-description-section {
  margin: 0 10%;
}

.skeleton-description-title {
  width: 250px;
  height: 28px;
  background: #ddd;
  border-radius: 12px;
  margin-bottom: 16px;
  animation: pulse 1.5s infinite ease-in-out;
}

.skeleton-description-text {
  width: 100%;
  height: 16px;
  background: #ddd;
  border-radius: 6px;
  margin-bottom: 12px;
  animation: pulse 1.5s infinite ease-in-out;
}

@keyframes pulse {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
  100% {
    opacity: 1;
  }
}
</style>
