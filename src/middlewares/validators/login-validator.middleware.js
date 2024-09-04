import Joi from 'joi';
import { MESSAGES } from '../../constants/message.constant.js';

const schema = Joi.object({
    username: Joi.string().required().messages({
        'any.required': MESSAGES.AUTH.COMMON.USERNAME.REQUIRED,
    }),
    password: Joi.string().required().messages({
        'any.required': MESSAGES.AUTH.COMMON.PASSWORD.REQUIRED,
    }),
});

export const logInValidator = async (req, res, next) => {
    try {
        await schema.validateAsync(req.body);
        next();
    } catch (error) {
        next(error);
    }
}