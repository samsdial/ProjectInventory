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
    (Product.create as jest.Mock).mockResolvedValue(newProduct);
    const response = await request(app).post("/api/products").send(newProduct);
    expect(response.status).toBe(201);
    expect(response.body).toMatchObject(newProduct);
  });
});
