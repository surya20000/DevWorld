const Joi = require('joi')
const passwordComplex = require('joi-password-complexity')
const validation = (schema) => (payload) =>
    schema.validate(payload, { abortEarly: false })
const complexityOptions = {
    min: 5,
    max: 250,
    lowerCase: 1,
    upperCase: 1,
    numeric: 1,
    symbol: 1,
    requirementCount: 2,
};
const UserValidationSchema = Joi.object({
    name: Joi.string().min(3).required(),
    email: Joi.string().email().required(),
    password: passwordComplex(complexityOptions).required(),
})

exports.ValidateUser = validation(UserValidationSchema)