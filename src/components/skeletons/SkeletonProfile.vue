<template>
  <div class="skeleton-content">
    <div class="skeleton-avatar shimmer"></div>
    <div class="skeleton-form">
      <div class="skeleton-input shimmer"></div>
      <div class="skeleton-input shimmer"></div>
    </div>
    <div class="skeleton-buttons">
      <div class="skeleton-button shimmer"></div>
      <div class="skeleton-button shimmer"></div>
      <div class="skeleton-button shimmer"></div>
    </div>
  </div>
</template>

<style scoped>
.skeleton-content {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 2.5rem;
  align-items: flex-start;
  background: #fff;
  border-radius: 14px;
  box-shadow: 0 2px 8px rgba(31, 38, 135, 0.06);
  padding: 2rem 1.5rem;
}

.skeleton-avatar {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background-color: #e5e5e5;
}

.skeleton-form {
  flex: 1;
  min-width: 260px;
  max-width: 340px;
  display: flex;
  flex-direction: column;
  gap: 1.1rem;
}

.skeleton-input {
  height: 42px;
  border-radius: 8px;
  background-color: #e5e5e5;
}

.skeleton-buttons {
  margin-top: 2rem;
  display: flex;
  justify-content: flex-end;
  flex-wrap: wrap;
  gap: 1rem;
  width: 100%;
}

.skeleton-button {
  height: 44px;
  width: 150px;
  border-radius: 8px;
  background-color: #e5e5e5;
}

/* shimmer effect */
.shimmer {
  position: relative;
  overflow: hidden;
}

.shimmer::after {
  content: "";
  position: absolute;
  top: 0;
  left: -150px;
  width: 150px;
  height: 100%;
  background: linear-gradient(to right, transparent 0%, #f0f0f0 50%, transparent 100%);
  animation: shimmer 1.5s infinite;
}

@keyframes shimmer {
  0% {
    left: -150px;
  }
  100% {
    left: 100%;
  }
}
</style>
