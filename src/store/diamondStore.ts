import axios from "axios";
import { toast } from "react-toastify";
import { create } from "zustand";

interface Diamond {
  _id: string;
  amount: number;
  price: number;
  bonus?: number;
}

interface addDiamondCredentials {
  price: number | undefined;
  amount: number | undefined;
  bonus?: number | undefined;
}
interface DiamondState {
  diamonds: Diamond[];
  loading: boolean;
  error: string | null;
  getDiamond: () => Promise<void>;
  addDiamond: (credentials: addDiamondCredentials) => Promise<void>;
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
        // toast.success("Diamonds retrieved successfully!");
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

  addDiamond: async (credentials: addDiamondCredentials) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.post("/api/diamond/add", credentials);
      if (response.data.success && response.status === 201) {
        set({ error: null });
        toast.success("Diamond added successfully!");
      } else {
        throw new Error(response.data.message || "Failed to add diamond");
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "An error occurred";
      toast.error(errorMessage);
      set({ error: errorMessage });
    } finally {
      set({ loading: false });
    }
  },
}));
