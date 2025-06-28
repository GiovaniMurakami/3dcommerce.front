<template>
    <div class="create-product-outer">
        <div class="create-product-container">
            <h1 class="create-product-title">Criar Produto</h1>
            <form class="create-product-form" @submit.prevent="handleSubmit">
                <div class="input-group category-group">
                    <select v-model="form.categoryId" class="input" required>
                        <option value="" disabled>Selecione a categoria</option>
                        <option v-for="cat in categories" :key="cat.id" :value="cat.id">{{ cat.name }}</option>
                    </select>
                    <button type="button" class="add-category-btn" @click="showCategoryModal = true"
                        title="Adicionar categoria">+</button>
                </div>
                <div class="input-group">
                    <input v-model="form.name" type="text" class="input" placeholder="Nome do produto" required />
                </div>
                <div class="input-group">
                    <input v-model.number="form.price" type="number" class="input" placeholder="Preço" min="0"
                        step="0.01" required />
                </div>
                <div class="input-group">
                    <label for="image-file" class="input file-button">Selecione a imagem</label>
                    <input id="image-file" type="file" style="display:none;" accept="image/*" @change="onImageChange"
                        class="input" required />
                    <span class="selected-file-name">{{ imageName }}</span>
                </div>
                <div class="input-group">
                    <input class="input" value="main" style="display:none;" disabled />
                </div>
                <div class="input-group">
                    <label for="stl-file" class="input file-button">Selecione o arquivo STL</label>
                    <input id="stl-file" type="file" style="display:none;" accept=".stl" @change="onModelChange"
                        class="input" required />
                    <span class="selected-file-name">{{ modelName }}</span>
                </div>
                <div class="input-group">
                    <textarea v-model="form.description" class="input" placeholder="Descrição" rows="4"
                        required></textarea>
                </div>
                <button class="submit-btn" type="submit" :disabled="loading">
                    {{ loading ? 'Enviando...' : 'Criar Produto' }}
                </button>
                <div v-if="errorMessage" class="error-msg">{{ errorMessage }}</div>
                <div v-if="successMessage" class="success-msg">{{ successMessage }}</div>
            </form>
        </div>

        <!-- Modal de criação de categoria -->
        <div v-if="showCategoryModal" class="modal-overlay">
            <div class="modal-content">
                <h2>Criar nova categoria</h2>
                <input v-model="newCategoryName" class="input" placeholder="Nome da categoria" />
                <div class="modal-actions">
                    <button @click="createCategory" class="submit-btn" :disabled="creatingCategory">
                        {{ creatingCategory ? 'Criando...' : 'Criar' }}
                    </button>
                    <button @click="showCategoryModal = false" class="cancel-btn">Cancelar</button>
                </div>
                <div v-if="categoryError" class="error-msg">{{ categoryError }}</div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import api from '../services/api'
import { useRouter } from 'vue-router'

const router = useRouter()
const loading = ref(false)
const errorMessage = ref('')
const successMessage = ref('')
const categories = ref([])

const showCategoryModal = ref(false)
const newCategoryName = ref('')
const creatingCategory = ref(false)
const categoryError = ref('')

const imageName = ref('Nenhum arquivo selecionado')
const modelName = ref('Nenhum arquivo selecionado')

const form = reactive({
    name: '',
    price: '',
    categoryId: '',
    images: [{ image: null, type: 'main' }],
    model: null,
    description: ''
})

onMounted(async () => {
    await loadCategories()
})

async function loadCategories() {
    try {
        const response = await api.get('/categories')
        categories.value = response.data.data
    } catch (e) {
        errorMessage.value = 'Erro ao carregar categorias.'
    }
}

async function createCategory() {
    categoryError.value = ''
    if (!newCategoryName.value.trim()) {
        categoryError.value = 'Digite o nome da categoria.'
        return
    }
    creatingCategory.value = true
    try {
        const response = await api.post('/categories', { name: newCategoryName.value })
        categories.value.push(response.data)
        form.categoryId = response.data.id
        showCategoryModal.value = false
        newCategoryName.value = ''
    } catch (e) {
        categoryError.value = 'Erro ao criar categoria.'
    } finally {
        creatingCategory.value = false
    }
}

function onImageChange(e) {
    const input = e.target
    const file = input.files?.[0]
    if (!file) {
        imageName.value = 'Nenhum arquivo selecionado'
        form.images[0].image = null
        return
    }
    imageName.value = file.name
    form.images[0].image = file
}

function onModelChange(e) {
    const input = e.target
    const file = input.files?.[0]
    if (!file) {
        modelName.value = 'Nenhum arquivo selecionado'
        form.model = null
        return
    }
    modelName.value = file.name
    form.model = file
}

async function handleSubmit() {
    errorMessage.value = ''
    successMessage.value = ''
    loading.value = true

    try {
        const formData = new FormData()
        formData.append('name', form.name)
        formData.append('price', form.price)
        formData.append('categoryId', form.categoryId)
        formData.append('description', form.description)
        formData.append('images[0].type', 'main')
        formData.append('images[0].image', form.images[0].image)
        formData.append('model', form.model)

        const token = localStorage.getItem('accessToken')
        await api.post('/products', formData, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'multipart/form-data'
            }
        })
        successMessage.value = 'Produto criado com sucesso!'
        setTimeout(() => router.push('/products/management'), 1500)
    } catch (e) {
        errorMessage.value = 'Erro ao criar produto.'
    } finally {
        loading.value = false
    }
}
</script>

<style scoped>
.create-product-outer {
    min-height: calc(100vh - 120px);
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(120deg, #f0f4f8 0%, #e0e7ef 100%);
    padding: 32px 0;
}

.create-product-container {
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

.selected-file-name {
    margin-left: 1rem;
    font-style: italic;
    color: #555;
    font-size: 0.9rem;
    user-select: text;
}

.create-product-title {
    font-size: 2rem;
    font-weight: bold;
    margin-bottom: 2rem;
    color: #2d3a4b;
    letter-spacing: 1px;
    text-align: center;
}

.create-product-form {
    display: flex;
    flex-direction: column;
    gap: 1.1rem;
}

.input-group {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
}

.file-button {
    cursor: pointer;
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

.category-group {
    display: flex;
    gap: 0.5rem;
    align-items: center;
}

.add-category-btn {
    background: #4caf50;
    color: #fff;
    border: none;
    border-radius: 6px;
    font-size: 1.3rem;
    width: 38px;
    height: 38px;
    cursor: pointer;
    transition: background 0.2s;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
}

.add-category-btn:hover {
    background: #388e3c;
}

.submit-btn {
    width: 100%;
    background: linear-gradient(90deg, #7b9acc 0%, #4caf50 100%);
    color: #fff;
    font-weight: 600;
    padding: 0.85rem;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-size: 1.1rem;
    margin-top: 0.5rem;
    box-shadow: 0 2px 8px rgba(76, 175, 80, 0.08);
    transition: background 0.3s, box-shadow 0.3s;
}

.submit-btn:disabled {
    background: #bdbdbd;
    cursor: not-allowed;
    color: #fff;
}

.submit-btn:not(:disabled):hover {
    background: linear-gradient(90deg, #4caf50 0%, #7b9acc 100%);
    box-shadow: 0 4px 16px rgba(76, 175, 80, 0.18);
}

.error-msg {
    color: #e53935;
    font-size: 0.95rem;
    margin-top: 0.5rem;
    text-align: center;
}

.success-msg {
    color: #388e3c;
    font-size: 0.95rem;
    margin-top: 0.5rem;
    text-align: center;
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

.cancel-btn {
    background: #e53935;
    color: #fff;
    border: none;
    border-radius: 8px;
    padding: 0.85rem;
    cursor: pointer;
    font-weight: 600;
    font-size: 1.1rem;
    transition: background 0.2s;
    width: 100%;
    margin-top: 0.5rem;
    box-sizing: border-box;
}

.cancel-btn:hover {
    background: #b71c1c;
}
</style>