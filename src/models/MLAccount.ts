import { IMLAccount } from "@/types/MLAccount";
import mongoose, { Schema } from "mongoose";

const MlAccountSchema: Schema<IMLAccount> = new Schema(
  {
    price: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    images: {
      type: [String],
      required: true,
      validate: {
        validator: function (images: string[]) {
          // Ensure that at least one image is provided
          return images.length > 0;
        },
        message: "At least one image is required",
      },
    },
  },
  { timestamps: true }
);

const MlAccount =
  mongoose.models.MlAccount ||
  mongoose.model<IMLAccount>("MlAccount", MlAccountSchema);

export default MlAccount;
