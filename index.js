const express=require('express');
const mongoose=require('mongoose');
const winston=require('winston');
const bodyParser = require('body-parser');
const floodsroutes=require('./routes/flooddata')
const app=express();
require('dotenv').config();
 
 
app.use(bodyParser.json({limit:'50mb'}));
app.use(bodyParser.urlencoded({
  extended: true
}));

//create a logger 
const logger = winston.createLogger({
    level: 'info',
    transports: [
      new winston.transports.Console({
          format:winston.format.combine(
              winston.format.colorize({all:true})
          )
      }),
      new winston.transports.File({ filename: 'error.log', level: 'error'})
    ],
    exceptionHandlers: [
        new winston.transports.File({ filename: 'exceptions.log' })
      ]
  });
//routes
app.use('/flooddata',floodsroutes);
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true },{ useUnifiedTopology: true }).then(()=>{
    logger.log("info","connected to mongodb atlas")
}).catch((error)=>{
    logger.log("error",error)
    });

const PORT=process.env.PORT ||3000
    app.listen(PORT,()=>{
        logger.log("warn","Server started at PORT",PORT);
    });
    
    