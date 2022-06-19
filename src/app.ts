import 'reflect-metadata';
import dotenv from 'dotenv';
import {createExpressServer} from 'routing-controllers';
import path from 'path';

dotenv.config();

const port = process.env.PORT;

const app = createExpressServer({
    controllers: [path.join(__dirname + '/controller/*.js')]
});

app.listen(port, () => console.log('Server is running at port '+port))