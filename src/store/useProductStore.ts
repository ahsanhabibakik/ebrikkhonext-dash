import { create } from 'zustand';

interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
  status: 'draft' | 'published' | 'archived';
  description: string;
}

interface ProductStore {
  products: Product[];
  loading: boolean;
  error: string | null;
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (id: string, product: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useProductStore = create<ProductStore>((set) => ({
  products: [],
  loading: false,
  error: null,
  addProduct: (product) => 
    set((state) => ({
      products: [...state.products, { ...product, id: crypto.randomUUID() }]
    })),
  updateProduct: (id, product) =>
    set((state) => ({
      products: state.products.map((p) => 
        p.id === id ? { ...p, ...product } : p
      )
    })),
  deleteProduct: (id) =>
    set((state) => ({
      products: state.products.filter((p) => p.id !== id)
    })),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
}));
