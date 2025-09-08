
import { create } from "zustand";
import api from "../services/api";

const useAuthStore = create((set) => ({
    user: null,
    isAuthenticated: false,
    isVerified: false,
    error: null,
    isLoading: false,
    isCheckingAuth: true,
    message: null,

 signup: async (email, password, name) => {
    set({ isLoading: true, error: null });

    try {
        await api.post("/api/auth/signup", { email, password, name });
        
        set({
            isAuthenticated: true,
            isVerified: false,
            isLoading: false,
        });

        return true;

    } catch (error) {
        set({
            error: error.response?.data?.message || "Signup failed",
            isLoading: false,
        });

        return false;

    }
},

    verifyEmail: async (code) => {
        set({ isLoading: true, error: null });
        try {
            const response = await api.post("/api/auth/verify-email", { code });
            set({ 
                user: response.data.user, 
                isAuthenticated: true, 
                isVerified: true, 
                isLoading: false 
            });

            return true;

        } catch (error) {
            set({ 
                error: error.response?.data?.message || "Error verifying email", 
                isLoading: false 
            });

            return false;
        }
    },

    login: async (email, password) => {
        set({ isLoading: true, error: null });
        try {
            const response = await api.post("/api/auth/login", { email, password });
            set({
                isAuthenticated: true,
                user: response.data.user,
                error: null,
                isLoading: false
            });
            return true; 
        } catch (error) {
            set({
                error: error.response?.data?.message || "Error logging in",
                isLoading: false
            });
            return false; 
        }
    },

    	logout: async () => {
		set({ isLoading: true, error: null });
		try {
			await axios.post(`${API_URL}/logout`);
			set({ user: null, isAuthenticated: false, error: null, isLoading: false });
		} catch (error) {
			set({ error: "Error logging out", isLoading: false });
			throw error;
		}
	},

    	forgotPassword: async (email) => {
		set({ isLoading: true, error: null });
		try {
			const response = await api.post("/api/auth/forgot-password", { email });
			set({ message: response.data.message, isLoading: false });
		} catch (error) {
			set({
				isLoading: false,
				error: error.response.data.message || "Error sending reset password email",
			});
			throw error;
		}
	},

    resetPassword: async (token, password) => {
		set({ isLoading: true, error: null });
		try {
			const response = await axios.post("/api/auth/reset-password/${token}", { password });
			set({ message: response.data.message, isLoading: false });
		} catch (error) {
			set({
				isLoading: false,
				error: error.response.data.message || "Error resetting password",
			});
			throw error;
		}
	},
}));

export default useAuthStore;