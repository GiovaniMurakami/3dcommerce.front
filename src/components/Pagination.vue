<template>
  <div v-if="totalPages > 0" class="pagination">
    <button @click="goToPreviousPage" :disabled="props.currentPage === 1">
      Anterior
    </button>

    <span>Página {{ props.currentPage }} de {{ totalPages }}</span>

    <button @click="goToNextPage" :disabled="props.currentPage === totalPages">
      Próxima
    </button>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps({
  currentPage: {
    type: Number,
    required: true
  },
  totalItems: {
    type: Number,
    required: true
  },
  itemsPerPage: {
    type: Number,
    required: true
  },
});

const emit = defineEmits(['pageChanged']);

const totalPages = computed(() =>
  Math.ceil(props.totalItems / props.itemsPerPage)
);

function goToPreviousPage() {
  if (props.currentPage > 1) {
    emit('pageChanged', props.currentPage - 1);
  }
}

function goToNextPage() {
  if (props.currentPage < totalPages.value) {
    emit('pageChanged', props.currentPage + 1);
  }
}
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
