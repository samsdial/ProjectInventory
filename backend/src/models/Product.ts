// import mongoose from "mongoose";
import mongoose, { Document, Schema } from "mongoose";

export interface IProduct extends Document {
  name: string;
  description: string;
  quantity: number;
  stock_min: number;
  stock_current: number;
  category_id: string;
  brand_id: string;
  warehouse_id: string;
}

const ProductSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    quantity: { type: Number, required: true },
    stock_min: { type: Number, required: true },
    stock_current: { type: Number, required: true },
    category_id: { type: String, required: true },
    brand_id: { type: String, required: true },
    warehouse_id: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model<IProduct>("Product", ProductSchema);
