<template>
    <div class="manage-categories-outer">
        <div class="manage-categories-container">
            <h1 class="manage-categories-title">Gerenciar Categorias</h1>
            <div v-if="loading" class="loading">Carregando...</div>
            <div v-else>
                <div v-if="categories.length" class="categories-list">
                    <div v-for="cat in categories" :key="cat.id" class="category-item">
                        <span>{{ cat.name }}</span>
                        <div class="actions">
                            <button class="edit-btn" @click="openEditModal(cat)">Alterar</button>
                            <button class="delete-btn" @click="openDeleteModal(cat)">Excluir</button>
                        </div>
                    </div>
                </div>
                <div v-else>
                    Nenhuma categoria cadastrada.
                </div>
            </div>
        </div>

        <!-- Modal de edição -->
        <div v-if="showEditModal" class="modal-overlay">
            <div class="modal-content">
                <h2>Alterar categoria</h2>
                <input v-model="editCategoryName" class="input" placeholder="Novo nome da categoria" />
                <div class="modal-actions">
                    <button @click="updateCategory" class="submit-btn" :disabled="updatingCategory">
                        {{ updatingCategory ? 'Salvando...' : 'Salvar' }}
                    </button>
                    <button @click="closeEditModal" class="cancel-btn">Cancelar</button>
                </div>
                <div v-if="editError" class="error-msg">{{ editError }}</div>
            </div>
        </div>

        <!-- Modal de confirmação de exclusão -->
        <div v-if="showDeleteModal" class="modal-overlay">
            <div class="modal-content">
                <h2>Excluir categoria</h2>
                <p>Tem certeza que deseja excluir a categoria <strong>{{ deleteCategoryName }}</strong>?</p>
                <div class="modal-actions">
                    <button @click="deleteCategoryConfirmed" class="submit-btn" :disabled="deletingCategory">
                        {{ deletingCategory ? 'Excluindo...' : 'Excluir' }}
                    </button>
                    <button @click="closeDeleteModal" class="cancel-btn">Cancelar</button>
                </div>
                <div v-if="deleteError" class="error-msg">{{ deleteError }}</div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import api from '../services/api'

const categories = ref([])
const loading = ref(false)
const editError = ref('')
const showEditModal = ref(false)
const updatingCategory = ref(false)
const editCategoryId = ref('')
const editCategoryName = ref('')

const showDeleteModal = ref(false)
const deletingCategory = ref(false)
const deleteCategoryId = ref('')
const deleteCategoryName = ref('')
const deleteError = ref('')

onMounted(loadCategories)

async function loadCategories() {
    loading.value = true
    try {
        const response = await api.get('/categories')
        categories.value = response.data.data
    } catch (e) {
        // erro silencioso
    } finally {
        loading.value = false
    }
}

function openDeleteModal(cat) {
    deleteCategoryId.value = cat.id
    deleteCategoryName.value = cat.name
    deleteError.value = ''
    showDeleteModal.value = true
}

function closeDeleteModal() {
    showDeleteModal.value = false
    deleteCategoryId.value = ''
    deleteCategoryName.value = ''
    deleteError.value = ''
}

async function deleteCategoryConfirmed() {
    deletingCategory.value = true
    deleteError.value = ''
    try {
        await api.delete(`/categories/${deleteCategoryId.value}`)
        categories.value = categories.value.filter(cat => cat.id !== deleteCategoryId.value)
        closeDeleteModal()
    } catch (e) {
        deleteError.value = 'Erro ao excluir categoria.'
    } finally {
        deletingCategory.value = false
    }
}

function openEditModal(cat) {
    editCategoryId.value = cat.id
    editCategoryName.value = cat.name
    editError.value = ''
    showEditModal.value = true
}

function closeEditModal() {
    showEditModal.value = false
    editCategoryId.value = ''
    editCategoryName.value = ''
    editError.value = ''
}

async function updateCategory() {
    if (!editCategoryName.value.trim()) {
        editError.value = 'Digite o novo nome da categoria.'
        return
    }
    updatingCategory.value = true
    try {
        await api.put(`/categories/${editCategoryId.value}`, { name: editCategoryName.value })
        // Atualiza localmente
        const idx = categories.value.findIndex(cat => cat.id === editCategoryId.value)
        if (idx !== -1) categories.value[idx].name = editCategoryName.value
        closeEditModal()
    } catch (e) {
        editError.value = 'Erro ao atualizar categoria.'
    } finally {
        updatingCategory.value = false
    }
}
</script>

<style scoped>
.manage-categories-outer {
    min-height: calc(100vh - 120px);
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(120deg, #f0f4f8 0%, #e0e7ef 100%);
    padding: 32px 0;
}

.manage-categories-container {
    width: 100%;
    max-width: 500px;
    margin: 0 auto;
    padding: 2.5rem 2rem;
    display: flex;
    flex-direction: column;
    background: #fff;
    border-radius: 18px;
    box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.10);
}

.manage-categories-title {
    font-size: 2rem;
    font-weight: bold;
    margin-bottom: 2rem;
    color: #2d3a4b;
    letter-spacing: 1px;
    text-align: center;
}

.categories-list {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.category-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #f3f3f3;
    padding: 12px 18px;
    border-radius: 10px;
}

.actions {
    display: flex;
    gap: 0.5rem;
}

.edit-btn,
.delete-btn {
    padding: 6px 16px;
    border: none;
    border-radius: 6px;
    font-weight: 600;
    cursor: pointer;
    font-size: 1rem;
    transition: background 0.2s;
}

.edit-btn {
    background: #7b9acc;
    color: #fff;
}

.edit-btn:hover {
    background: #4caf50;
}

.delete-btn {
    background: #e53935;
    color: #fff;
}

.delete-btn:hover {
    background: #b71c1c;
}

.loading {
    text-align: center;
    font-size: 1.1rem;
    color: #888;
}

.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.25);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
}

.modal-content {
    background: #fff;
    padding: 2rem 1.5rem;
    border-radius: 12px;
    box-shadow: 0 4px 24px rgba(31, 38, 135, 0.13);
    min-width: 320px;
    max-width: 90vw;
    display: flex;
    flex-direction: column;
    gap: 1.2rem;
    align-items: stretch;
}

.modal-actions {
    display: flex;
    gap: 1rem;
    justify-content: flex-end;
}

.input {
    width: 100%;
    padding: 0.75rem;
    background-color: #e5e5e5;
    border: 2px solid transparent;
    border-radius: 8px;
    font-size: 1rem;
    transition: border-color 0.3s, background 0.3s, box-shadow 0.2s;
    outline: none;
    box-sizing: border-box;
}

.input:focus {
    background-color: #dcdcdc;
    border-color: #7b9acc;
    box-shadow: 0 0 0 2px #7b9acc33;
}

.input:hover {
    background: #f0f0f0;
}

.submit-btn {
    background: #4caf50;
    color: #fff;
    border: none;
    border-radius: 6px;
    padding: 0.6rem 1.2rem;
    cursor: pointer;
    font-weight: 600;
    transition: background 0.2s;
}

.submit-btn:hover {
    background: #388e3c;
}

.cancel-btn {
    background: #bdbdbd;
    color: #222;
    border: none;
    border-radius: 6px;
    padding: 0.6rem 1.2rem;
    cursor: pointer;
    font-weight: 600;
    transition: background 0.2s;
}

.cancel-btn:hover {
    background: #888;
}

.error-msg {
    color: #e53935;
    font-size: 0.95rem;
    margin-top: 0.5rem;
    text-align: center;
}
</style>