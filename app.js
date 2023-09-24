// Basic Lib Import
const express = require('express');
const router =require('./src/routes/api');
const app= new express();
const bodyParser =require('body-parser');
require('dotenv').config();
// Security Middleware Lib Import
const rateLimit =require('express-rate-limit');
const helmet =require('helmet');
const mongoSanitize =require('express-mongo-sanitize');
const xss =require('xss-clean');
const hpp =require('hpp');
const cors =require('cors');

// Database Lib Import
const mongoose =require('mongoose');
const {infoLogger, errorLogger} = require("./src/shared/logger");

// Security Middleware Implement
app.use(cors())
app.use(helmet())
app.use(mongoSanitize())
app.use(xss())
app.use(hpp())

app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));

// Request Rate Limit
const limiter= rateLimit({windowMs:15*60*1000,max:3000})
app.use(limiter)

// Mongo DB Database Connection
let URI="mongodb+srv://<username>:<password>@cluster0.7uslu.mongodb.net/todo?retryWrites=true&w=majority";
// let OPTION={user:'testuser7777',pass:'testuser7777',autoIndex:true}
const OPTION={autoIndex:true}

mongoose.connect(process.env.DATABASE, OPTION, (error)=>{
    if (error){
        errorLogger.error(error);
    }else {
        infoLogger.info(`DB is connected successfully`);
    }
})



// Routing Implement
app.use("/api/v1",router)

// Undefined Route Implement
app.use("*",(req,res)=>{
    res.status(404).json({status:"fail",data:"Not Found"})
})


module.exports=app;