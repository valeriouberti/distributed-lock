import {checkPasswordExpiryAndNotify} from '../services/notification.service';
import cron from 'node-cron';
import {acquireLock} from './lock';
import {logger} from '../utils/logger';

const schedule = process.env.CRON_SCHEDULE || '0 * * * *';

/**
 * Schedules a cron job to check for password expiry and notify users.
 * The job runs every second.
 *
 * The job acquires a distributed lock to ensure that only one instance
 * of the job runs at a time. If the lock cannot be acquired, the job
 * is skipped.
 *
 * @throws {Error} If there is an error acquiring the lock or running the password expiration check.
 */

export const schedulePasswordExpiryJob = () => {
    cron.schedule(schedule, async () => {
        logger.info('Password expiry cron job started...');

        const lockKey = 'lock:check-password-expiry';
        const ttl = 60 * 1000;

        try {
            const lock = await acquireLock(lockKey, ttl);

            try {
                await checkPasswordExpiryAndNotify();
            } finally {
                await lock.release();
                console.log('Lock released.');
            }
        } catch (error: any) {
            if (error.message === 'LockError') {
                logger.warn(
                    'Cron job skipped: Another instance is already running.',
                );
            } else {
                logger.error(
                    `Error running password expiration check: ${error.message}`,
                );
            }
        }
    });
};
