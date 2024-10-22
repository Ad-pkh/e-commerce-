const categorymodel = require("./category.model");
const brandmodel = require("../brand/brand.model");

//todo  add/delete single brand from category

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
       // console.log(data);
        
        try{                                            //(id,{$set:data},{new:true})args
            const update=await categorymodel.findByIdAndUpdate(id,{$set: { title: data.title,status:data.status,brand:data.brand }},{new:true})//without 3rrd arg it returns data before update and with 3rd arg it returns data after update
            if (!update) {              //to do //update brand id not brand name
                throw{status:404,message:"Category not found"}
            }
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
    brandfilter=async(brand)=>{

        try{
            let brandsArray = Array.isArray(brand) ? brand : [brand]; // Ensure it's an array

            const brand_id = await brandmodel.find({ title: { $in: brandsArray } }, '_id'); // Only get IDs
            //console.log(brands);
            

              // Check if any brands are found
            if (!brand_id.length) {
                throw { status: 404, message: "Brand not found. Please register the brand first." };
            }
        
            // Return an array of brand IDs
            return brand_id.map(b => b._id); // Return an array of IDs
        
        }catch(exception){
            console.log("Error while fetching brand id");
            
            throw exception;
        }
    }
}
module.exports=new categoryservice()