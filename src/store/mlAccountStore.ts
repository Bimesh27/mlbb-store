import axios from "axios";
import { toast } from "react-toastify";
import { create } from "zustand";

interface MlAccount {
  _id: string;
  price: number;
  description: string;
  images: string[];
  createdAt: string;
  updatedAt: string;
}

interface MlStoreState {
  posts: MlAccount[];
  loading: boolean;
  error: string | null;
  getPosts: () => Promise<void>;
  // addPost: (post: MlPost) => Promise<void>;
  // deletePost: (id: string) => Promise<void>;
  // updatePost: (post: MlPost) => Promise<void>;
}
export const useMlStore = create<MlStoreState>((set) => ({
  posts: [],
  loading: false,
  error: null,
  getPosts: async () => {
    set({ loading: true, error: null });
    try {
      const response = await axios.get("/api/stock-account/get");
      if (
        response.data.success &&
        response.data.stockAccounts &&
        response.data.status === 200
      ) {
        set({ posts: response.data.stockAccounts });
      } else {
        throw new Error(response.data.message);
      }
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to fetch posts";
      set({ error: errorMessage });
    } finally {
      set({ loading: false });
    }
  },

}));
