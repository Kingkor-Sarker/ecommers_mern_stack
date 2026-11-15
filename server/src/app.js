// const express = require('express');
// const morgan = require('morgan');
// const app = express();
// const createError = require('http-errors');
// // const sanitizer = require('express-sanitizer');
// const ratelimiter = require('express-rate-limit');
// const xssClean = require('xss-clean');

import express from "express";
import morgan from "morgan";
import createError from "http-errors";
import ratelimiter from "express-rate-limit";
import userRouter from "./routers/userRouter.js";
import { seedRouter } from "./routers/seedRouter.js";

const app = express();

const limiter = ratelimiter({
    windowMs: 1 * 60 * 1000, // 1 minute
    max: 10, // limit each IP to 10 requests per windowMs
    message: "Too many requests from this IP, please try again after a minute"
})


app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(limiter);

app.use("/api/users",userRouter);
app.use("/api/seed",seedRouter)

app.get('/test', (req, res) =>{
    res.json({
        get: "Test endpoint working fine!"
    })
})

// client error handeler
app.use((req, res, next) => {
    // res.status(404).json({message: "Route not found!"}); this is another way
    next(createError(404, "route not found!")); // this uses the http-errors package
});

//server error  handeler (all error will come here if not handled in the route)
app.use((err, req, res, next) =>{
    return res.status(err.status || 500).json({
        success: false,
        message: err.message || "Internal server error!"
    })
})

// module.exports = app;
export default app;