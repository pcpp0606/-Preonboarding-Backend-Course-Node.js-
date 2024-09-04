import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { HTTP_STATUS } from '../constants/http-status.constant.js';
import { MESSAGES } from '../constants/message.constant.js';
import { signUpValidator } from '../middlewares/validators/sign-up-validator.middleware.js';
import { prisma } from '../utils/prisma.util.js';
import { ACCESS_TOKEN_EXPIRES_IN, HASH_SALT_ROUNDS } from '../constants/auth.constant.js';
import { ACCESS_TOKEN_SECRET } from '../constants/env.constant.js';

const authRouter = express.Router();

authRouter.post('/sign-up', signUpValidator, async (req, res, next) => {
    try {
        const { username, password, nickname } = req.body;

        // 유저네임 중복 체크
        const existedUser = await prisma.user.findFirst({
            where: {
                OR: [
                    { username: username },
                    { nickname: nickname }
                ]
            }
        });

        // 유저가 이미 존재할 경우
        if (existedUser) {
            if (existedUser.username === username) {
                return res.status(HTTP_STATUS.CONFLICT).json({
                    status: HTTP_STATUS.CONFLICT,
                    message: MESSAGES.AUTH.COMMON.USERNAME.DUPLICATED,
                });
            } else if (existedUser.nickname === nickname) {
                return res.status(HTTP_STATUS.CONFLICT).json({
                    status: HTTP_STATUS.CONFLICT,
                    message: MESSAGES.AUTH.COMMON.NICKNAME.DUPLICATED,
                });
            }
        }

        const hashedPassword = bcrypt.hashSync(password, HASH_SALT_ROUNDS);

        const data = await prisma.user.create({
            data: {
                username,
                password: hashedPassword,
                nickname,
            }
        });

        // 패스워드 안 보이게끔
        data.password = undefined;

        return res.status(HTTP_STATUS.CREATED).json({
            // status: HTTP_STATUS.CREATED,
            // message: MESSAGES.AUTH.SIGN_UP.SUCCEED,
            "username": data.username,
            "nickname": data.nickname,
            "authorities": [
                {
                    "authorityName": data.role
                }
            ]
        });
    } catch (error) {
        next(error);
    }
});

// 로그인 api
authRouter.post('/login', async (req, res, next) => {
    try {
        const { username, password } = req.body;

        const user = await prisma.user.findUnique({ where: { username } });

        const isPasswordMatched = user && bcrypt.compareSync(password, user.password);

        if (!isPasswordMatched) {
            return res.status(HTTP_STATUS.UNAUTHORIZED).json({
                status: HTTP_STATUS.UNAUTHORIZED,
                message: MESSAGES.AUTH.LOGIN.UNAUTHORIZED,
            });
        }


        const payload = { id: user.id };

        const accessToken = jwt.sign(payload, ACCESS_TOKEN_SECRET, { expiresIn: ACCESS_TOKEN_EXPIRES_IN });

        return res.status(HTTP_STATUS.OK).json({
            // status: HTTP_STATUS.CREATED,
            // message: MESSAGES.AUTH.LOGIN.SUCCEED,
            "token": { accessToken },
        });
    } catch (error) {
        next(error);
    }
});

export { authRouter };