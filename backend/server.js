import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import porductRoutes from './routes/product.routes.js';

dotenv.config();
const PORT = process.env.PORT;
const app =  express();

app.use(express.json()); // allows us to accept JSON data in the req.body

app.use("/api/products", porductRoutes )

app.listen(PORT, () => {
    connectDB();
    console.log("server started at http://localhost:" + PORT);
});

//hello world