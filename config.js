// TODO: Don't hardcode api keys.
const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY || "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";
const MAILGUN_API_KEY = process.env.MAILGUN || "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";

const EMAILER = 'SENDGRID';

module.exports = {
    SENDGRID_API_KEY,
    MAILGUN_API_KEY,
    EMAILER
};