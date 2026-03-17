
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./routes/authRoutes.js";
import biodataRoutes from "./routes/biodataRoutes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

app.use("/api/auth", authRoutes);
app.use("/api/biodata", biodataRoutes);

mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    console.log("Mongo Connected");
    app.listen(5000, ()=>console.log("Server running 5000"));
})
.catch(err=>console.log(err));
