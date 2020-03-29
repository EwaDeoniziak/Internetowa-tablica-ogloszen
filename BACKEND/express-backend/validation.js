const Joi = require('Joi');


//REGISTER VALIDATION

const registerValidation = (data) => {
    const schema = {
        firstName: Joi.string().min(3).required(),
        lastName: Joi.string().min(3).required(),
        login: Joi.string().min(6).required().email(),
        password: Joi.string().min(5).required(),
        phoneNumber: Joi.string().regex(/^[0-9]{9}$/).required()
    };
    return Joi.validate(data, schema);
};

const loginValidation = (data) => {
    const schema = {
        login: Joi.string().min(6).required().email(),
        password: Joi.string().min(5).required()
    };
    return Joi.validate(data, schema);
};

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;



