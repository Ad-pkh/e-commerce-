const bcrypt=require("bcryptjs")
require("../config/db.config")
const Usermodel = require("../modules/user/user.module")
const { userrole, statustype } = require("../config/constant.config")

const adminUsers=[
    {
        name:"Practice Admin 2",
        email:"admin2@admin.com",
        password:bcrypt.hashSync("Admin1#",10),
        role:userrole.ADMIN,
        status:statustype.ACTIVE,
    }
]
const seedUser=()=>{
try{
    
    adminUsers.map(async(user)=>{
        const Userexisting= await Usermodel.findOne({
            email:user.email
        })
        if(!Userexisting){
            const createobj=new Usermodel(user)
            await createobj.save()
            console.log("User seeded successfully..");
        }
        
        process.exit(1)
    })
    
}catch(exception){
    console.log(exception);
}

}
seedUser()