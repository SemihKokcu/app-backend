const path = require('path');
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const multer = require("multer");
const dotenv = require('dotenv');
const {errorHandler} = require("./src/utils/errors/errorHandler");
const {fileFilter,fileStorage} = require("./src/utils/multer/imageSettings");

// .env dosyasını yükleyin
const envFile = process.env.NODE_ENV === 'production' ? '.env.prod' : '.env.dev';
dotenv.config({ path: path.resolve(__dirname, envFile) });

const app = express();
app.use(bodyParser.json()); 

app.use( multer({ storage: fileStorage, fileFilter: fileFilter }).single('image'));
app.use('/images', express.static(path.join(__dirname, '/public/images')));  

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
      'Access-Control-Allow-Methods',
      'OPTIONS, GET, POST, PUT, PATCH, DELETE'
    );
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
  });


app.use(errorHandler)
mongoose.connect(process.env.DATABASE_URL).then((result)=>{app.listen(process.env.PORT); console.info("listening this port: "+process.env.PORT)}).catch((error)=>{console.info(error)});