import mongoose from "mongoose";
import dotenv from "dotenv";

export function connectDB(){
    dotenv.config();     
    console.log("MONGODB_URI:", process.env.MONGODB_URI);

    console.log("Attempting to connect to MongoDB...");
    mongoose.connect(process.env.MONGODB_URI as string)
        .then(() => console.log("Database connected"))
        .catch(err => {
            console.error("Could not connect to MongoDB", err);
            process.exit(1); // Exit the application if the connection fails
    });
}
