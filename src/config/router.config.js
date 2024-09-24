const router=require("express").Router();
const userrouter=require("../modules/user/user.route")



router.use("/user",userrouter);

module.exports=router;