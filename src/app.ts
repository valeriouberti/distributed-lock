/* eslint-disable @typescript-eslint/no-floating-promises */
import Fastify from 'fastify';
import {logger, loggerConfig} from './utils/logger';
import {connectRedis} from './config/redis';
import {schedulePasswordExpiryJob} from './jobs/password-expired.job';

const app = Fastify({
    logger: loggerConfig,
});

app.get('/health-check', async (request, reply) => {
    return 'OK';
});

const start = async () => {
    try {
        logger.info('Connecting to Redis...');
        await connectRedis();
        schedulePasswordExpiryJob();
        await app.listen({port: 3000});
    } catch (err) {
        logger.error(err);
        throw err;
    }
};

if (require.main === module) {
    start();
}

export {app};
