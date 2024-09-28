//for reusable code
require('dotenv').config()
const mailsvc = require("../../services/mail.service");
const bcrypt = require("bcryptjs");
const { randomstring, filedelete } = require("../../utilities/helper");
const Usermodel=require('./user.module')

class userService {
  generateUseractivationToken=(data)=>{//token and time is updated when called
    data.activationToken = randomstring(100);
    data.activateFor = new Date(Date.now() + process.env.TOKEN_ACTIVATE_TIME * 60 * 60 * 1000); // in milisec
    return data;
  }

  transformUserCreate = (req) => {
    //data required for usercreation
    let data = req.body;

    if (req.file) {
      data.image = req.file.filename; //for single file we use file
    }

    //for array of file
    // if(req.files){
    //     data.image=req.files.map((img)=>img.filename)
    // }

    data.password = bcrypt.hashSync(data.password, 10);
    //delete data.confirmpassword;

    data=this.generateUseractivationToken(data)//generate token 
    data.status = "inactive";
    return data;
  };

  sendactivationemail = async ({email,name,activationToken,sub="Activate your account"}) => {
    try {
     return await mailsvc.sendmail({
        //sending args
        to: email,
        sub: sub,
        message: `Dear ${name},
              <p>Thank you for signing up with us. To activate your account, please click the link below:</p>
              </td>
          </tr>
          <tr>
              <td>
                  <a href="${process.env.FRONTEND_URL + "activate/" + activationToken}">Activate Your Account</a>
               </td>
          </tr>
          <tr>
              <td>
                  <p><strong>Note:</strong> This activation link will expire in 4 hours. Please make sure to activate your account before the token expires.</p>
              </td>
          </tr>
          <tr>
              <td>
                  <p>If you did not create an account with us, please ignore this email.</p>
                  <p>For any assistance, feel free to contact our support team at 
                  <b>${process.env.SMTP_FROM}</b>.</p>
              </td>
          </tr>
          <tr>
              
          </tr>
      </table>
  
  `,
      });
    } catch (exception) {
      console.log("exception arise in userservice");
      throw exception;
    }
  };

  registerUser=async(data)=>{
    try{
      
     const user= new Usermodel(data);
     return await user.save()//predefined function
     
    }catch(exception){
      // console.log(exception);
      //deleteimage
      console.log("error while registering user in DB.");      
      if(data.image){
      filedelete("./public/uploads/user"+data.image);
      }
      
      throw exception;
    }
  }

getSingleUserbyFilter=async(filter)=>{//to compare token in database
  try{
    const userdetails=await Usermodel.findOne(filter);
    if(userdetails){
      return userdetails;
    }else{
      throw({status:404,message:"User doesnot exist."})
    }

  }catch(exception){
    throw exception;
  }

}

}

const usersvc = new userService();
module.exports = usersvc;
