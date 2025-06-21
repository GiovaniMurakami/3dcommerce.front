import axios from 'axios';
import type { ApiResponse } from '../dtos/productDto';

export interface Category {
  id: string;
  name: string;
}

const api = axios.create({
  baseURL: import.meta.env.VITE_API_ADDRESS,
});

export const categoryService = {
  async list(): Promise<Category[]> {
      const response = await api.get<ApiResponse<Category[]>>('/categories');
      return response.data.data; /* [
        { id: '1', name: 'Eletrônicos' },
        { id: '2', name: 'Jogos' },
        { id: '3', name: 'Brinquedos' },
        { id: '4', name: 'Livros' },
      ]; */
  }
  
};
