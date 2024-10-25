import { Document, Types } from "mongoose";

//types for mongo Schema
export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  role?: "admin" | "user";
  profilePicture?: string;
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

export interface jwtPayload {
  id: string;
  username: string;
}

export interface IUserPost extends Document {
  image: string;
  description: string;
  createdBy: Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}
