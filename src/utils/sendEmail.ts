import nodemailer from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";


// async..await is not allowed in global scope, must use a wrapper
export async function sendEmail(to: string, from: string, subject: string, text?: string, html?: string) {
    try {

        if (!text && !html) {
            throw "html or text version of email is required";
        }

        // Generate test SMTP service account from ethereal.email
        // Only needed if you don't have a real mail account for testing
        let testAccount = await nodemailer.createTestAccount();
        console.log(testAccount);

        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
            host: String(process.env.SMTP_HOST),
            port: process.env.SMTP_PORT,
            secure: false,
            auth: {
                user: testAccount.user,
                pass: testAccount.pass,
            },
        } as SMTPTransport.Options);

        // send mail with defined transport object
        let info = await transporter.sendMail({
            from,
            to,
            subject,
            text,
            html
        });

        console.log("Message sent: %s", info.messageId);
        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
        // Preview only available when sending through an Ethereal account
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...

        return true;

    } catch (error) {
        console.log(error)
        return false;
    }
}

// main().catch(console.error);