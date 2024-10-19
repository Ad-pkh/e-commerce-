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
    getDetailbyfilter=async(filter)=>{
        try{
            const bannerDetail=await bannermodel.findOne(filter)
                                        .populate("createdBy",["_id","name","email","role"])
            return bannerDetail;
        }catch(exception){
            throw exception;
        }

    }

    bannerUpdate=async(id,data)=>{
        try{                                            //(id,{$set:data},{new:true})args
            const update=bannermodel.findByIdAndUpdate(id,{$set:data},{new:true})//without 3rrd arg it returns data before update and with 3rd arg it returns data after update
            return update;
            
        }catch(exception){
            throw exception;
        }
    }
}
module.exports=new bannerservice()