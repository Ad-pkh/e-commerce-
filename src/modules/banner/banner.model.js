const moongoose=require("moongoose");
const { statustype } = require("../../config/constant.config");
const bannerschema= new moongoose.Schema({
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
        Enumerator:[statustype.ACTIVE,statustype.INACTIVE],
        default:statustype.INACTIVE

    },
    createdBy :{
     type:moongoose.Types.ObjectId,
     ref:"User",//from User table
     default:null
    }
},{
    timeStamp:true,
    autoIndex:true,
    autoCreate:true
})

const bannermodel= moongoose.Model("banner",bannerschema)
module.exports=bannermodel;
