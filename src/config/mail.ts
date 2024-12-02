import nodemailer from 'nodemailer';

/**
 * Creates a Nodemailer transporter object using Gmail service.
 * The transporter is configured with authentication details
 * provided through environment variables.
 *
 * @constant {Object} transporter - The Nodemailer transporter object.
 * @property {string} service - The email service to use (Gmail).
 * @property {Object} auth - The authentication details.
 * @property {string} auth.user - The email address to use for authentication.
 * @property {string} auth.pass - The password for the email address.
 */
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
    },
});

export {transporter};
