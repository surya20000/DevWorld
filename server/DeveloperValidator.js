const Joi = require('joi');
const passwordComplexity = require('joi-password-complexity')
const validator = (schema) => (payload) =>
    schema.validate(payload, { abortEarly: false });
const complexityOptions = {
    min: 5,
    max: 250,
    lowerCase: 1,
    upperCase: 1,
    numeric: 1,
    symbol: 1,
    requirementCount: 2,
};

const developerSignupSchema = Joi.object({
    name: Joi.string().min(3).required(),
    email: Joi.string().email().required(),
    password: passwordComplexity(complexityOptions).required(), 
    projectname: Joi.string().min(7).required()
});

exports.ValidateDeveloper = validator(developerSignupSchema);
