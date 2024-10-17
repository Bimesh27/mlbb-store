import mongoose, { Schema } from "mongoose";
import { IUser } from "@/types/User";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const userSchema: Schema = new Schema(
  {
    username: {
      type: String,
      required: true,
      minLength: [4, "Username should be atleast 4 character long."],
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
      minLength: [6, "Password should be atleast be 6 char"],
      maxLength: [20, "Password should be no more than 20 character"],
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
  },
  { timestamps: true }
);

const User = mongoose.models.user || mongoose.model<IUser>("User", userSchema);
export default User;
