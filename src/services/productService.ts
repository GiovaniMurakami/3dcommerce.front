import axios from 'axios';
import type { ProductDTO } from '../dtos/productDto';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export const ProductService = {
  async getById(id: string): Promise<ProductDTO> {
    const response = await api.get(`/products/${id}`);
    return response.data;
  }
};
