import ResponseHandler from "../../utils/response.js";
import { AuthService } from "../services/auth.service.js";
import { asyncHandler } from "../../middleware/asyncHandler.middleware.js";
import { jwtSign, refreshTokenSign, generateResetToken } from "../../utils/auth.js";
import { validatePassword } from "../../middleware/validate.middleware.js";
import { sendEmail } from "../../utils/nodemailer.js";
import { ENV } from "../../configs/env.js";
import bcrypt from "bcrypt";

export class AuthController {
    constructor() {
        this.authService = new AuthService();
    }

    login = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;
    const user = await this.authService.getUserByEmail(email);
    if (!user) {
        return new ResponseHandler(res).error400("Invalid credentials");
    }
    const isPasswordValid = await validatePassword(password, user.password);
    if (!isPasswordValid) {
        return new ResponseHandler(res).error400("Invalid credentials");
    }  
    const token = jwtSign({ id: user.id, email: user.email, handphone: user.nomor_pelanggan, nama: user.nama });
    const refreshToken = refreshTokenSign({ id: user.id, email: user.email });
    return new ResponseHandler(res).successLogin(user, token, refreshToken);
    })
    
    register = asyncHandler(async (req, res, next) => {
        const { nomor_pelanggan, nama, alamat, email, password, confirm_password } = req.body;
        const existingUser = await this.authService.getUserByEmail(email);
        if (existingUser) {
            return new ResponseHandler(res).error400("Email already in use");
        }
        if(password !== confirm_password) return new ResponseHandler(res).error400("Password doesn't same")
        const newUser = await this.authService.registerUser({ email, password, nomor_pelanggan, nama, alamat });
        return new ResponseHandler(res).success201(newUser);
    });

    logout = asyncHandler(async (req, res, next) => {
        return new ResponseHandler(res).successLogout("Logged out successfully");
    });

    forgetPassword = asyncHandler(async (req, res, next) => {
        const resetToken = generateResetToken({ email: req.body.email });
        const confirmEmail = await this.authService.getUserByEmail(req.body.email)
        if(!confirmEmail) return new ResponseHandler(res).error400("Cannot find email!")
        const resetLink = `${ENV.app.front_end_url}/auth/reset-password?token=${resetToken}`;
        await sendEmail(req.body.email, resetLink);
        return new ResponseHandler(res).successReset("password reset email sent",resetLink);
    });

    resetPassword = asyncHandler(async (req, res) => {
        const { newPassword, confirm_password } = req.body;
        const { email } = req.user;
        console.log("REQ BODY:", req.body);
        if (newPassword !== confirm_password) {
            return new ResponseHandler(res)
                .error400("New Password and Confirm Password do not match");
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);
        const data = await this.authService.updateUserPassword(email, hashedPassword);
        return new ResponseHandler(res)
            .success200Custom("Password has been reset successfully", data);
    });


} 