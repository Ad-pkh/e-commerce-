const bannermodel = require("./banner.model");

class bannerservice{
    bannercreate=async (data)=>{
        try{
            const banner=new bannermodel(data)
            return await banner.save()
            
        }catch(exception){
            throw exception;
        }
    }
    listdata= async({skip=0,limit=10,filter={}})=>{
        try{
            const count=await bannermodel.countDocuments(filter);
            const data=await bannermodel.find(filter)
                                    .populate("createdBy",["_id","name","email","role"])
                                    .sort({_id:"desc"})
                                    .limit(limit)
                                    .skip(skip)
            return {count,data}
        }catch(exception){
            throw exception;
        }
    }
}
module.exports=new bannerservice()