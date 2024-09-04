import 'dotenv/config';

export const SERVER_PORT = process.env.SERVER_PORT;
export const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
export const ACCESS_TOKEN_EXPIRES_IN = process.env.ACCESS_TOKEN_EXPIRES_IN;
export const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;
export const REFRESH_TOKEN_EXPIRES_IN = process.env.REFRESH_TOKEN_EXPIRES_IN;
export const HASH_SALT_ROUNDS = process.env.HASH_SALT_ROUNDS;
export const MIN_PASSWORD_LENGTH = process.env.MIN_PASSWORD_LENGTH;