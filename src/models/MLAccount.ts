import mongoose, {Schema, SchemaType} from "mongoose";

const mlAccountSchema: Schema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  
})