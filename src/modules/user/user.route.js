const router=require('express').Router();
const { filefiltertype } = require('../../config/constant.config');
const logincheck = require('../../middlewares/auth.middleware');
const haspermission = require('../../middlewares/rbac.middleware');
const { setpath, uploadFile } = require('../../middlewares/uploader.middleware');
const datavalidator = require('../../middlewares/validator.middleware');
const userctrl = require('./user.controller');
const { usercreateDTO } = require('./user.request');




router.route("/")
                              //setpath("folder name")//uploadfile("filetype")
.post(logincheck,haspermission,setpath('user'),uploadFile().single(filefiltertype.IMAGE),datavalidator(usercreateDTO),userctrl.usercreate)



router.route("/:id")

.get(userctrl.userdetails)
.put(userctrl.userupdate)
.delete(userctrl.userdelete)

module.exports=router;