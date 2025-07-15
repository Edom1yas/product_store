import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import Product from './models/product.model.js';
import mongoose from 'mongoose';

dotenv.config();

const app =  express();

app.use(express.json()); // allows us to accept JSON data in the req.body

app.post("/api/products", async (req, res) => {
    const product = req.body;// user sends this data
    if(!product.name || !product.price || !product.image){
        return res.status(400).json({success:false, message:"please provide all fields"});
    }

    const newProduct = new Product(product);

    try{
       await newProduct.save();
       res.status(201).json({success:true, data:newProduct}) 
    }catch(error){
        console.error("Error occured while creating product:", error.message);
        res.status(500).json({success: false, message:"Server Error"});
    }
});

app.delete("/api/products/:id", async (req,res) => {
    const {id} = req.params;
    console.log("id:", id);
    
    try{
        await Product.findByIdAndDelete(id);
        res.status(200).json({success:true, message:"Product successfuly deleted"})
    }catch(error){
        console.log("Error deleting product", error.message);
        res.status(404).json ({success:false, message:"Product not found"})
    }
});

app.get("/api/products", async(req,res) => {
    try{
        const products = await Product.find({});
        res.status(200).json ({success:true, data:products});
    }catch(error){
        console.log("Error fetching products", error.messasge);
        res.status(500).json({success:false, message:"Server Error"});
    };
});

app.put("/api/products/:id", async(req,res) => {
    const {id} = req.params;
    console.log("id:", id);
    const product = req.body;

    // if(!mongoose.Types.ObjectId.isValid(id)){
    //     return res.status(404).json({success:false, message:"Invalid product ID"});
    // }

    try{
        const updatedProduct = await Product.findByIdAndUpdate(id, product, {new:true});
        res.status(200).json({success:true, data:updatedProduct});
    }catch(error){
        console.log("Error Updating producet", error.message)
        res.status(500).json({success:false, message:"Server Error"});
    }
});

app.listen(5000, () => {
    connectDB();
    console.log("server started at http://localhost:5000");
});

//hello world