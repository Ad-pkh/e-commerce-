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
}
module.exports=new bannerservice()