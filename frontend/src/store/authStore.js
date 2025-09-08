
import { create } from "zustand";
import api from "../services/api";

const useAuthStore = create((set) => ({
    user: null,
    isAuthenticated: false,
    error: null,
    isLoading: false,
    isCheckingAuth: true,

    signup: async (email, password, name) => {
        set({ isLoading: true, error: null });

        try {
            const response = await api.post("/api/auth/signup", { email, password, name });
            const user = response.data.user;

            set({
                user: user,
                isAuthenticated: true,
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
            const user = response.data.user;
            set({
                user: user,
                isAuthenticated: true,
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
            const user = response.data.user;
            set({
                user: user,
                isAuthenticated: true,
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
            await api.post("/api/auth/logout");
            set({ 
                user: null, 
                isAuthenticated: false, 
                error: null, 
                isLoading: false 
            });
        } catch (error) {
            set({ 
                error: "Error logging out", 
                isLoading: false 
            });
        }
    },

    forgotPassword: async (email) => {
        set({ isLoading: true, error: null });
        try {
            await api.post("/api/auth/forgot-password", { email });
            set({
                isLoading: false
            });

            return true;
        } catch (error) {
            set({
                error: error.response?.data?.message || "Error sending reset password email",
                isLoading: false,
            });

            return false;
        }
    },

    resetPassword: async (token, password) => {
        set({ isLoading: true, error: null });
        try {
            await api.post(`/api/auth/reset-password/${token}`, { password });
            set({ isLoading: false });

            return true;

        } catch (error) {
            set({
                error: error.response.data.message || "Error resetting password",
                isLoading: false,
            });

            return false;
        }
    },

    checkAuth: async () => {
        set({ isCheckingAuth: true, error: null });
        try {
            const response = await api.get("/api/auth/check-auth");
            set({
                user: response.data.user,
                isAuthenticated: true,
                isCheckingAuth: false,
            });
        } catch (error) {
            set({
                user: null,
                error: null, 
                isCheckingAuth: false,
                isAuthenticated: false,
            });
        }
    },
}));

export default useAuthStore;