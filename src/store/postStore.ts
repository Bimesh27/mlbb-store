import axios from "axios";
import { Types } from "mongoose";
import { toast } from "react-toastify";
import { create } from "zustand";

interface Post {
  _id: string;
  image: string;
  description: string;
  createdBy: {
    _id: string;
    username: string;
    email: string;
    profilePicture: string;
    role: string;
  };
}

interface UploadPostCredentials {
  description: string;
  image: string;
  createdBy: string;
}

interface UserPostState {
  posts: Post[];
  loading: boolean;
  error: string | null;
  getPost: () => Promise<void>;
  uploadPost: (credentials: UploadPostCredentials) => Promise<void>;
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

  uploadPost: async (credentials) => {
    set({loading: true, error: null});
    try {
      const response = await axios.post("/api/user-post/upload", credentials);
      if(response.status === 201 && response.data.success) {
        toast.success(response.data.message);
        set({error: null});
      } else {
        throw new Error(response.data.message || "Failed to upload post");
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "An error occurred";
      set({error: errorMessage});
    }
  }
}));
