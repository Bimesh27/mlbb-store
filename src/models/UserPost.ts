import { IUserPost } from "@/types/User";
import mongoose, { Schema } from "mongoose";

const userPostSchema: Schema<IUserPost> = new Schema(
  {
    image: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      maxLength: [100, "Description cannot be more than 100 characters"],
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const UserPost =
  mongoose.models.UserPost ||
  mongoose.model<IUserPost>("UserPost", userPostSchema);
  
export default UserPost;
