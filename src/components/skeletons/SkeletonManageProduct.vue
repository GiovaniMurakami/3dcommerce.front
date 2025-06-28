<template>
  <div class="skeleton-manage-product">
    <div class="skeleton-image-wrapper">
      <div class="skeleton-image"></div>
    </div>
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
  justify-content: center;
  margin: auto;
  gap: 18px;
  background: #f6f7f9;
  padding: 18px 16px;
  border-radius: 14px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  margin-bottom: 14px;
  min-width: 260px;
  max-width: 700px;
  width: 100%;
  animation: skeleton-fadein 0.5s;
}

@keyframes skeleton-fadein {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

.skeleton-image-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 90px;
  min-height: 90px;
}

.skeleton-image {
  width: 70px;
  height: 70px;
  border-radius: 10px;
  background: linear-gradient(90deg, #e0e0e0 25%, #f5f5f5 50%, #e0e0e0 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
  display: block;
  margin: 0 auto;
}

.skeleton-content {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
  justify-content: center;
}

.skeleton-name,
.skeleton-price,
.skeleton-button {
  border-radius: 6px;
  background: linear-gradient(90deg, #e0e0e0 25%, #f5f5f5 50%, #e0e0e0 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
}

.skeleton-name {
  width: 45%;
  height: 18px;
}

.skeleton-price {
  width: 30%;
  height: 16px;
}

.skeleton-buttons {
  display: flex;
  gap: 10px;
  margin-top: 6px;
  justify-content: center;
  width: 100%;
}

.skeleton-button {
  width: 90px;
  height: 28px;
  border-radius: 8px;
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