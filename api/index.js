import express from 'express';
import mongoose from 'mongoose';//for database usage
import dotenv from 'dotenv';
import userRouter from './routes/user.route.js';
import authRouter from './routes/auth.route.js';
dotenv.config();

mongoose.connect(process.env.MONGO).then(()=>{
    console.log('connected to mongodb');
}).catch((err)=>{
    console.log('error');
});

const app =express();

app.use(express.json());

app.listen(3000,()=>{
    console.log('server is running in port 3000');
});

app.use('/api/user',userRouter);
app.use('/api/auth',authRouter);

app.use((err,req,res,next)=>{
    const statusCode = err.statusCode || 500;
    const message=err.message || "internal server error";
    return res.status(statusCode).json({
        success : false,
        statusCode,
        message
    });
})

//route will be presented in route folder and then the (req,res) will be in controller folder


// app.get('/test',(req,res)=>{
//     // res.send('hello world');
//     res.json({
//         'message':"hello worls"
//     })
// });