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
        html: `
            <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f5f7fa; margin: 0; padding: 20px;">
                <div style="max-width: 600px; margin: 0 auto; background-color: #fff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.08);">
                    <!-- Header dengan gradient dan logo -->
                    <div style="background: linear-gradient(135deg, #764ba2 0%, #667eea 100%); padding: 30px; text-align: center;">
                        <!-- Logo Placeholder -->
                        <div style="margin-bottom: 20px;">
                            <img src="https://i.imgur.com/yeqG8vY.png" 
                                 alt="Internet Provider Logo" 
                                 style="max-width: 180px; height: auto; border-radius: 8px;">
                        </div>
                        <h1 style="color: #fff; margin: 0; font-size: 28px; font-weight: 600;">Suka Akses NET</h1>
                        <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0; font-size: 16px;">Password Reset Service</p>
                    </div>
                    
                    <!-- Konten Utama -->
                    <div style="padding: 40px 30px;">
                        <h2 style="color: #333; margin-top: 0; font-size: 22px;">Reset Your Password</h2>
                        <p style="color: #666; font-size: 16px; line-height: 1.6;">
                            We received a request to reset your password for your Internet Provider account. 
                            Click the button below to create a new password:
                        </p>
                        
                        <!-- Tombol Reset -->
                        <div style="text-align: center; margin: 35px 0;">
                            <a href="${resetLink}" style="
                                display: inline-block;
                                background: linear-gradient(135deg, #764ba2 0%, #667eea 100%);
                                color: #fff;
                                text-decoration: none;
                                padding: 16px 32px;
                                border-radius: 50px;
                                font-size: 18px;
                                font-weight: 600;
                                box-shadow: 0 4px 15px rgba(118, 75, 162, 0.3);
                                transition: all 0.3s ease;
                            ">Reset Password</a>
                        </div>
                        
                        <!-- Informasi Tambahan -->
                        <p style="color: #666; font-size: 14px; line-height: 1.6;">
                            If you didn't request this password reset, please ignore this email or 
                            <a href="#" style="color: #667eea; text-decoration: none;">contact support</a>.
                        </p>
                        
                        <p style="color: #999; font-size: 13px; margin-top: 30px;">
                            This link will expire in 24 hours for security reasons.
                        </p>
                    </div>
                    
                    <!-- Footer dengan logo kecil -->
                    <div style="background-color: #f8f9fb; padding: 25px 30px; text-align: center;">
                        <div style="margin-bottom: 15px;">
                            <img src="https://i.imgur.com/yeqG8vY.png" 
                                 alt="Internet Provider Logo" 
                                 style="max-width: 120px; height: auto; opacity: 0.8;">
                        </div>
                        <p style="color: #666; font-size: 14px; margin: 0;">
                            &copy; 2023 PT. Dohar Persada Mandiri. All rights reserved.
                        </p>
                        <div style="margin-top: 15px;">
                            <a href="#" style="color: #667eea; text-decoration: none; margin: 0 10px;">Support</a>
                            <a href="#" style="color: #667eea; text-decoration: none; margin: 0 10px;">Privacy</a>
                            <a href="#" style="color: #667eea; text-decoration: none; margin: 0 10px;">Terms</a>
                        </div>
                    </div>
                </div>
            </div>
        `,
    });

    return true;
}