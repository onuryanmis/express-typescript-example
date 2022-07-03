import {User} from '../entity/User';
import RedisClient from '../library/RedisClient';
import {JwtHelper} from '../helper/JwtHelper';
import {JwtConfig} from '../config/JwtConfig';
import {JwtEnum} from '../enum/JwtEnum';

export class JwtService {
    public static async signTokens(user: User){
        await RedisClient.set('user_'+user.id, JSON.stringify(user), {
            EX: parseInt(JwtConfig.getKey(JwtEnum.REDIS_CACHE_EXPIRES_IN)),
        });

        const accessToken = JwtHelper.signJwt({ sub: user.id }, JwtEnum.ACCESS_TOKEN_PRIVATE_KEY, {
            expiresIn: `${JwtConfig.getKey(JwtEnum.ACCESS_TOKEN_EXPIRES_IN)}m`,
        });

        const refreshToken = JwtHelper.signJwt({ sub: user.id }, JwtEnum.REFRESH_TOKEN_PRIVATE_KEY, {
            expiresIn: `${JwtConfig.getKey(JwtEnum.REFRESH_TOKEN_EXPIRES_IN)}m`,
        });

        return { accessToken, refreshToken };
    };
}