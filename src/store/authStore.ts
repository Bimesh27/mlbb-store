import axios from "axios";
import { create } from "zustand";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface User {
  id: string;
  email: string;
  username: string;
  role: string;
  profilePicture: string;
}

interface LoginCredentials {
  email: string;
  password: string;
}

interface RegisterCredentials extends LoginCredentials {
  username: string;
}

interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
  specificUser: User | null;
  register: (credentials: RegisterCredentials) => Promise<void>;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
  getCurrentUser: () => Promise<void>;
  getUserById: (id: string) => Promise<void>;
}

const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: false,
  error: null,
  specificUser: null,

  register: async (credentials: RegisterCredentials) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.post("/api/signup", credentials);
      if (response.data.success) {
        set({ user: response.data.user });
        toast.success(response.data.message || "Registration successful!");
        return Promise.resolve();
      } else {
        throw new Error(response.data.message);
      }
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || error.message || "Registration failed";
      set({ error: errorMessage });
      toast.error(errorMessage);
      return Promise.reject(errorMessage);
    } finally {
      set({ loading: false });
    }
  },

  login: async (credentials: LoginCredentials) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.post("/api/login", credentials);
      if (response?.data?.success) {
        set({ user: response?.data?.user });
        toast.success(response?.data?.message || "Login successful!");

        return Promise.resolve();
      } else {
        throw new Error(response?.data?.message);
      }
    } catch (error: any) {
      const errorMessage =
        error?.response?.data?.message || error?.message || "Login failed";
      set({ error: errorMessage });
      return Promise.reject(errorMessage);
    } finally {
      set({ loading: false });
    }
  },
  
  logout: async () => {
    set({ loading: true, error: null });
    try {
      const response = await axios.post("/api/logout");
      if (response.data.success) {
        set({ user: null });
        toast.success(response.data.message || "Logout successful!");
        return Promise.resolve();
      } else {
        throw new Error(response.data.message);
      }
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || error.message || "Logout failed";
      set({ error: errorMessage });
      return Promise.reject(errorMessage);
    } finally {
      set({ loading: false });
    }
  },

  getCurrentUser: async () => {
    set({ loading: true, error: null });
    try {
      const response = await axios.get("/api/get-current-user");

      if (response.data?.success || response.data?.status === 200) {
        set({ user: response.data.user });
      } else {
        set({ user: null });
        toast.error(response.data?.message || "Failed to fetch user data");
      }
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        "An error occurred while fetching user data.";
      // toast.error(errorMessage);
      set({ user: null });
    } finally {
      set({ loading: false });
    }
  },

  getUserById: async (id: string) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.get(`/api/get-user-by-id/${id}`);
      console.log("id", id);
      
      if (response.data.success && response.data.user) {
        set({ specificUser: response.data.user });
      } else {
        throw new Error(response.data.message);
      }
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "User not found";
    } finally {
      set({ loading: false });
    }
  },
}));

export default useAuthStore;
