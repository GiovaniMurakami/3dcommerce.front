<template>
  <div class="pagination">
    <button @click="goToPreviousPage" :disabled="currentPage === 1">
      Anterior
    </button>

    <span>Página {{ currentPage }} de {{ totalPages }}</span>

    <button @click="goToNextPage" :disabled="currentPage === totalPages">
      Próxima
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';

// Props simulando um total de páginas mockado
const props = defineProps<{
  totalItems?: number
  itemsPerPage?: number
}>();

const emit = defineEmits<{
  (e: 'pageChanged', page: number): void
}>();

const currentPage = ref(1);
const totalItems = computed(() => props.totalItems ?? 30);
const itemsPerPage = computed(() => props.itemsPerPage ?? 5);

const totalPages = computed(() =>
  Math.ceil(totalItems.value / itemsPerPage.value)
);

function goToPreviousPage() {
  if (currentPage.value > 1) {
    currentPage.value--;
    emit('pageChanged', currentPage.value);
  }
}

function goToNextPage() {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
    emit('pageChanged', currentPage.value);
  }
}

// Dispara evento inicial na primeira renderização
watch(currentPage, (newPage) => {
  emit('pageChanged', newPage);
}, { immediate: true });
</script>

<style scoped>
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin-top: 2rem;
}

button {
  padding: 0.5rem 1rem;
  background-color: #e5e5e5;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;
}

button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
