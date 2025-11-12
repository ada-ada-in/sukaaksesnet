import ResponseHandler from "../../utils/response.js";
import { AuthService } from "../services/auth.service.js";
import { asyncHandler } from "../../middleware/asyncHandler.middleware.js";
import { jwtSign, refreshTokenSign } from "../../middleware/auth.middleware.js";
import { validatePassword } from "../../middleware/validate.middleware.js";

export class AuthController {
    constructor() {
        this.authService = new AuthService();
    }

    login = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;
    const user = await this.authService.getUserByEmail(email);

    if (!user) {
        return new ResponseHandler(res).error400("Invalid email");
    }
    const isPasswordValid = await validatePassword(password, user.password);
    if (!isPasswordValid) {
        return new ResponseHandler(res).error400("Invalid password");
    }  
    const token = jwtSign({ id: user.id, email: user.email }, process.env.JWT_EXPIRES_IN);
    const refreshToken = refreshTokenSign({ id: user.id, email: user.email }, process.env.JWT_REFRESH_EXPIRES_IN);
    new ResponseHandler(res).cookieSuccess200({ refreshToken });

    return new ResponseHandler(res).successLogin(user, token);
    })
    
    

    register = asyncHandler(async (req, res, next) => {
        const { nomor_pelanggan, nama, alamat, email, password } = req.body;
        if(!nomor_pelanggan || !alamat || !email || !password || !nama) {
            return new ResponseHandler(res).error400("Missing required fields: nomor_pelanggan, alamat, email, password, nama");
        }
        const existingUser = await this.authService.getUserByEmail(email);
        if (existingUser) {
            return new ResponseHandler(res).error400("Email already in use");
        }
        const newUser = await this.authService.registerUser({ email, password, nomor_pelanggan, nama, alamat });
        return new ResponseHandler(res).success201(newUser);
    });

    logout = asyncHandler(async (req, res, next) => {
        new ResponseHandler(res).cookieClear();
        return new ResponseHandler(res).successLogout("Logged out successfully");
    });

    forgetPassword = asyncHandler(async (req, res, next) => {
        // Implementation for forget password
    });

    resetPassword = asyncHandler(async (req, res, next) => {
        // Implementation for reset password
    });

} 