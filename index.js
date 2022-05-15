import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";

const app = express();
dotenv.config();
const PORT_NUMBER = 8800;
const MONGO_URI = process.env.MONGO_URI;


const connect = async () => {   
    try {
        await mongoose.connect(MONGO_URI);
        console.log("Connected to mongoDB.");
    } catch (error) {
        throw error;
    }
}

mongoose.connection.on("disconnected" , () => {
    console.log("MongoDB disconnected");
})
mongoose.connection.on("connected" , () => {
    console.log("MongoDB connected");
})

app.listen(PORT_NUMBER, () => {
    connect();
    console.log("Connected to backend!");
});
