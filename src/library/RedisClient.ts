import { createClient } from 'redis';
import Logger from './LoggerLibrary';

const RedisClient = createClient({
    url: process.env.REDIS_URL,
});

async function connect(): Promise<void>{
    try {
        await RedisClient.connect();
        Logger.info('[REDIS][CONNECT][SUCCESS]');
    } catch (err) {
        Logger.error('[REDIS][CONNECT][ERROR]', err);
    }
}

void connect();

export default RedisClient;