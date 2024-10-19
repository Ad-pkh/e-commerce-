const brandmodel = require("./brand.model");

class brandservice{
    brandcreate=async (data)=>{
        try{
            const brand=new brandmodel(data)
            return await brand.save()
            
        }catch(exception){
            throw exception;
        }
    }
    listdata= async({skip=0,limit=10,filter={}})=>{
        try{
            const count=await brandmodel.countDocuments(filter);
            const data=await brandmodel.find(filter)
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
            const brandDetail=await brandmodel.findOne(filter)
                                        .populate("createdBy",["_id","name","email","role"])
            return brandDetail;
        }catch(exception){
            throw exception;
        }

    }

    brandUpdate=async(id,data)=>{
        try{                                            //(id,{$set:data},{new:true})args
            const update=await brandmodel.findByIdAndUpdate(id,{$set:data},{new:true})//without 3rrd arg it returns data before update and with 3rd arg it returns data after update
            return update;

        }catch(exception){
            throw exception;
        }
    }

    brandDelete=async(id)=>{
        try{
            const branddelete=await brandmodel.deleteOne({_id:id});//or findbyidanddelete(id)
            if(!branddelete){
                throw({status:404,message:"Brand Not found"})
            }
            
            return branddelete;
        }catch(exception){

            throw exception;
        }
    }
}
module.exports=new brandservice()