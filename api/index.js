import express from 'express';
import mongoose from 'mongoose';//for database usage
import dotenv from 'dotenv';
import userRouter from './routes/user.route.js';
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

app.use('/api/user',userRouter)

//route will be presented in route folder and then the (req,res) will be in controller folder


// app.get('/test',(req,res)=>{
//     // res.send('hello world');
//     res.json({
//         'message':"hello worls"
//     })
// });