import mongoose, { Schema } from "mongoose";
import { IUser } from "@/types/User";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const userSchema: Schema<IUser> = new Schema(
  {
    username: {
      type: String,
      required: true,
      minLength: [3, "Username should be atleast 3 character long."],
      maxLength: [16, "Username cannot exceed 16 character."],
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: (value: string) => emailRegex.test(value),
        message: "Please enter a valid email address",
      },
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
  },
  { timestamps: true }
);

const User = mongoose.models.User || mongoose.model<IUser>("User", userSchema);
export default User;
