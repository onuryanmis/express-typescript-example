import {DataSource} from "typeorm"
import dotenv from "dotenv";
import { cwd, env } from 'process';

dotenv.config();

const AppDataSource = new DataSource({
    type: "mysql",
    host: env.MYSQL_HOST,
    port: parseInt(env.MYSQL_PORT+""),
    username: env.MYSQL_USERNAME,
    password: env.MYSQL_PASSWORD,
    database: "express_typescript_database",
    entities: [cwd() + '/src/entity/*.ts'],
    migrations: [cwd() + '/src/migration/*.ts'],
    migrationsTableName: 'migrations',
    logging: true,
    synchronize: true,
})

export default AppDataSource;