import jwt, {SignOptions} from 'jsonwebtoken';
import {JwtEnum} from '../enum/JwtEnum';
import {JwtConfig} from '../config/JwtConfig';

export class JwtHelper {
    public static signJwt(payload: Object, keyName: JwtEnum, options: SignOptions){
        const privateKey = Buffer.from(JwtConfig.getKey(keyName), 'base64').toString('ascii');
        return jwt.sign(payload, privateKey, {
            ...(options && options),
            algorithm: 'RS256',
        });
    };

    public static verifyJwt<T>(token: string, keyName: JwtEnum): T | null{
        try {
            const publicKey = Buffer.from(JwtConfig.getKey(keyName), 'base64').toString('ascii');
            return jwt.verify(token, publicKey) as T;
        } catch (error) {
            return null;
        }
    }
}