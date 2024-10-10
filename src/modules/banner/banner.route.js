const router=require("express").Router()
const logincheck=require("../auth/auth.middleware")
const haspermission=require("../../middlewares/rbac.middleware")
const {setpath, uploadFile}=require("../../middlewares/uploader.middleware")
const datavalidator=require("../../middlewares/validator.middleware")
const { filefiltertype } = require("../../config/constant.config")
const { bannercreateDTO } = require("./banner.request")
const bannerController = require("./banner.controller")

router.route("/")
    .post(logincheck,haspermission("admin"),setpath("banner"),uploadFile().single(filefiltertype.IMAGE),datavalidator(bannercreateDTO),bannerController.create)
    .get()
    .put()
    .delete()

    module.exports=router;