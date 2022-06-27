import {DataSource} from "typeorm"
import dotenv from "dotenv";
import { cwd, env } from 'process';
import {Category} from "../entity/Category";
import {Content} from "../entity/Content";

dotenv.config();

const AppDataSource = new DataSource({
    type: "mysql",
    host: env.MYSQL_HOST,
    port: parseInt(env.MYSQL_PORT+""),
    username: env.MYSQL_USERNAME,
    password: env.MYSQL_PASSWORD,
    database: "express_typescript_database",
    entities: [Category, Content],
    migrations: [cwd() + '/dist/migration/*.js'],
    subscribers: [cwd() + '/dist/subscriber/*.js'],
    migrationsTableName: 'migrations',
    synchronize: true,
})

export default AppDataSource;