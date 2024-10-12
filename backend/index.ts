import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import authRoutes from "./src/routes/authentication";
import productRoutes from "./src/routes/productRoutes";

dotenv.config();

const app = express();
app.use(express.json());

console.log("MONGODB_URI:", process.env.MONGODB_URI);

// Connect to MongoDB
console.log("Attempting to connect to MongoDB...");
mongoose
  .connect(process.env.MONGODB_URI as string)
  .then(() => console.log("Database connected"))
  .catch((err) => {
    console.error("Could not connect to MongoDB", err);
    process.exit(1); // Exit the application if the connection fails
  });

app.use("/auth", authRoutes);
app.use("/api", productRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
