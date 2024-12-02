import {transporter} from '../config/mail';
import {logger} from '../utils/logger';
import {getUsersWithExpiredPasswords} from './user.service';

/**
 * Checks for users with expired passwords and sends them a notification email.
 *
 * This function retrieves users whose passwords have expired and sends an email
 * notification to each of them using the configured email transporter. It logs
 * the process of checking for expired passwords and sending notifications.
 *
 * @async
 * @function
 * @returns {Promise<void>} A promise that resolves when the notifications have been sent.
 */
export const checkPasswordExpiryAndNotify = async () => {
    logger.info('Checking expired passwords...');
    const expiredUsers = await getUsersWithExpiredPasswords();

    for (const user of expiredUsers) {
        await transporter.sendMail({
            from: '"Password Expiry Bot" <no-reply@example.com>',
            to: user.email,
            subject: 'Password Expiry Notification',
            text: 'Your password has expired. Please reset it.',
        });
        logger.info(`Notification sent to ${user.email}`);
    }
};
