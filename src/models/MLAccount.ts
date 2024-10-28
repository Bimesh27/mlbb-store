import { IMLAccount } from "@/types/IMLAccount";
import mongoose, { Schema } from "mongoose";

const MLAccountSchema: Schema<IMLAccount> = new Schema(
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
          // Ensure that at least one image is provided and a maximum of 4 images
          return images.length > 0 && images.length <= 4;
        },
        message: "You must provide between 1 and 4 images",
      },
    },
  },
  { timestamps: true }
);

const MLAccount =
  mongoose.models.MlAccount ||
  mongoose.model<IMLAccount>("MlAccount", MLAccountSchema);

export default MLAccount;
