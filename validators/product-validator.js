const Joi = require('joi')


const schema = Joi.object({
    name: Joi.string().min(2).max(100).required(),
    price: Joi.number().required(),
    description: Joi.string().min(2).max(500).required(),
    image: Joi.string().min(2).max(100).required(),
    category: Joi.string().min(2).max(100).required(),
    colors: Joi.array(),
    featured: Joi.boolean(),
    freeShipping: Joi.boolean().required(),
    inventory: Joi.number().required(),
    user: Joi.string().required(),

})


const validateProduct = (data) => {
    return schema.validate(schema)
} 


module.exports = validateProduct