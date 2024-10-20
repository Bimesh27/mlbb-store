import { IUserPost } from "@/types/User";
import mongoose, { Schema } from "mongoose";

const userPostSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      maxLength: [50, "Title cannot be more than 50 characters"],
    },
    image: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
      maxLength: [100, "Description cannot be more than 100 characters"],
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    }
  },
  { timestamps: true }
);

const UserPost =
  mongoose.models.UserPost ||
  mongoose.model<IUserPost>("UserPost", userPostSchema);
export default UserPost;
