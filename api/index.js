import express from 'express';
import mongoose from 'mongoose';//for database usage
import dotenv from 'dotenv';
dotenv.config();

mongoose.connect(process.env.MONGO).then(()=>{
    console.log('connected to mongodb');
}).catch((err)=>{
    console.log('error');
});

const app =express();

app.listen(3000,()=>{
    console.log('server is running in port 3000');
});