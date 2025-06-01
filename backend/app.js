const express = require("express");
require('dotenv').config()


const app = express(); //express app, act as a middleware

const bodyParser = require("body-parser"); //imnport body-parser

const userRoutes=require('./routes/user');
const expenseRoutes=require('./routes/expense');

const mongoose = require("mongoose");

const MONGODB_URI = process.env.MONGODB_URI; 

if (!MONGODB_URI) {
  throw Error("Please define MONGODB_URI in the env")
}

mongoose.connect(MONGODB_URI)
.then(()=>{
  console.log("Connected to database");
})
.catch(()=>{
  console.log("Not able to connect to database");
})

const cors = require('cors');

app.use(cors({
  origin: '*'  
}));

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-With,Content-Type,Accept,authentication",
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,POST,DELETE,PATCH,OPTIONS"
  );
  next();
});

app.use('/v1/api',expenseRoutes);
app.use('/v1/api/USER',userRoutes);

module.exports = app;
