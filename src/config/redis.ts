import {createClient, RedisClientType} from 'redis';
import {logger} from '../utils/logger';

let redisClient: RedisClientType | null = null;

/**
 * Connect to Redis and initialize the client.
 * Ensures the client is a singleton.
 */
export const connectRedis = async (): Promise<RedisClientType> => {
    if (!redisClient) {
        redisClient = createClient({
            url: process.env.REDIS_URL || 'redis://localhost:6379',
        });
        await redisClient.connect();
        logger.info('Connected to Redis');
    }
    return redisClient;
};

/**
 * Get the initialized Redis client.
 * Throws an error if the client is not initialized.
 */
export const getRedisClient = (): RedisClientType => {
    if (!redisClient) {
        throw new Error(
            'Redis client not initialized. Call connectRedis first.',
        );
    }
    return redisClient;
};
