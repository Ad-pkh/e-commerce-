const router=require("express").Router();
const userrouter=require("../modules/user/user.route")
const authrouter=require("../modules/auth/auth.route")



router.use("/user",userrouter);
router.use("/auth",authrouter);

module.exports=router;