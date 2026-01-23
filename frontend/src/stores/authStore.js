import { create } from "zustand";
import * as SecureStore from "expo-secure-store";
import api from "../config/api";

const useAuthStore = create((set) => ({
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,

  register: async (userData) => {
    set({ isLoading: true, error: null });
    try {
      console.log("Registering with:", userData); 

      const response = await api.post("/auth/register", userData);
      const { user, token } = response.data.data;
      await SecureStore.setItemAsync("token", token);
      set({ user, token, isAuthenticated: true, isLoading: false });
      return { success: true };
    } catch (error) {
      console.log("Registration error:", error); 
      console.log("Error response:", error.response?.data); 

      const message = error.response?.data?.message || "Registration failed";
      set({ isLoading: false, error: message });
      return { success: false, error: message };
    }
  },

  login: async (email, password) => {
    set({ isLoading: true, error: null });
    try {
      const response = await api.post("/auth/login", { email, password });
      const { user, token } = response.data.data;
      await SecureStore.setItemAsync("token", token);
      set({ user, token, isAuthenticated: true, isLoading: false });
      return { success: true };
    } catch (error) {
      const message = error.response?.data?.message || "Login failed";
      set({ isLoading: false, error: message });
      return { success: false, error: message };
    }
  },
  logout: async () => {
    await SecureStore.deleteItemAsync("token");
    set({ user: null, token: null, isAuthenticated: false });
  },
  checkAuth: async () => {
    set({ isLoading: true });
    try {
      const token = await SecureStore.getItemAsync("token");
      if (token) {
        const response = await api.get("/auth/me");
        set({
          user: response.data.data.user,
          token,
          isAuthenticated: true,
          isLoading: false,
        });
        return true;
      }
    } catch (error) {
      await SecureStore.deleteItemAsync("token");
    }
    set({ isLoading: false, isAuthenticated: false });
    return false;
  },
}));

export default useAuthStore;
