const Joi = require('joi')
const validation = (schema) => (payload) =>
    schema.validate(payload, {abortEarly: false})

const MediaInsertionSchema = Joi.object({
    email: Joi.string().email().required(),
    projectName: Joi.string().min(5).required(),
    projectDescription: Joi.string().min(7).required(),
    deployedLink: Joi.string().uri().required(),
    videos: Joi.array().required()
})

exports.mediaValidator = validation(MediaInsertionSchema)