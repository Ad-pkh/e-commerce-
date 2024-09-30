const bcrypt = require("bcryptjs");
const { statustype } = require("../../config/constant.config");
const usersvc = require("../user/user.service");
const jwt = require("jsonwebtoken");

class AuthController {
  activateUser = async (req, res, next) => {
    try {
      // const params=req.params.token//either this way
      const { token } = req.params; //or this way to take token from url

      if (token.length !== 100) {
        throw { status: 422, message: "Invaild  Token " };
      }
      //send token to validate the user from db
      const user = await usersvc.getSingleUserbyFilter({
        activationToken: token,
      });

      const today = Date.now();
      const tokentime = user.activateFor.getTime();
      if (today > tokentime) {
        throw { status: 422, message: "token expired!!" };
      }

      user.activationToken = null;
      user.activateFor = null;
      user.status = statustype.ACTIVE;
      user.save();

      res.json({
        result: null,
        message:
          " your account has been activated successfully. Please login to continue..",
        meta: null,
      });
    } catch (exception) {
      next(exception);
    }
  };

  resendActivationToken = async (req, res, next) => {
    try {
      const { token } = req.params;
      let user = await usersvc.getSingleUserbyFilter({
        activationToken: token,
      });
      user = usersvc.generateUseractivationToken(user); //user updated with new token
      await user.save(); //update on db

      await usersvc.sendactivationemail({
        name: user.name,
        email: user.email,
        activationToken: user.activationToken,
        sub: "Re-Send,Activate your account.",
      });
      res.json({
        result: null,
        message:
          "A new activation token is sent to your email .Please activate your account  ",
        meta: null,
      });
    } catch (exception) {
      console.log(exception);
      next(exception);
    }
  };
  userLogin = async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const user = await usersvc.getSingleUserbyFilter({
        email: email,
      });
      if (bcrypt.compareSync(password, user.password)) {
        if (user.status === statustype.ACTIVE) {

          //to assign jwttoken//.sign(payload,secret,time)
          const token = jwt.sign(
            {
              //always send payload of jwt irrevalent to user
              sub: user._id,
            },
            process.env.JWT_SECRET
            // {
            //     expiresIn:"1 day",//default is 3hr
            //     algorithm://can be changed
            // }
          );
            const refreshToken=jwt.sign(
                {
                  sub: user._id,
                  type:"refresh"//added to distinguish from login token  
                },
                process.env.JWT_SECRET,
                {
                   expiresIn:"1 day"
                }
              )
              
          res.json({
            result: {
              userdetails: {
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
              },
              token: token, //login jwt token and  is always bearer
              refreshToken:refreshToken
              
            },
            message:"User logged in successfully",
            meta:null
          });

        } else {
          throw {
            status: 400,
            result: null,
            message: "Your account hasnot been activated yet...",
          };
        }
      } else {
        throw { status: 400, result: null, message: "Credentials not match.." };
      }
    } catch (exception) {
      next(exception);
    }
  }
  getloggedinuser=(req,res,next)=>{
    try{
        
       res.json({
        result:req.authUser,
        message:"Your Profile",
        meta:null
        
       })
      console.log("profile fetched successfully of loggedin user")
    }catch(exception){
      
        next (exception)
    }
  }

  getRefreshToken=async(req,res,next)=>{
    try{
      //same as logincheck
      let token=req.headers['authorization']||null
      if(!token){
          throw{status:401,message:"!!!!Token required!!!!"}
      }else{
          
          token=token.split(" ").pop()//taking token from bearertoken

          const {sub,type}=jwt.verify(token,process.env.JWT_SECRET)//verify jwt
          
          console.log({type});
          if(!type || type===!'refresh'){
            console.log("hello");
            
            throw{status:401,message:"Refresh token required.."}
          }
 
           await usersvc.getSingleUserbyFilter({//checking availability of user in realtime from db
              _id:sub
          })
          const accesstoken = jwt.sign(
            {
              sub:sub,
            },process.env.JWT_SECRET    
          );
            
          const refreshToken=jwt.sign(
            {
              sub:sub,//sub= id of db
              type:"refresh"//added to distinguish from login token  
            },
            process.env.JWT_SECRET,
            {
               expiresIn:"1 day"
            }
          )
          res.json({
            result:{
              Refreshed_token:accesstoken,
              //refreshToken:refreshToken
            },
            message:"token refreshed",
            meta:null
          })
      }
    }catch(exception){
      next(exception)
    }
  }
}

const authcontroller = new AuthController();
module.exports = authcontroller;
