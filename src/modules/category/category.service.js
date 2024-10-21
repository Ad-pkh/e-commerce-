const categorymodel = require("./category.model");

class categoryservice{
    categorycreate=async (data)=>{
        try{
            const category=new categorymodel(data)
            return await category.save()
            
        }catch(exception){
            throw exception;
        }
    }
    listdata= async({skip=0,limit=10,filter={}})=>{
        try{
            const count=await categorymodel.countDocuments(filter);
            const data=await categorymodel.find(filter)
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
            const categoryDetail=await categorymodel.findOne(filter)
                                        .populate("createdBy",["_id","name","email","role"])
            return categoryDetail;
        }catch(exception){
            throw exception;
        }

    }

    categoryUpdate=async(id,data)=>{
        try{                                            //(id,{$set:data},{new:true})args
            const update=await categorymodel.findByIdAndUpdate(id,{$set:data},{new:true})//without 3rrd arg it returns data before update and with 3rd arg it returns data after update
            return update;

        }catch(exception){
            throw exception;
        }
    }

    categoryDelete=async(id)=>{
        try{
            const categorydelete=await categorymodel.deleteOne({_id:id});//or findbyidanddelete(id)
            if(!categorydelete){
                throw({status:404,message:"Brand Not found"})
            }
            
            return categorydelete;
        }catch(exception){

            throw exception;
        }
    }
}
module.exports=new categoryservice()