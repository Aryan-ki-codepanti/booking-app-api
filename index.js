import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoutes from './routes/auth.js';
import usersRoutes from './routes/users.js';
import hotelsRoutes from './routes/hotels.js';
import roomsRoutes from './routes/rooms.js';

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
};

mongoose.connection.on("disconnected", () => {
    console.log("MongoDB disconnected");
});


// middlewares
app.use(express.json());

app.use("/api/auth" , authRoutes);
app.use("/api/users" , usersRoutes);
app.use("/api/hotels" , hotelsRoutes);
app.use("/api/rooms" , roomsRoutes);

app.listen(PORT_NUMBER, () => {
    connect();
    console.log("Connected to backend!");
});
