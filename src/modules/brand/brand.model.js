const mongoose=require("mongoose");
const { statustype } = require("../../config/constant.config");
const brandschema= new mongoose.Schema({
    title:{
        type:String,
        unique:true,
        required:true,
        min:2,
        max:100
    },
    image :{
        type:String,
        required:true
    },
    slug:{
        type:String,
        unique:true,
        required:true
        
    } ,
    status :{
        type:String,
        required:true,
        enum:[statustype.ACTIVE,statustype.INACTIVE],
        default:statustype.INACTIVE

    },
    createdBy :{
     type:mongoose.Types.ObjectId,
     ref:"User",//from User table
     default:null
    },
    public_id:{//for cloudinary
        type:String,
        default:null
    }
},{
    timestamps:true,
    autoIndex:true,
    autoCreate:true
})

const brandmodel= mongoose.model("Brand",brandschema)
module.exports=brandmodel;
