const mongoose=require("mongoose");
const { statustype } = require("../../config/constant.config");
const categoryschema= new mongoose.Schema({
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
    },
    parent_id:{
        type:mongoose.Types.ObjectId,
        ref:"Category",
        default:null
    },
    brands:[{   //Array
       type:mongoose.Types.ObjectId,
        ref:"Brand",
        default:[]
    }]
},{
    timestamps:true,
    autoIndex:true,
    autoCreate:true
})

const categorymodel= mongoose.model("Category",categoryschema)
module.exports=categorymodel;
