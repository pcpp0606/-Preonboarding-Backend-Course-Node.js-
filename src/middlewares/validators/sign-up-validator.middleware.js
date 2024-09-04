import Joi from 'joi';
import { MESSAGES } from '../../constants/message.constant.js';
import { MIN_PASSWORD_LENGTH } from '../../constants/auth.constant.js';

const schema = Joi.object({
    username: Joi.string().required().messages({
        'any.required': MESSAGES.AUTH.COMMON.USERNAME.REQUIRED,
    }),
    password: Joi.string().required().min(MIN_PASSWORD_LENGTH).messages({
        'any.required': MESSAGES.AUTH.COMMON.PASSWORD.REQUIRED,
        'string.min': MESSAGES.AUTH.COMMON.PASSWORD.MIN_LENGTH,
    }),
    nickname: Joi.string().required().messages({
        'any.required': MESSAGES.AUTH.COMMON.NICKNAME.REQUIRED,
    })
});

export const signUpValidator = async (req, res, next) => {
    try {
        await schema.validateAsync(req.body);
        next();
    } catch (error) {
        next(error);
    }
}