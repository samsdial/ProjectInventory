import mongoose, { Document, Schema } from "mongoose";

export interface IProduct extends Document {
  name: string;
  description: string;
  quantity: number;
  stock_min: number;
  stock_current: number;
  category_id: mongoose.Types.ObjectId;
  brand_id: string;
  warehouse_id: mongoose.Types.ObjectId;
  image? : string
}

const ProductSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    quantity: { type: Number, required: true },
    stock_min: { type: Number, required: true },
    stock_current: { type: Number, required: true },
    category_id: { type: Schema.Types.ObjectId, required: true, ref: 'Category' },
    brand_id: { type: String, required: true },
    warehouse_id: { type: Schema.Types.ObjectId, required: true, ref: 'Warehouse' },
    image: {type: String, required: false}
  },
  { timestamps: true }
);

export const Product = mongoose.model<IProduct>("Product", ProductSchema);
