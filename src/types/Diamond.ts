import { Document } from "mongoose";

export interface IDiamond extends Document {
  amount: number;
  price: number;
  bonus?: number;
  createdAt: Date;
  updatedAt: Date;
}