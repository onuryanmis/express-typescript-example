import {DataSource} from 'typeorm'
import dotenv from 'dotenv';
import {cwd, env} from 'process';
import {Category} from '../entity/Category';
import {Content} from '../entity/Content';
import {User} from '../entity/User';

dotenv.config();

const AppDataSource = new DataSource({
    type: 'mysql',
    host: env.MYSQL_HOST,
    port: parseInt(env.MYSQL_PORT + ''),
    username: env.MYSQL_USERNAME,
    password: env.MYSQL_PASSWORD,
    database: env.MYSQL_DATABASE,
    entities: [Category, Content, User],
    migrations: [cwd() + '/dist/migration/*.js'],
    subscribers: [cwd() + '/dist/subscriber/*.js'],
    migrationsTableName: 'migrations',
    synchronize: true,
})

export default AppDataSource;