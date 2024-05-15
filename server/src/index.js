import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import router from './routers/index.js';
import errorMiddleware from "./middlewares/error-middelware.js";

dotenv.config();

const PORT = process.env.PORT || 8000;
const HOST = process.env.HOST || "localhost";

const app = express();
const corsOptions = {
    credentials: true,
    origin: process.env.CLIENT_URL
}

app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser());
app.use('/api', router)
app.use(errorMiddleware)

const start = async () => {
    try {
        app.listen(PORT, HOST, () => console.log(`Server started on PORT = ${PORT}`));
    } catch (error) {
        console.error(error);
    }
}

start();