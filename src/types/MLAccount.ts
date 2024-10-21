import { Document } from "mongoose";

export interface IMLAccount extends Document {
  price: number;
  description: string;
  images: string[];
  createdAt?: Date;
  updatedAt?: Date;
}