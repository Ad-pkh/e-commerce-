const router=require("express").Router()
const logincheck=require("../auth/auth.middleware")
const haspermission=require("../../middlewares/rbac.middleware")
const {setpath, uploadFile}=require("../../middlewares/uploader.middleware")
const datavalidator=require("../../middlewares/validator.middleware")
const { filefiltertype } = require("../../config/constant.config")
const { bannercreateDTO, bannerupdateDTO } = require("./banner.request")
const bannerController = require("./banner.controller")

//public route
router.get("/",bannerController.homepagebanner)

router.route("/")
    .post(logincheck,haspermission("admin"),setpath("banner"),uploadFile().single(filefiltertype.IMAGE),datavalidator(bannercreateDTO),bannerController.create)
    .get(logincheck,haspermission("admin"),bannerController.details)
   

router.route("/:id")
        .get(logincheck,haspermission("admin"),bannerController.show)
        .patch(logincheck,haspermission("admin"),setpath("banner"),uploadFile().single(filefiltertype.IMAGE),datavalidator(bannerupdateDTO),bannerController.update)
        
 router.route("/:id/:public_id")
        .delete(logincheck,haspermission('admin'),bannerController.delete)

module.exports=router;