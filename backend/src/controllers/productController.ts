// import { Product } from "../models/Product";
import { Request, Response } from "express";
import { Product } from "../models/Product";
import { createResponse } from "../interfaces";

export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const products = await Product.find()
    .populate("category_id", "name")
    .populate("warehouse_id");
    console.log(products)
    res.status(200).json(createResponse(products, "Products retrieved succesfully", true));
  } catch (error) {
    res.status(500).json(createResponse(null, "Error retrieving products", false));
  }
};

export const createProduct = async (req: Request, res: Response) => {
  const { name, description, quantity, stock_min, stock_current, category_id, brand_id, warehouse_id } = req.body;
  try {
    const newProduct = new Product({
      name,
      description,
      quantity,
      stock_min,
      stock_current,
      category_id,
      brand_id,
      warehouse_id,
    });
    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(500).json({ message: "Error creating product" });
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, description, quantity, stock_min, stock_current, category_id, brand_id, warehouse_id } = req.body;

  try {
    const updatedProduct = await Product.findOneAndUpdate(
      { _id: id },
      {
        name,
        description,
        quantity,
        stock_min,
        stock_current,
        category_id,
        brand_id,
        warehouse_id,
      },
      { new: true },
    );
    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: "Error updating product", error });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const deletedProduct = await Product.findByIdAndDelete(id);
    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting product", error });
  }
};
