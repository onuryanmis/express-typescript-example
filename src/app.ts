import 'reflect-metadata';
import dotenv from 'dotenv';
import {createExpressServer} from 'routing-controllers';
import path from 'path';
import MorganLibrary from "./library/MorganLibrary";

dotenv.config();

const port = process.env.PORT;

const app = createExpressServer({
    defaultErrorHandler: false,
    controllers: [path.join(__dirname + '/controller/*.js')],
    middlewares: [path.join(__dirname, '/middleware/*.js')],
});

app.use(MorganLibrary)

app.listen(port, () => console.log('Server is running at port '+port))