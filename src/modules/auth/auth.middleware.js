require("dotenv").config();
const jwt=require("jsonwebtoken");
const usersvc = require("../user/user.service");

const logincheck=async(req,res,next)=>{

    try{
        let token=req.headers['authorization']||null
        if(!token){
            throw{status:401,message:"Unauthorized Access.."}
        }else{
            //bearertoken=>{bearer jwttoken}
            token=token.split(" ").pop()//taking token fromm bearertoken

            const data=jwt.verify(token,process.env.JWT_SECRET)//verify jwt

            if(data.hasOwnProperty('type')){//denied further access for refresh token
                throw{status:403,message:"!!Access token required"}
            }
            
            const user= await usersvc.getSingleUserbyFilter({//checking availability of user in realtime from db
                _id:data.sub
            })
            req.authUser={//details of loggedin udser
                _id:user._id,
                name:user.name,
                email:user.email,
                address:user.address,
                phone:user.phone,
                role:user.role,
                status:user.status,
                image:user.image
                
                
            }
            
            next();
           
        }

    }catch(exception){
        console.log(exception);        
        next({status:401,message:exception.message})
    }
}

module.exports=logincheck;