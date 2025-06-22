import axios from 'axios';
import type { ApiResponse, ListProductDTO, ListProductsResponse, ProductDTO } from '../dtos/productDto';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_ADDRESS,
});

type ListProductsParams = {
  page?: number;
  limit?: number;
  name?: string;
  categoryId?: string;
  categoryName?: string;
  sortBy?: "createdAt" | "name" | "price" | "views";
  sortDir?: "asc" | "desc";
};

export const productService = {
  async getById(id: string): Promise<ProductDTO> {
    const response =  await api.get<ProductDTO>(`/products/${id}`);
    return response.data;
  },

  async list(params?: ListProductsParams): Promise<ApiResponse<ListProductsResponse>> {
    const response = await api.get<ApiResponse<ListProductsResponse>>("/products", { params });
    return response.data;
  },

  async deleteById(id: string): Promise<void> {
    const token = localStorage.getItem('accessToken');
    await api.delete(`/products/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
};