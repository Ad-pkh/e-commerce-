const { filedelete } = require("../utilities/helper");

const datavalidator=(schema)=>{
    return async(req,res,next)=>{
      try{
        const data=req.body

        if(req.file){
            data[req.file.fieldname]=req.file.filename;//dynamic keyname of file(i.e image ,photo)
        }
        if(req.files){
            //later 
        }
        //validate("k validate garne",abortEarly)//schema is name used to obtain value when" passing with reference"
        await schema.validateAsync(data,{abortEarly: false})
        next();

      }catch(exception){

        //delete file when e
            if(req.file){
                console.log(req.file)
                filedelete(req.file.path)
            }

          //console.log(exception);//400 is validation error
            let detail={};
                                //error is normal variable,canbe used any thing
            exception.details.map((error)=>{
                console.log(error);
                
                detail[error['path'][0]]=error.message;//dynamic key 
            })
        next({status:400,details:detail,message:"input error.."})

      }
    }
    
}

module.exports=datavalidator;