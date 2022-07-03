import bcrypt from 'bcryptjs';
import {Action} from 'routing-controllers';
import RedisClient from '../library/RedisClient';
import {JwtHelper} from '../helper/JwtHelper';
import {JwtEnum} from '../enum/JwtEnum';
import {UserRepository} from '../repository/UserRepository';
import cookie from 'cookie';
import {User} from '../entity/User';
import Logger from '../library/LoggerLibrary';

export class AuthService {
    public static async comparePasswords(candidatePassword: string, hashedPassword: string) {
        return await bcrypt.compare(candidatePassword, hashedPassword);
    }

    public static async authorizationChecker(action: Action, roles: string[]): Promise<boolean>{
        // TODO role checker
        return await this.currentUser(action) !== null
    }

    public static async currentUser(action: Action): Promise<User|null>{
        try {
            let accessToken;
            const request = action.request;
            const {headers} = request;
            const cookies = cookie.parse(headers.cookie)

            if (headers.authorization && headers.authorization.startsWith('Bearer')) {
                accessToken = headers.authorization.split(' ')[1];
            } else if (cookies.access_token) {
                accessToken = cookies.access_token;
            }

            if (!accessToken) {
                return null;
            }

            const decoded = JwtHelper.verifyJwt<{ sub: string }>(accessToken, JwtEnum.ACCESS_TOKEN_PUBLIC_KEY);
            if (!decoded) {
                return null;
            }

            const session = await RedisClient.get('user_'+decoded.sub);
            if (!session) {
                return null;
            }

            return await UserRepository.findOneBy({id: JSON.parse(session).id});
        } catch (err: any) {
            Logger.info('[AUTH][CURRENT USER NOT FOUND][INFO]', err);
            return null;
        }
    }
}