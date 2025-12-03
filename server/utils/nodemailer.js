import nodemailer from 'nodemailer';
import { ENV } from '../configs/env.js';


const createTransporter = () => {
    return nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: ENV.nodemailer.email_user,
            pass: ENV.nodemailer.email_pass,
        },
    });
}

export const sendEmail = async (email, resetLink) => {
    await createTransporter().sendMail({
        from: ENV.nodemailer.email_user,
        to: email,
        subject: 'Password Reset Request',
        html: `<p>You requested a password reset. Click <a href="${resetLink}">here</a> to reset your password.</p>`,
    });

    return true;
}
    
