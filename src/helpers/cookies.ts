import { Response } from "express";
import cookieOptions from "../config/cookies.config";

const ACCESS_COOKIE_NAME = "access_token";

export function setAccessTokenCookie(response: Response, token: string) {
    response.cookie(ACCESS_COOKIE_NAME, token, cookieOptions.cookieOptions);
};

export function clearAccessTokenCookie(res: Response) {
    res.clearCookie(ACCESS_COOKIE_NAME, cookieOptions.cookieOptions);
};