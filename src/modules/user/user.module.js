//database table related work
//schema is property ,definition of data
const mongoose=require("mongoose");
const { userrole, statustype } = require("../../config/constant.config");

const addressSchema=new mongoose.Schema({
    province:{
        type:String,
        enum:["koshi","madhesh","bagmati","lumbini","gandaki","karnali","sudurpashim"]
    },
    district:{type:String},
    localgovernment:{type:String},
    wardno:{type:String},
    village:{type:String}
})

                      //schema has 2 arg,{ property:definition},{}
const userSchema=new mongoose.Schema({
    name:{
        type:String,
        min:2,
        max:25,
        required:true
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        required:true,
        min:8
    },
    phone:{
        type:String,
        min:8,
        max:15
    },
    address:{
        parmanent:addressSchema,
        temporary:addressSchema

    },
    role:{
        type:String,
        enum:[...Object.values(userrole)],
        default:userrole.CUSTOMER
    },
    status:{
        type:String,
        enum:[...Object.values(statustype)],
        default:statustype.INACTIVE
    },
    activationToken:String,
    activateFor:Date,
    image:String,
    forgetToken:String,
    forgetFor:Date,
    createdBy:{
        type:mongoose.Types.ObjectId,
        ref:"User",//linking point//kasko reference ma i.e-> model name
        default:null
    }

},{
    timestamps:true,//created at ,updated at are auto listed
    autoIndex:true,
    autoCreate:true
});

                        //model name must be singular//collection name default is plural of model name
const Usermodel=mongoose.model("User",userSchema)//.model("modelname","definnition","collection name")

module.exports=Usermodel