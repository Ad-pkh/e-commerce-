const mongoose=require("mongoose");
const { statustype } = require("../../config/constant.config");
const bannerschema= new mongoose.Schema({
    title:{
        type:String,
        required:true,
        min:2,
        max:100
    },
    image :{
        type:String,
        required:true
    },
    link :{
        type:String,
        default:null
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

const bannermodel= mongoose.model("Banner",bannerschema)
module.exports=bannermodel;
