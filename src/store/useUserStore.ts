import { create } from 'zustand';
import { persist, PersistOptions, StateStorage } from 'zustand/middleware';

export type UserRole = 'superadmin' | 'admin' | 'manager' | 'user';

interface UserState {
  user: {
    id: string;
    name: string;
    email: string;
    role: UserRole;
    avatar?: string;
  } | null;
  isAuthenticated: boolean;
  setUser: (user: UserState['user']) => void;
  logout: () => void;
}

type UserStatePersist = PersistOptions<UserState>;

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      setUser: (user) => set({ user, isAuthenticated: !!user }),
      logout: () => set({ user: null, isAuthenticated: false }),
    }),
    {
      name: 'user-storage',
    }
  )
);
