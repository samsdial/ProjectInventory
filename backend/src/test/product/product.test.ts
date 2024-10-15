import request from "supertest";
import { app } from "../../../app";
import { Product } from "../../models/Product";

jest.mock("../../models/Product");

describe("Get /api/products", () => {
  it("should return a list of products", async () => {
    (Product.find as jest.Mock).mockResolvedValue([]);
    const response = await request(app).get("/api/products");
    expect(response.status).toBe(200);
    expect(response.body).toEqual([]);
  });
});

describe("Post /api/products", () => {
  it("should create a new product", async () => {
    const newProduct = {
      name: "Product 1",
      description: "This is a product",
      quantity: 10,
      stock_min: 5,
      stock_current: 7,
      category_id: "123",
      brand_id: "456",
      warehouse_id: "789",
    };
    console.log(newProduct);
    const response = await request(app).post("/api/products").send(newProduct);
    expect(response.status).toBe(201);
    //expect(response.body).toMatchObject(newProduct);
  });
});

describe("Put /api/products/:id", () => {
  it("should update a product", async () => {
    const updatedProduct = {
      name: "Updated Product",
      description: "This is an updated product",
      quantity: 20,
      stock_min: 10,
      stock_current: 15,
      category_id: "123",
      brand_id: "456",
      warehouse_id: "789",
    };
    const productId = "616e536a8af27e7d4efb5e35";

    (Product.findOneAndUpdate as jest.Mock).mockResolvedValue(updatedProduct);
    const response = await request(app).put(`/api/products/${productId}`).send(updatedProduct);
    expect(response.status).toBe(200);
    //expect(response.body).toMatchObject(updatedProduct);
  });

  it("should return a 404 error if the product does not exist", async () => {
    const productId = "616e536a8af27e7d4efb5e35";
    (Product.findOneAndUpdate as jest.Mock).mockResolvedValue(null);
    const response = await request(app).put(`/api/products/${productId}`).send({
      name: "Updated Product",
    });

    expect(response.status).toBe(404);
    expect(response.body).toBe("Product not found");
  });
});

describe("Delete /api/products/:id", () => {
  it("should delete a product", async () => {
    const productId = "616e536a8af27e7d4efb5e35";

    (Product.findByIdAndDelete as jest.Mock).mockResolvedValue({
      _id: productId,
      name: "Product 1",
    });
    const response = await request(app).delete(`/api/products/${productId}`);
    expect(response.status).toBe(200);
    expect(response.body).toBe("Product deleted successfully");
  });

  it("should return a 404 error if the product does not exist", async () => {
    const productId = "616e536a8af27e7d4efb5e35";

    (Product.findByIdAndDelete as jest.Mock).mockResolvedValue(null);

    const response = await request(app).delete(`/api/products/${productId}`);
    expect(response.status).toBe(404);
    expect(response.body).toBe("Product not found");
  });
});
