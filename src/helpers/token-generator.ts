import { SignOptions, sign } from "jsonwebtoken";

export function createToken(payload: any, secret: string, expire?: any) {
    const options: SignOptions = {};

    if (expire)
        options.expiresIn = expire;

    return sign(
        { data: payload }, secret, options
    );
};