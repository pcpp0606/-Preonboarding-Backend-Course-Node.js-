import { MIN_PASSWORD_LENGTH } from "./auth.constant.js";

export const MESSAGES = {
    AUTH: {
        COMMON: {
            USERNAME: {
                REQUIRED: '유저네임을 입력해 주세요.',
                DUPLICATED: '이미 가입된 유저입니다.'
            },
            PASSWORD: {
                REQUIRED: '비밀번호를 입력해 주세요.',
                MIN_LENGTH: `비밀번호는 ${MIN_PASSWORD_LENGTH}자리 이상이어야 합니다.`
            },
            NICKNAME: {
                REQUIRED: '닉네임을 입력해 주세요.',
                DUPLICATED: '이미 가입된 유저입니다.'
            },
            UNAUTHORIZED: '인증 정보가 유효하지 않습니다.',
            JWT: {
                NO_TOKEN: '인증 정보가 없습니다.',
                NOT_SUPPORTED_TYPE: '지원하지 않는 인증 방식입니다.',
                EXPIRED: '인증 정보가 만료되었습니다.',
                NO_USER: '인증 정보와 일치하는 사용자가 없습니다.',
                INVALID: '인증 정보가 유효하지 않습니다.'
            }
        },
        SIGN_UP: {
            SUCCEED: '회원가입에 성공했습니다.',
        },
        LOGIN: {
            SUCCEED: '로그인에 성공했습니다.',
            NO_USER: '해당 유저가 존재하지 않습니다.'
        },
    },
    USERS: {
        READ_ME: {
            SUCCEED: '내 정보 조회에 성공했습니다.'
        }
    },
}