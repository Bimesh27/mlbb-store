import { IDiamond } from "@/types/Diamond";
import mongoose, { Schema } from "mongoose";

const diamondSchema: Schema = new Schema({
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
});

const Diamond =
  mongoose.models.Diamond || mongoose.model<IDiamond>("Diamond", diamondSchema);
export default Diamond;
