import { fetchApi } from '@/lib/api';

export interface Product {
  _id: string;
  name: string;
  sku: string;
  brand: string;
  shortDescription: string;
  description: string;
  price: number;
  discountedPrice?: number;
  tags: string[];
  image: string;
  images: string[];
  category: string;
  subCategory: string[];
  stock: number;
  status: 'active' | 'inactive' | 'out-of-stock';
}

export const productService = {
  getAll: () => fetchApi<Product[]>('/products'),
  getById: async (id: string) => {
    try {
      const response = await fetchApi<any>(`/products/${id}`);
      return response;
    } catch (error) {
      throw new Error("Failed to fetch product");
    }
  },
  create: (data: Omit<Product, '_id'>) => 
    fetchApi<Product>('/products', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  update: (id: string, data: Partial<Product>) =>
    fetchApi<Product>(`/products/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),
  delete: (id: string) =>
    fetchApi<void>(`/products/${id}`, {
      method: 'DELETE',
    }),
};
