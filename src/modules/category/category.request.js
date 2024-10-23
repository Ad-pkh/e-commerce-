const Joi = require("joi");

const categorycreateDTO=Joi.object({
title:Joi.string().min(2).max(100).trim().required(),
image:Joi.string().required(),
status:Joi.string().regex(/^(active|inactive)$/).required(),
parent_id: Joi.string().allow(null, '').empty('').default(null).optional(),
brand: Joi.alternatives().try(
    Joi.string(),  // Single brand as string
    Joi.array().items(Joi.string())  // Multiple brands as an array of strings
).required()
})

const categoryupdateDTO=Joi.object({
    title:Joi.string().min(2).max(100).trim().required(),
    status:Joi.string().regex(/^(active|inactive)$/).required(),
    image:Joi.string().optional(),
    parent_id: Joi.string().allow(null, '').empty('').default(null).optional(),
    brand: Joi.alternatives().try(
        Joi.string(),  // Single brand as string
        Joi.array().items(Joi.string())  // Multiple brands as an array of strings
    ).optional()
    
    })
    
module.exports={categorycreateDTO,categoryupdateDTO};