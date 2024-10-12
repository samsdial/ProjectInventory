import express from "express";

import { connectDB } from "./src/db";
import authRoutes from "./src/routes/authentication";
import productRoutes from "./src/routes/productRoutes";

const app = express();
app.use(express.json());
connectDB();

app.use("/auth", authRoutes);
app.use("/api", productRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
