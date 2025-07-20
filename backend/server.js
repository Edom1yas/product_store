import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { connectDB } from './config/db.js';
import productRoutes from './routes/product.routes.js';

dotenv.config();
const PORT = process.env.PORT;
const app =  express();

app.use(cors())
app.use(express.json()); // allows us to accept JSON data in the req.body
app.use("/api/products", productRoutes )

app.listen(PORT, () => {
    connectDB();
    console.log("server started at http://localhost:" + PORT);
});

//hello world