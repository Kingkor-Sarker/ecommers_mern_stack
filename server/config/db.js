import mongoose from "mongoose";
import { mongodbURL } from "../src/secret.js";

const connectDB = async (options = {}) => {
    mongoose.connection.on("error", (error) => {
        console.error(`Database connection error: ${error.message}`);
    });

    try {
        await mongoose.connect(mongodbURL, options);
        console.log("Connected to database successfully.");
    } catch (error) {
        console.error(`Could not connect to database: ${error.message}`);
    }
};

export { connectDB };