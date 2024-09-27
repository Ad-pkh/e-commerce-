const express = require("express");
require("./db.config")//db connection
const router = require("./router.config");
const multer = require("multer");
const app = express();

//body parser is an built in function
//yedi raw bata json pathaune ho vane parser need to be loaded before loading route
// app.use(express.json()) //parser
// app.use(express.urlencoded)//for urlencoded

app.use(router);

app.use((req, res, next) => {
  next({ statusCode: 401, message: "route not defined" });
});

//error handling (next with arg=error,i.e next({}) )

app.use((error, req, res, next) => {
    console.log(error);

    let statusCode = error.status || 500;
    let message = error.message || "server error..";
    let details = error.details || null;

    //MONGODB UNIQUENESS ERROR
    if (error.code===11000){
      const uniqueFailedKeys= Object.keys(error.keyPattern)//return array->['email']
       details={};
      
      uniqueFailedKeys.map((field)=>{
        details[field]=field + " should be unique"
      })
      statusCode=400,message="validation failed"
    }


  //multer error
  if (error instanceof multer.MulterError) {
    if (error.code === "LIMIT-FILE-SIZE") {
      (statusCode = 400),
        (details = {
          [error.field]: "file size too large",
        });
    }
  }

  res.status(statusCode).json({
    message: message,
    details: details,
    meta: null,
  });
});

module.exports = app;
