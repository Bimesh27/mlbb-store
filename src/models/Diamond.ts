import { IDiamond } from "@/types/Diamond";
import mongoose, { Schema } from "mongoose";

const diamondSchema: Schema<IDiamond> = new Schema(
  {
    amount: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    bonus: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const Diamond =
  mongoose.models.Diamond || mongoose.model<IDiamond>("Diamond", diamondSchema);
export default Diamond;
