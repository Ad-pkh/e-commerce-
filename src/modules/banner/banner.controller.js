
const { uploadImage } = require("../../config/cloudinary.config");
const { filedelete } = require("../../utilities/helper");
const bannermodel = require("./banner.model");
const bannerService = require("./banner.service");

class bannerController{

    create=async(req,res,next)=>{
        try{

            const data=req.body
            data.image= await uploadImage("./public/uploads/banner/"+req.file.filename);//gives image url
           //delete img from local 
           filedelete("./public/uploads/banner/"+req.file.filename);
           data.createdBy=req.authUser._id;
           
           const banner=await bannerService.bannercreate(data)// banner creation
           res.json({
            result:banner,
            message:"Banner Created successfully",
            meta:null
           })
           console.log(data.image);
        //    bannermodel({
        //     title:req.title,
        //     link:imageupload,


        //    })


        }catch(exception){
            console.log(exception); 
            
            next(exception)
        }

    }
    details=async(req,res,next)=>{
        try{
            const page=+req.query.page||1
            const limit=+req.query.limit||10
            const skip=(page-1)*limit

            let filter={};
            if(req.query.search){
                filter={
                    title:new RegExp(req.query.search,'i')
                }
            }
            const {count,data}=await bannerService.listdata({
                skip:skip,
                filter:filter
            })
            
            
            res.json({
                result:data,
                message:"Total Banner list",
                meta:{
                    currentpage:page,
                    total:count,
                    limit:limit
                }
            })

        }catch(exception){
            console.log(exception);
            next(exception)
            
        }

    }
    show=async(req,res,next)=>{

    }
    update=async(req,res,next)=>{

    }
    delete=async(req,res,next)=>{

    }


}

module.exports=new bannerController();