import 'reflect-metadata';
import dotenv from 'dotenv';
import {createExpressServer} from 'routing-controllers';
import path from 'path';
import MorganLibrary from "./library/MorganLibrary";
import AppDataSource from "./config/AppDataSource";
import {DbConnectionErrorException} from "./exception/DbConnectionErrorException";

dotenv.config();

const port = process.env.PORT;

AppDataSource.initialize().then(() => {
    console.log("Data Source has been initialized!")
}).catch((err) => {
    throw new DbConnectionErrorException('Database connection error : ' + err.message);
})

const app = createExpressServer({
    defaultErrorHandler: false,
    controllers: [path.join(__dirname + '/controller/*.js')],
    middlewares: [path.join(__dirname, '/middleware/*.js')],
});

app.use(MorganLibrary)

app.listen(port, () => console.log('Server is running at port ' + port))