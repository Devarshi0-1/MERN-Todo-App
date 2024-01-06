import { create } from 'zustand';

const store = (set) => ({
	isAuthenticated: false,
	setIsAuthenticated: (newValue) =>
		set((state) => ({ isAuthenticated: newValue })),
	loading: false,
	setLoading: (newValue) => set((state) => ({ loading: newValue })),
	user: {},
	setUser: (newUser) => set((state) => ({ user: newUser })),
});

export const useStore = create(store);
