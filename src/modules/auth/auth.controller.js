const bcrypt=require('bcryptjs')
const { statustype } = require("../../config/constant.config")
const usersvc = require("../user/user.service")

class AuthController{
    activateUser=async (req,res,next)=>{
        try{
           // const params=req.params.token//either this way
            const{token}=req.params//or this way to take token from url

            if(token.length !==100){
                throw({status:422,message:"Invaild  Token "})
            }
                //send token to validate the user from db
               const user=await usersvc.getSingleUserbyFilter({
                    activationToken:token
                })
            

            const today=Date.now();
            const tokentime=user.activateFor.getTime();
            if(today > tokentime){
                throw{status:422,message:"token expired!!"}
            }

            user.activationToken=null
            user.activateFor=null
            user.status=statustype.ACTIVE
            user.save()

            res.json({
                result:null,
                message:" your account has been activated successfully. Please login to continue..",
                meta:null
            })
          

        }catch(exception){
            next(exception) 
        }
    }

    resendActivationToken=async(req,res,next)=>{
        try{
            const{token}=req.params;
            let user=await usersvc.getSingleUserbyFilter({
                activationToken:token
            })
            user=usersvc.generateUseractivationToken(user)//user updated with new token
            await user.save()//update on db

            await usersvc.sendactivationemail({
                name:user.name,
                email:user.email,
                activationToken:user.activationToken,
                sub:"Re-Send,Activate your account."

            })
            res.json({
                result:null,
                message:"A new activation token is sent to your email .Please activate your account  ",
               meta:null
            })

        }catch(exception){
            console.log(exception)
            next(exception)
        }

    }
    userLogin=async(req,res,next)=>{
        try{
            const{email,password}=req.body;
            const user= await usersvc.getSingleUserbyFilter({
                email:email
            })
            if(bcrypt.compareSync(password,user.password)){
                //if match
                res.json({
                    message:"credential matched"
                })
            }else{
                throw{status:400,result:null,message:"Credentials not match.."}
            }

        }catch(exception){
            next(exception);
        }
    }
}

const authcontroller=new AuthController()
module.exports=authcontroller