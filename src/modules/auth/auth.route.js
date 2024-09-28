const { filefiltertype } = require('../../config/constant.config')
const { setpath, uploadFile } = require('../../middlewares/uploader.middleware')
const datavalidator = require('../../middlewares/validator.middleware')
const userctrl = require('../user/user.controller')
const { usercreateDTO } = require('../user/user.request')
const authcontroller = require('./auth.controller')

const authrouter=require('express').Router()


authrouter.post("/register",setpath('user'),uploadFile().single(filefiltertype.IMAGE),datavalidator(usercreateDTO),userctrl.usercreate)
authrouter.get("/activate/:token",authcontroller.activateUser)
authrouter.get("/resend-activationtoken/:token",authcontroller.resendActivationToken)

module.exports=authrouter