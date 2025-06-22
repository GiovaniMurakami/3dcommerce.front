<template>
  <div class="skeleton-manage-product">
    <div class="skeleton-image"></div>
    <div class="skeleton-content">
      <div class="skeleton-name"></div>
      <div class="skeleton-price"></div>
      <div class="skeleton-buttons">
        <div class="skeleton-button"></div>
        <div class="skeleton-button"></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.skeleton-manage-product {
  display: flex;
  align-items: center;
  gap: 24px;
  background-color: #dfdfdf;
  padding: 10px;
  border-radius: 12px;
}

.skeleton-image {
  width: 60px;
  height: 60px;
  border-radius: 8px;
  background: linear-gradient(90deg, #adadad 25%, #d1d1d1 50%, #adadad 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
}

.skeleton-content {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.skeleton-name,
.skeleton-price,
.skeleton-button {
  height: 14px;
  border-radius: 6px;
  background: linear-gradient(90deg, #adadad 25%, #d1d1d1 50%, #adadad 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
}

.skeleton-name {
  width: 40%;
}

.skeleton-price {
  width: 30%;
}

.skeleton-buttons {
  display: flex;
  gap: 8px;
  margin-top: 4px;
}

.skeleton-button {
  width: 100px;
  height: 24px;
  border-radius: 6px;
}

@keyframes shimmer {
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
}
</style>
