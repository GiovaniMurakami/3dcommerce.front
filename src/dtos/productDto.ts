export interface ProductImageDTO {
  id: string;
  url: string;
  type: string;
}

export interface ProductDTO {
  id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  quantity: number;
  image: string;
  fileUrl: string;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  categoryId: string;
  productImages: ProductImageDTO[];
}

export type ListProductsResponse = {
  items: ListProductDTO[];
  total: number;
  page: number;
  limit: number;
};

export interface ListProductDTO {
  id: string;
  name: string;
  categoryName: string;
  price: number;
  mainImageUrl: string;
  fileUrl: string;
}

export type ApiResponse<T> = {
  data: T;
};