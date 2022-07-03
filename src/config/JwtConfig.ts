import {JwtEnum} from '../enum/JwtEnum';
import {CookieOptions} from 'express';

export class JwtConfig {
    public static getKey(type: JwtEnum): string {
        return <string>process.env[type]
    }

    public static getDefaultCookieOptions(): CookieOptions {
        const cookiesOptions: CookieOptions = {httpOnly: true, sameSite: 'lax',};

        if (process.env.NODE_ENV === 'production') cookiesOptions.secure = true;

        return cookiesOptions;
    }

    public static getAccessTokenCookieOptions(): CookieOptions {
        return {
            ...this.getDefaultCookieOptions(),
            expires: new Date(
                Date.now() + parseInt(JwtConfig.getKey(JwtEnum.ACCESS_TOKEN_EXPIRES_IN)) * 60 * 1000
            ),
            maxAge: parseInt(JwtConfig.getKey(JwtEnum.ACCESS_TOKEN_EXPIRES_IN)) * 60 * 1000,
        };
    }

    public static getRefreshTokenCookieOptions(): CookieOptions {
        return {
            ...this.getDefaultCookieOptions(),
            expires: new Date(
                Date.now() + parseInt(JwtConfig.getKey(JwtEnum.REFRESH_TOKEN_EXPIRES_IN)) * 60 * 1000
            ),
            maxAge: parseInt(JwtConfig.getKey(JwtEnum.REFRESH_TOKEN_EXPIRES_IN)) * 60 * 1000,
        };
    }
}