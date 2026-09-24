import { Joi, celebrate } from 'celebrate';
import validator from 'validator';

const validateURL = (value, helpers) => {
    if (validator.isURL(value)) {
        return value;
    }
    return helpers.error('string.uri');
};

const validateHexId = (value, helpers) => {
    if (validator.isHexadecimal(value) && value.length === 24) {
        return value;
    }
    return helpers.error('string.hex');
};

export const validateCardBody = celebrate({
    body: Joi.object().keys({
        name: Joi.string().required().min(2).max(30).messages({
            "string.min": 'The minimum length of the "name field is 2',
            "string.max": 'The maximum length of the "name" field is 30',
            "string.empty": 'The "name" field must be filled in',
        }),
        imageUrl: Joi.string().required().custom(validateURL).messages({
            "string.empty": 'The "imageUrl" field must be filled in',
            "string.uri": 'The "imageUrl" field must be a valid url',
        }),
        weather: Joi.string().required().valid('hot', 'warm', 'cold').messages({
            "string.empty": 'The "weather" field must be filled in',
            "any.only": 'The "weather" field must be hot, warm, or cold',
        }),
    }),
});

export const validateUserBody = celebrate({
    body: Joi.object().keys({
        name: Joi.string().min(2).max(30).messages({
            "string.min": 'The minimum length of the "name" field is 2',
            "string.max": 'The maximum length of the "name" field is 30',
        }),
        avatar: Joi.string().required().custom(validateURL).messages({
            "string.empty": 'The "avatar" field must be filled in',
            "string.uri": 'The "avatar" field must be a valid url',
        }),
        email: Joi.string().required().email().messages({
        "string.empty": 'The "email" field must be filled in',
        "string.email": 'The "email" field must be a valid email format',
        }),
        password: Joi.string().required().messages({
        "string.empty": 'The "password" field must be filled in',
        }),
    }),
});

export const validateLogin = celebrate({
    body: Joi.object().keys({
       email: Joi.string().required().email().messages({
        "string.empty": 'The "email" field must be filled in',
        "string.email": 'The "email" field must be a valid email format',
    }),
    password: Joi.string().required().messages({
        "string.empty": 'The "password" field must be filled in',
    }), 
    }),
});

export const validateId = celebrate({
    params: Joi.object().keys({
        itemId: Joi.string().custom(validateHexId).messages({
            "string.hex": 'The id string is in an invalid format',
        }),
        userId: Joi.string().custom(validateHexId).messages({
            "string.hex": 'The id string is in an invalid format',
        }),
    }),
});

export const validateUserUpdate = celebrate({
    body: Joi.object().keys({
        name: Joi.string().min(2).max(30).required().messages({
            "string.min": 'The minimum length of the "name" field is 2',
            "string.max": 'The maximum length of the "name" field is 30',
            "string.empty": 'The "password" field must be filled in',
    }),
        avatar: Joi.string().required().custom(validateURL).messages({
            "string.empty": 'The "avatar" field must be filled in',
            "string.uri": 'The "avatar" field must be a valid url',
        }),
    }),
});