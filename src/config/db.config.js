require("dotenv").config()
const mongoose=require('mongoose')

//takes 2 arg-> (connection url,option)
mongoose.connect(process.env.MONGODB_URL,{
    dbName:process.env.DBNAME,//selection of db
    autoCreate:true,
    autoIndex:true
}).then(()=>{
    console.log("DB server connected successfully...");
    
}).catch((err)=>{
    console.log("error while connecting DB!!!");
    console.log(err);
    process.exit(1)
})