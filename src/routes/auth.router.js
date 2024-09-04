import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { HTTP_STATUS } from '../constants/http-status.constant.js';
import { MESSAGES } from '../constants/message.constant.js';
import { signUpValidator } from '../middlewares/validators/sign-up-validator.middleware.js';
import { logInValidator } from '../middlewares/validators/login-validator.middleware.js';
import { prisma } from '../utils/prisma.util.js';
import { ACCESS_TOKEN_EXPIRES_IN, HASH_SALT_ROUNDS } from '../constants/auth.constant.js';
import { ACCESS_TOKEN_SECRET } from '../constants/env.constant.js';

const authRouter = express.Router();

/**
 * @swagger
 * /auth/sign-up:
 *   post:
 *     summary: 회원가입
 *     description: 새로운 유저를 회원가입시킵니다.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: 유저네임
 *               password:
 *                 type: string
 *                 description: 비밀번호
 *               nickname:
 *                 type: string
 *                 description: 닉네임
 *     responses:
 *       201:
 *         description: 회원가입 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 username:
 *                   type: string
 *                   description: 유저네임
 *                 nickname:
 *                   type: string
 *                   description: 닉네임
 *                 authorities:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       authorityName:
 *                         type: string
 *                         description: 유저 권한
 *       409:
 *         description: 유저네임 또는 닉네임이 중복됨
 *       500:
 *         description: 서버 에러
 */
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

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: 로그인
 *     description: 유저가 로그인할 수 있는 API
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: 유저네임
 *               password:
 *                 type: string
 *                 description: 비밀번호
 *     responses:
 *       200:
 *         description: 로그인 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: object
 *                   properties:
 *                     accessToken:
 *                       type: string
 *                       description: JWT 액세스 토큰
 *       401:
 *         description: 유효하지 않은 자격 증명 (비밀번호가 맞지 않거나 유저가 존재하지 않음)
 *       500:
 *         description: 서버 에러
 */
// 로그인 api
authRouter.post('/login', logInValidator, async (req, res, next) => {
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