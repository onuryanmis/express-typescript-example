import 'reflect-metadata';
import dotenv from 'dotenv';
import {Action, createExpressServer} from 'routing-controllers';
import path from 'path';
import MorganLibrary from './library/MorganLibrary';
import AppDataSource from './config/AppDataSource';
import {DbConnectionErrorException} from './exception/DbConnectionErrorException';
import Logger from './library/LoggerLibrary';
import {AuthService} from './service/AuthService';

dotenv.config();

const port = process.env.PORT;

AppDataSource.initialize().then(() => {
    Logger.info('[DATABASE][CONNECT][SUCCESS]');
}).catch((err) => {
    throw new DbConnectionErrorException('Database connection error : ' + err.message);
})

const app = createExpressServer({
    authorizationChecker: async (action: Action, roles: string[]) => {
        return await AuthService.authorizationChecker(action, roles)
    },
    currentUserChecker: async (action: Action) => {
        return await AuthService.currentUser(action)
    },
    defaultErrorHandler: false,
    controllers: [path.join(__dirname + '/controller/*.js')],
    middlewares: [path.join(__dirname, '/middleware/*.js')],
});

app.use(MorganLibrary)

app.listen(port, () => console.log('Server is running at port ' + port))