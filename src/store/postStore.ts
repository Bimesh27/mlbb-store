import axios from "axios";
import { create } from "zustand";

interface Post {
  _id: string;
  title: string;
  image: string;
  description: string;
  createdBy: {
    _id: string;
    username: string;
    email: string;
    profilePicture: string;
    role: string;
  }
}

interface UserPostState {
  posts: Post[];
  loading: boolean;
  error: string | null;
  getPost: () => Promise<void>;
}

export const userPostStore = create<UserPostState>((set) => ({
  posts: [],
  loading: false,
  error: null,
  getPost: async () => {
    set({ loading: true, error: null });
    try {
      const response = await axios.get("/api/user-post/get");
      if (
        response.status === 200 &&
        response.data.success &&
        response.data.posts
      ) {
        set({ posts: response.data.posts, error: null });
      } else {
        throw new Error(response.data.message || "Failed to retrieve posts");
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "An error occurred";
      set({ posts: [], error: errorMessage });
    } finally {
      set({ loading: false });
    }
  },
}));
