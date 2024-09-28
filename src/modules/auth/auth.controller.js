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
}

const authcontroller=new AuthController()
module.exports=authcontroller