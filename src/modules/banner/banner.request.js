const Joi = require("joi");

const bannercreateDTO=Joi.object({
title:Joi.string().min(2).max(100).required(),
image:Joi.string().required(),
link:Joi.string().uri().optional().default(null),
status:Joi.string().regex(/^(active||inactive)$/).required(),
startDate:Joi.date().required(),
endDate:Joi.date().required()
})

const bannerupdateDTO=Joi.object({
    title:Joi.string().min(2).max(100).required(),
    link:Joi.string().uri().optional().default(null),
    status:Joi.string().regex(/^(active||inactive)$/).required(),
    image:Joi.string().optional(),
    startDate:Joi.date().required(),
    endDate:Joi.date().required()
    })
module.exports={bannercreateDTO,bannerupdateDTO};