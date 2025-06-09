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
