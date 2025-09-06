
import { create } from "zustand";
import api from "../services/api";
 
const useAuthStore = create((set) => ({
    user: null,
    isAuthenticated: false,
    error: null,
    isLoading: false,
    isCheckingAuth: true,
    message: null,

    signup: async (email, password, name) => {
        set({ isLoading: true, error: null });

        try {
            const response = await api.post("/api/auth/signup", { email, password, name });

            set({ user: response.data.user, isAuthenticated: true, isLoading: false });
        } catch (error) {

            set({ error: error.response?.data?.message || "Signup failed", isLoading: false });
            
            throw error;
        }
    },

    verifyEmail: async (code) => {
		set({ isLoading: true, error: null });
		try {
			const response = await api.post("api/auth//verify-email", { code });
			set({ user: response.data.user, isAuthenticated: true, isLoading: false });
			return response.data;
		} catch (error) {
			set({ error: error.response.data.message || "Error verifying email", isLoading: false });
			throw error;
		}
	},
}));

export default useAuthStore;