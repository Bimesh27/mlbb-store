import { Document } from "mongoose";

//types for mongo Schema
export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  role?: "admin" | "user";
  createdAt?: Date;
  updatedAt?: Date;
}

export interface SignupRequestBody {
  username: string;
  email: string;
  password: string;
}

export interface LoginRequestBody {
  email: string;
  password: string;
}