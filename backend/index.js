import express from "express";
import dotenv from "dotenv";
import connectDb from "./config/db.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRouter from "./routes/auth.route.js";
import userRouter from "./routes/user.route.js";
dotenv.config({quiet:true});
const app = express();
const port = process.env.PORT;
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth",authRouter);
app.use("/api/user",userRouter);
app.listen(port, () => {
    console.log("Server running on port ",port);
    connectDb(); 
})