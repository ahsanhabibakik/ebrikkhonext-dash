import { fetchApi } from '@/lib/api';

export interface Category {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  parent?: string;
  status: 'active' | 'inactive';
  createdAt?: string;
  updatedAt?: string;
}

export const categoryService = {
  getAll: () => fetchApi<Category[]>('/categories'),
  getById: (id: string) => fetchApi<Category>(`/categories/${id}`),
  create: (data: Omit<Category, '_id'>) => 
    fetchApi<Category>('/categories', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  update: (id: string, data: Partial<Category>) =>
    fetchApi<Category>(`/categories/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),
  delete: (id: string) =>
    fetchApi<void>(`/categories/${id}`, {
      method: 'DELETE',
    }),
};
