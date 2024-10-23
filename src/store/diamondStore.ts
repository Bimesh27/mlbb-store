
import axios from "axios";
import { toast } from "react-toastify";
import { create } from "zustand";

interface Diamond {
  id: string;
  amount: number;
  price: number;
  bonus?: number;
}

interface DiamondState {
  diamonds: Diamond[];
  loading: boolean;
  error: string | null;
  getDiamond: () => Promise<void>;
}

export const useDiamondStore = create<DiamondState>((set) => ({
  diamonds: [],
  loading: false,
  error: null,

  getDiamond: async () => {
    set({ loading: true, error: null });
    try {
      const response = await axios.get("/api/diamond/get");

      if (
        response.status === 200 &&
        response.data.success &&
        response.data.diamonds
      ) {
        set({
          diamonds: response.data.diamonds,
          error: null,
        });
        toast.success("Diamonds retrieved successfully!");
      } else {
        throw new Error(response.data.message || "Failed to retrieve diamonds");
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "An error occurred";
      toast.error(errorMessage);
      set({ diamonds: [], error: errorMessage });
    } finally {
      set({ loading: false });
    }
  },
}));
