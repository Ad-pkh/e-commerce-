const Joi = require("joi");

const categorycreateDTO=Joi.object({
title:Joi.string().min(2).max(100).trim().required(),
image:Joi.string().required(),
status:Joi.string().regex(/^(active|inactive)$/).required()
})

const categoryupdateDTO=Joi.object({
    title:Joi.string().min(2).max(100).trim().required(),
    status:Joi.string().regex(/^(active|inactive)$/).required(),
    image:Joi.string().optional()
    })
    
module.exports={categorycreateDTO,categoryupdateDTO};