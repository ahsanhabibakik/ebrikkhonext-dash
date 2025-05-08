import { create } from 'zustand';
import { Category, categoryService } from '@/services/categoryService';

interface CategoryStore {
  categories: Category[];
  loading: boolean;
  error: string | null;
  fetchCategories: () => Promise<void>;
  addCategory: (category: Omit<Category, '_id'>) => Promise<void>;
  updateCategory: (id: string, category: Partial<Category>) => Promise<void>;
  deleteCategory: (id: string) => Promise<void>;
}

export const useCategoryStore = create<CategoryStore>((set) => ({
  categories: [],
  loading: false,
  error: null,

  fetchCategories: async () => {
    set({ loading: true, error: null });
    try {
      const categories = await categoryService.getAll();
      set({ categories, loading: false });
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  },

  addCategory: async (category) => {
    set({ loading: true, error: null });
    try {
      const newCategory = await categoryService.create(category);
      set(state => ({
        categories: [...state.categories, newCategory],
        loading: false
      }));
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  },

  updateCategory: async (id, category) => {
    set({ loading: true, error: null });
    try {
      const updated = await categoryService.update(id, category);
      set(state => ({
        categories: state.categories.map(c => c._id === id ? updated : c),
        loading: false
      }));
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  },

  deleteCategory: async (id) => {
    set({ loading: true, error: null });
    try {
      await categoryService.delete(id);
      set(state => ({
        categories: state.categories.filter(c => c._id !== id),
        loading: false
      }));
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  },
}));
