import { create } from 'zustand';

interface IStore {
    isAuthenticated: boolean;
    setIsAuthenticated: (newValue: boolean) => void;
    loading: boolean;
    setLoading: (newValue: boolean) => void;
    user: TUser;
    setUser: (newUser: TUser) => void;
}

export const useStore = create<IStore>((set) => ({
    isAuthenticated: false,
    setIsAuthenticated: (newValue) => set(() => ({ isAuthenticated: newValue })),
    loading: false,
    setLoading: (newValue) => set(() => ({ loading: newValue })),
    user: null,
    setUser: (newUser) => set(() => ({ user: newUser })),
}));
