const router=require("express").Router();
const userrouter=require("../modules/user/user.route")
const authrouter=require("../modules/auth/auth.route")
const bannerrouter=require("../modules/banner/banner.route")


router.use("/user",userrouter);
router.use("/auth",authrouter);
router.use("/banner",bannerrouter);

module.exports=router;