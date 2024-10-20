const router=require("express").Router();
const userrouter=require("../modules/user/user.route")
const authrouter=require("../modules/auth/auth.route")
const bannerrouter=require("../modules/banner/banner.route")
const brandrouter=require("../modules/brand/brand.route")
const categoryrouter=require("../modules/category/category.route")



router.use("/user",userrouter);
router.use("/auth",authrouter);
router.use("/banner",bannerrouter);
router.use("/brand",brandrouter);
router.use("/category",categoryrouter);


module.exports=router;