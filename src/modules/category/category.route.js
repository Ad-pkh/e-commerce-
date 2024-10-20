const router=require("express").Router()
const logincheck=require("../auth/auth.middleware")
const haspermission=require("../../middlewares/rbac.middleware")
const {setpath, uploadFile}=require("../../middlewares/uploader.middleware")
const datavalidator=require("../../middlewares/validator.middleware")
const { filefiltertype } = require("../../config/constant.config")
const { categorycreateDTO, categoryupdateDTO } = require("./category.request")
const categoryController = require("./category.controller")

router.route("/")
    .post(logincheck,haspermission("admin"),setpath("category"),uploadFile().single(filefiltertype.IMAGE),datavalidator(categorycreateDTO),categoryController.create)
    .get(logincheck,haspermission("admin"),categoryController.details)
   

router.route("/:id")
        .get(logincheck,haspermission("admin"),categoryController.show)
        .patch(logincheck,haspermission("admin"),setpath("category"),uploadFile().single(filefiltertype.IMAGE),datavalidator(categoryupdateDTO),categoryController.update)
        
 router.route("/:id/:public_id")
        .delete(logincheck,haspermission('admin'),categoryController.delete)

module.exports=router;