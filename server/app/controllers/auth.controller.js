import ResponseHandler from "../../utils/response.js";
import { AuthService } from "../services/auth.service.js";
import { asyncHandler } from "../../middleware/asyncHandler.middleware.js";
import { jwtSign, refreshTokenSign, generateResetToken } from "../../utils/auth.js";
import { validatePassword } from "../../middleware/validate.middleware.js";
import { sendEmail } from "../../utils/nodemailer.js";
import { ENV } from "../../configs/env.js";

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
    const token = jwtSign({ id: user.id, email: user.email });
    const refreshToken = refreshTokenSign({ id: user.id, email: user.email });
    return new ResponseHandler(res).successLogin(user, token, refreshToken);
    })
    
    register = asyncHandler(async (req, res, next) => {
        const { nomor_pelanggan, nama, alamat, email, password } = req.body;
        const existingUser = await this.authService.getUserByEmail(email);
        if (existingUser) {
            return new ResponseHandler(res).error400("Email already in use");
        }
        const newUser = await this.authService.registerUser({ email, password, nomor_pelanggan, nama, alamat });
        return new ResponseHandler(res).success201(newUser);
    });

    logout = asyncHandler(async (req, res, next) => {
        return new ResponseHandler(res).successLogout("Logged out successfully");
    });

    forgetPassword = asyncHandler(async (req, res, next) => {
        const resetToken = generateResetToken({ email: req.body.email });
        const resetLink = `${ENV.app.front_end_url}/reset-password?token=${resetToken}`;
        await sendEmail(req.body.email, resetLink);
        return new ResponseHandler(res).successReset("password reset email sent",resetLink);
    });

    resetPassword = asyncHandler(async (req, res, next) => {
        const { newPassword } = req.body;
        console.log(req.user.email)
        const data = await this.authService.updateUserPassword(req.user.email, newPassword);
        return new ResponseHandler(res).success200Custom("Password has been reset successfully", data);
    });

} 