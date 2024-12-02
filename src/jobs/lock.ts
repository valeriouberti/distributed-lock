import {getRedisClient} from '../config/redis';
import {logger} from '../utils/logger';

interface Lock {
    release: () => Promise<void>;
}

/**
 * Acquire a Redis-based lock.
 * @param key - The key for the lock.
 * @param ttl - Time-to-live for the lock in milliseconds.
 * @returns A lock object with a release method, or throws an error if lock acquisition fails.
 */
export const acquireLock = async (key: string, ttl: number): Promise<Lock> => {
    const redisClient = getRedisClient();
    const lockValue = `${Date.now()}-${Math.random()}`; // Unique lock value for safety

    const isLocked = await redisClient.set(key, lockValue, {
        NX: true, // Only set if the key does not exist
        PX: ttl, // Set expiry time in milliseconds
    });

    if (!isLocked) {
        throw new Error('Lock acquisition failed');
    }

    logger.info(`Lock acquired for key: ${key}`);

    return {
        /**
         * Release the lock.
         */
        release: async () => {
            const currentValue = await redisClient.get(key);
            if (currentValue === lockValue) {
                // Only delete the lock if the value matches to prevent accidental deletions
                await redisClient.del(key);
                logger.info(`Lock released for key: ${key}`);
            } else {
                logger.warn(
                    `Lock release skipped: Lock ownership mismatch for key: ${key}`,
                );
            }
        },
    };
};
