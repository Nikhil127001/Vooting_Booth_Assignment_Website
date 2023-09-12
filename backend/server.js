const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const apiRoutes = require('./Routes/apiRoutes');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const port  = 8000;
require('./Database/db');
require('dotenv').config();
app.use(bodyParser.json());
app.use(cors());
app.use(cookieParser());
app.use(express.urlencoded({extended : true}))

app.use('/', apiRoutes);

const path = require('path');

if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname,"./frontend/build")));
    app.get("*", (_,res) => res.sendFile(path.join(__dirname, "./frontend/build/index.html"),function(err){ res.status(500).send(err)}));
}else{
    app.get("/" , (req,res) => {
        res.json({message : "api running..."});
    })
}

app.use((err,req,res,next)=>{
    res.json({
        message: err.message
    })
})
app.listen(port,()=>{
    console.log(`Starting server on port ${port}` );
})