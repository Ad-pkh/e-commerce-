const haspermission=(accessedBy)=>{
    return(req,res,next)=> {
        try{
            const user=req.authUser;
            if(!user){
                throw{status:401,message:"Please Login.."}
            }

            if((typeof accessedBy==="string" && accessedBy===user.role)||(Array.isArray(accessedBy))&& accessedBy.includes(user.role)){
                next();
            }else{
                throw{status:403,message:"Permission Denied "}
            }
        }catch(exception){
            next(exception)
        }

    }
}


module.exports=haspermission;