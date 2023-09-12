const mongoose = require('mongoose');
require('dotenv').config();
const uri = process.env.MONGO_URI
const fs = require('fs');
const Data = require('../Models/Data')

mongoose.connect(uri).then(()=>{
    console.log('connected to database');
}).catch((err) =>{
    console.log('Database error', err)
})