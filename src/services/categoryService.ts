import axios from 'axios';

export interface Category {
  id: string;
  name: string;
}

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export const categoryService = {
  async list(): Promise<Category[]> {
      const response = await api.get<Category[]>('/categories');
      return [
        { id: '1', name: 'Eletrônicos' },
        { id: '2', name: 'Jogos' },
        { id: '3', name: 'Brinquedos' },
        { id: '4', name: 'Livros' },
      ];
  }
  
};
