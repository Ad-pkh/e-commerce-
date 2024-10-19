const Joi = require("joi");

const brandcreateDTO=Joi.object({
title:Joi.string().min(2).max(100).required(),
image:Joi.string().required(),
status:Joi.string().regex(/^(active||inactive)$/).required()
})

const brandupdateDTO=Joi.object({
    title:Joi.string().min(2).max(100).required(),
    status:Joi.string().regex(/^(active||inactive)$/).required(),
    image:Joi.string().optional()
    })
    
module.exports={brandcreateDTO,brandupdateDTO};