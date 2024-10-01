const Joi = require("joi");

const bannercreateDTO=Joi.object({
tittle:Joi.string().min(2).max(100).required(),
link:Joi.string().uri().optional().default(null),
status:Joi.string().regex(/^(active||inactive)$/).required()
})

module.exports={bannercreateDTO};