//CRUD is performed in controller
require("dotenv").config();
 const usersvc=require("./user.service")
const mailsvc = require("../../services/mail.service");
const Usermodel = require("./user.module");

class usercontroller {
  usercreate = async (req, res, next) => {
     const data=usersvc.transformUserCreate(req)//creatinguser
     
     //insert in db
     
     const user= new Usermodel(data);
     await user.save()//predefined function
     
     const email=usersvc.sendactivationemail({email:data.email,name:data.name,token:data.token})//sending email
    res.json({
      message: "user created ",
      body: data,
      meta: null,
    });
  };

  userdetails = (req, res, next) => {
    res.json({
      testing: "any",
      result: "data fetched",
      message: `getting details of ${req.params.id}`,
      meta: null,
    });
  };

  userupdate = (req, res, next) => {
    res.json({
      message: "user updated",
      meta: null,
    });
  };

  userdelete = (req, res, next) => {
    res.json({
      message: "user deleted",
      meta: null,
    });
  };
}

const userctrl = new usercontroller();
module.exports = userctrl;
