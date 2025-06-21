<template>
  <div class="skeleton-card">
    <div class="skeleton-image" />
    <div class="skeleton-info">
      <div class="skeleton-category" />
      <div class="line name" />
    </div>
  </div>
</template>

<style scoped>
.skeleton-card {
  width: 16.67%;
  border: 1px solid #ccc;
  border-radius: 10px;
  margin: 10px;
  cursor: default;
  display: flex;
  flex-direction: column;
  transition: transform 0.2s ease;
}

.skeleton-image {
  width: 100%;
  height: 25vh;
  object-fit: cover;
  border-radius: 10px 10px 0 0;
  background: linear-gradient(90deg, #adadad 25%, #d1d1d1 50%, #adadad 75%);
  background-size: 200% 100%;
  animation: shimmer 2s ease-in-out infinite;
}

.skeleton-info {
  margin: 2vh;
  display: flex;
  flex-direction: column;
  gap: 0.8vh;
  font-size: 1.3vh;
}

.skeleton-category {
  width: 5vw;
  height: 2.2vh;
  border-radius: 20px;
  background: linear-gradient(90deg, #adadad 25%, #d1d1d1 50%, #adadad 75%);
  background-size: 200% 100%;
  animation: shimmer 2s ease-in-out infinite;
}

.line.name {
  height: 1.3vh;
  width: 70%;
  border-radius: 4px;
  background: linear-gradient(90deg, #adadad 25%, #d1d1d1 50%, #adadad 75%);
  background-size: 200% 100%;
  animation: shimmer 2s ease-in-out infinite;
}

@keyframes shimmer {
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
}

@media (max-width: 1024px) {
  .skeleton-card {
    width: 30%;
  }
}

@media (max-width: 768px) {
  .skeleton-card {
    width: 45%;
  }
}

@media (max-width: 480px) {
  .skeleton-card {
    width: 90%;
  }
}
</style>
