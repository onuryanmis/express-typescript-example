import {
    Authorized,
    Body,
    CookieParams,
    CurrentUser,
    Get,
    InternalServerError,
    JsonController,
    Post,
    Req,
    Res
} from 'routing-controllers';
import Logger from '../library/LoggerLibrary';
import {SuccessResponse} from '../response/SuccessResponse';
import {User} from '../entity/User';
import {UserRepository} from '../repository/UserRepository';
import {JwtConfig} from '../config/JwtConfig';
import {LoginRequest} from '../request/LoginRequest';
import {AuthService} from '../service/AuthService';
import {JwtService} from '../service/JwtService';
import {ErrorResponse} from '../response/ErrorResponse';
import {ErrorCodeEnum} from '../enum/ErrorCodeEnum';
import {JwtHelper} from '../helper/JwtHelper';
import {JwtEnum} from '../enum/JwtEnum';
import RedisClient from '../library/RedisClient';
import {ResponseInterface} from '../interfaces/ResponseInterface';

@JsonController('/auth')
export class AuthController {
    @Post('/register')
    public async register(@Body() user: User): Promise<ResponseInterface> {
        try {
            await UserRepository.save(user)
            return new SuccessResponse('User successfully added.');
        } catch (err) {
            Logger.error('[AUTH][REGISTER][ERROR]', err);
            throw new InternalServerError('Operation failed')
        }
    }

    @Post('/login')
    public async login(
        @Body() loginRequest: LoginRequest,
        @Req() request: any,
        @Res() response: any
    ): Promise<ResponseInterface> {
        try {
            const {email, password} = loginRequest;
            const user = await UserRepository.findOneBy({email});

            if (!user || !(await AuthService.comparePasswords(password, user.password))) {
                response.status(400)
                return new ErrorResponse(
                    ErrorCodeEnum.AUTH_USER_NOT_FOUND,
                    'Invalid email or password'
                );
            }

            const {accessToken, refreshToken} = await JwtService.signTokens(user);

            response.cookie('access_token', accessToken, JwtConfig.getAccessTokenCookieOptions());
            response.cookie('refresh_token', refreshToken, JwtConfig.getRefreshTokenCookieOptions());

            return new SuccessResponse('Login successful', {token: accessToken});
        } catch (err) {
            Logger.error('[AUTH][LOGIN][ERROR]', err);
            throw new InternalServerError('Operation failed')
        }
    }

    @Get('/refresh')
    public async refresh(
        @Res() response: any,
        @CookieParams() cookies: any
    ): Promise<ResponseInterface> {
        try {
            const message = 'Could not refresh access token';

            const refreshToken = cookies.refresh_token;
            if (!refreshToken) {
                Logger.info('[AUTH][REFRESH TOKEN][NOT FOUND][INFO]', refreshToken);
                response.status(403)
                return new ErrorResponse(ErrorCodeEnum.AUTH_USER_NOT_FOUND, message);
            }

            const decoded = JwtHelper.verifyJwt<{ sub: string }>(refreshToken, JwtEnum.REFRESH_TOKEN_PUBLIC_KEY);
            if (!decoded) {
                Logger.info('[AUTH][REFRESH TOKEN][DECODE ERROR][INFO]', refreshToken);
                response.status(403)
                return new ErrorResponse(ErrorCodeEnum.AUTH_USER_NOT_FOUND, message);
            }

            const session = await RedisClient.get('user_' + decoded.sub);
            if (!session) {
                Logger.info('[AUTH][REFRESH TOKEN][REDIS NOT FOUND][INFO]', refreshToken);
                response.status(403)
                return new ErrorResponse(ErrorCodeEnum.AUTH_USER_NOT_FOUND, message);
            }

            const user = await UserRepository.findOneBy({id: JSON.parse(session).id});
            if (!user) {
                Logger.info('[AUTH][REFRESH TOKEN][USER NOT FOUND][INFO]', refreshToken);
                response.status(403)
                return new ErrorResponse(ErrorCodeEnum.AUTH_USER_NOT_FOUND, message);
            }

            const accessToken = JwtHelper.signJwt({sub: user.id}, JwtEnum.ACCESS_TOKEN_PRIVATE_KEY, {
                expiresIn: `${JwtConfig.getKey(JwtEnum.ACCESS_TOKEN_EXPIRES_IN)}m`,
            });

            response.cookie('access_token', accessToken, JwtConfig.getAccessTokenCookieOptions());

            return new SuccessResponse('Successful', {token: accessToken});
        } catch (err) {
            Logger.error('[AUTH][REFRESH TOKEN][ERROR]', err);
            throw new InternalServerError('Operation failed')
        }
    }

    @Authorized()
    @Get('/logout')
    public async logout(
        @CurrentUser() user: User,
        @Res() response: any,
        @CookieParams() cookies: any
    ): Promise<ResponseInterface> {
        try {
            await RedisClient.del('user_' + user.id);

            response.cookie('access_token', '', {maxAge: -1});
            response.cookie('refresh_token', '', {maxAge: -1});

            return new SuccessResponse('Logout is successful');
        } catch (err) {
            Logger.error('[AUTH][LOGOUT][ERROR]', err);
            throw new InternalServerError('Operation failed')
        }
    }
}