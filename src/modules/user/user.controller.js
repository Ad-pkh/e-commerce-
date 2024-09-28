//CRUD is performed in controller
require("dotenv").config();
const usersvc = require("./user.service");
const mailsvc = require("../../services/mail.service");
const Usermodel = require("./user.module");

class usercontroller {
  usercreate = async (req, res, next) => {
    try {
      const data = usersvc.transformUserCreate(req); //creatinguser
      await usersvc.registerUser(data); //insert in db
      //console.log(data);

      const email = usersvc.sendactivationemail({
        email: data.email,
        name: data.name,
        activationToken: data.activationToken,
      }); //sending email
      
      res.json({
        message: "user created ",
        body: data,
        meta: null,
      });
    } catch (exception) {
      next(exception);
    }
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
