const router=require("express").Router()
const logincheck=require("../auth/auth.middleware")
const haspermission=require("../../middlewares/rbac.middleware")
const {setpath, uploadFile}=require("../../middlewares/uploader.middleware")
const datavalidator=require("../../middlewares/validator.middleware")
const { filefiltertype } = require("../../config/constant.config")
const { brandcreateDTO, brandupdateDTO } = require("./brand.request")
const brandController = require("./brand.controller")

router.route("/")
    .post(logincheck,haspermission("admin"),setpath("brand"),uploadFile().single(filefiltertype.IMAGE),datavalidator(brandcreateDTO),brandController.create)
    .get(logincheck,haspermission("admin"),brandController.details)
   

router.route("/:id")
        .get(logincheck,haspermission("admin"),brandController.show)
        .patch(logincheck,haspermission("admin"),setpath("brand"),uploadFile().single(filefiltertype.IMAGE),datavalidator(brandupdateDTO),brandController.update)
        
 router.route("/:id/:public_id")
        .delete(logincheck,haspermission('admin'),brandController.delete)

module.exports=router;