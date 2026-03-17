import jwt, { SignOptions } from "jsonwebtoken";

export function createToken(payload: any, secret: string, expire?: any) {
    const options: SignOptions = {};

    if (expire) {
        options.expiresIn = expire;
    }

    return jwt.sign(
        { data: payload },
        secret,
        options);
};