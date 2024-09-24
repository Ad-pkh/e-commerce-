const logincheck=(req,res,next)=>{
    console.log("i am in auth")
    next();
}

module.exports=logincheck;