// src/store/authStore.js
import { create } from 'zustand';
import { getCurrentUser, signout } from '../service/axios';

const useAuthStore = create((set) => ({
  user: null,
  loading: false,

  setUser: (user) => set({ user }),
  setLoading: (loading) => set({ loading }),

  fetchUser: async () => {
    set({ loading: true });
    try {
      const res = await getCurrentUser();
      set({ user: res.data });
    } catch (err) {
      set({ user: null });
    } finally {
      set({ loading: false });
    }
  },

  logout: async () => {
    try {
      await signout(); // backend: clear token cookie
    } catch (err) {
      console.error('Logout failed:', err);
    } finally {
      set({ user: null }); // frontend: clear store
    }
  }
}));

export default useAuthStore;
