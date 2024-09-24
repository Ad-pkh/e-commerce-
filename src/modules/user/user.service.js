//for reusable code
require('dotenv').config()
const mailsvc = require("../../services/mail.service");
const bcrypt = require("bcryptjs");
const { randomstring } = require("../../utilities/helper");
class userService {
  transformUserCreate = (req) => {
    //data required for usercreation
    const data = req.body;

    if (req.file) {
      data.image = req.file.filename; //for single file we use file
    }

    //for array of file
    // if(req.files){
    //     data.image=req.files.map((img)=>img.filename)
    // }

    data.password = bcrypt.hashSync(data.password, 10);
    //delete data.confirmpassword;
    data.token = randomstring(100);
    data.status = "Inactive";
    data.activefor = new Date(Date.now() + 4 * 60 * 60 * 1000); //4 hrs in ms
    return data;
  };

  sendactivationemail = async ({email,name,token}) => {
    try {
     return await mailsvc.sendmail({
        //sending args
        to: email,
        sub: "test mail",
        message: `Dear ${name},
              <p>Thank you for signing up with us. To activate your account, please click the link below:</p>
              </td>
          </tr>
          <tr>
              <td>
                  <a href="${process.env.FRONTEND_URL + "activate/" + token}">Activate Your Account</a>
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
}

const usersvc = new userService();
module.exports = usersvc;
