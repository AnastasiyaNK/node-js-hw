import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const URL = process.env.MONGO_URL;

async function connectDB() {
    try {
        await mongoose.connect(URL);
        console.log("Successful connection to MongoDB");
        
    } catch (error) {
        console.error("Error connecting to MongoDB: ", error);
        
    }
    
}
export default connectDB;
