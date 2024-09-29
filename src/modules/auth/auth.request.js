const joi=require('joi')

const loginDTO=joi.object({
    email:joi.string().email().required(),
    password:joi.string().required()
})

module.exports={
    loginDTO
}