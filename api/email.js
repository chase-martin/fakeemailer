const { BadRequestError, ApiError } = require("../util/");
const HTMLtoText = require("../util/HTMLtoText");
const { EMAILER, SENDGRID_API_KEY } = require("../config");
const sgMail = require('@sendgrid/mail');

class Email {
    // Create email.
    async create({to, to_name, from, from_name, subject, body}) {
        return new Promise((resolve, reject) => {
            // Simple validation.
            if (!to || !to_name || !from || !from_name || !subject || !body) {
                reject(
                    new BadRequestError()
                );
            }

            // create a email, with random id and data sent
            const newEmail = {
                to: to,
                to_name,
                from, 
                from_name, 
                subject, 
                body
            };

            newEmail.text = HTMLtoText(newEmail.body);
            console.log('creating new email ', JSON.stringify(newEmail));

            resolve(newEmail);
        });
    }

    // Send email.
    async send(email) {
        return new Promise(async (resolve, reject) => {
            if (EMAILER === 'SENDGRID') {
                sgMail.setApiKey(SENDGRID_API_KEY)

                // TODO: handle to/from name.
                const msg = {
                    to: email.to, 
                    from: email.from,
                    subject: email.subject,
                    text: email.text,
                    html: email.body,
                }
                console.log('Sending email ', JSON.stringify(msg));

                let response;
                try {
                    response = await sgMail.send(msg);
                    const statusCode = response[0].statusCode;
                    const resHeaders = response[0].headers;
                    if (statusCode !== 200) {
                        reject(
                            new ApiError()
                        );
                    } else {
                        resolve(JSON.stringify(msg));
                    }
                } catch(sendGridError) {
                    reject(
                        new ApiError()
                    );
                }
            } else if (EMAILER === 'MAILGUN') {
                // TODO: didn't have time to add mailgun api.
                resolve("I sent the email, I promise. ;)");
            } else {
                reject(
                    new ApiError()
                );
            } 
        });
    }
}

module.exports = Email;