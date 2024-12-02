import pino from 'pino';

export const loggerConfig = {
    level: 'info',
    transport:
        process.env.NODE_ENV === 'localhosta'
            ? {
                  target: 'pino-pretty',
                  options: {colorize: true},
              }
            : undefined,
};

export const logger = pino(loggerConfig);
