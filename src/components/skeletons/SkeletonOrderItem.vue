<template>
  <div class="skeleton-order-item">
    <div class="skeleton-header">
      <div class="skeleton-line short" />
      <div class="skeleton-line medium" />
      <div class="skeleton-line short" />
    </div>
    <div class="skeleton-products">
      <div v-for="n in 2" :key="n" class="skeleton-product">
        <div class="skeleton-image" />
        <div class="skeleton-details">
          <div class="skeleton-line medium" />
          <div class="skeleton-line small" />
          <div class="skeleton-line tiny" />
        </div>
      </div>
    </div>
    <div class="skeleton-total skeleton-line short" />
    <div class="skeleton-status skeleton-line medium" />
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.skeleton-order-item {
  background: #f3f3f3;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 2px 8px rgba(31, 38, 135, 0.06);
  display: flex;
  flex-direction: column;
  gap: 1rem;
  animation: pulse 1.5s infinite ease-in-out;
}

.skeleton-header,
.skeleton-products,
.skeleton-total,
.skeleton-status {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.skeleton-product {
  display: flex;
  align-items: center;
  gap: 1rem;
  width: 100%;
}

.skeleton-details {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.skeleton-line {
  height: 14px;
  background: #ddd;
  border-radius: 6px;
}

.skeleton-line.short {
  width: 80px;
}

.skeleton-line.medium {
  width: 150px;
}

.skeleton-line.small {
  width: 100px;
}

.skeleton-line.tiny {
  width: 60px;
}

.skeleton-image {
  width: 60px;
  height: 60px;
  background: #ddd;
  border-radius: 8px;
}

@keyframes pulse {
  0% {
    background-color: #f0f0f0;
  }
  50% {
    background-color: #e0e0e0;
  }
  100% {
    background-color: #f0f0f0;
  }
}
</style>
