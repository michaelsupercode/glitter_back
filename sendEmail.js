const nodemailer = require("nodemailer")
const dotenv = require("dotenv")
dotenv.config()

var transporter = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: "2525",
    auth: {
        user: process.env.USER,
        pass: process.env.PASS
    }
});

function sendEmail(options) {
    return new Promise((resolve, reject) => {
        const to = options.to
        const subject = options.subject
        const message = options.message

        const messageHtml = options.html || message.replaceAll("\n", "<br/>")

        transporter.sendMail({
            from: '<glitter@teams.com>',
  to: 'tsvjesingen@web.de',
  subject: 'Mr. Watson -- come here',
  text: 'I need to see you',
            text: message,
            html: messageHtml,
        }).then((sentMessageInfo) => {
            const wasSentSuccesssFully =
                sentMessageInfo.accepted.includes(to)

            if(wasSentSuccesssFully) {
                resolve()
            } else {
                reject()
            }
        }).catch((err) => {
            console.log("Error sending that fuckin`email", err)
            reject()
        })
    })
}

module.exports = { sendEmail }