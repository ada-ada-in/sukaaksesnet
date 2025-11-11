import ResponseHandler from "../../utils/response.js";
import { AuthService } from "../services/auth.service.js";
import { asyncHandler } from "../../middleware/asyncHandler.middleware.js";
import { jwtSign } from "../../middleware/auth.middleware.js";
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
    return new ResponseHandler(res).successLogin(user, token);
    })

    logout = asyncHandler(async (req, res, next) => {
        const { id } = req.params;
        const deleted = await this.authService.deleteUser(id);
        if (!deleted) {
            const message = `User with id ${id} not found`;
            return new ResponseHandler(res).error404(message);
        }
        return new ResponseHandler(res).successDelete(`User with id ${id} deleted successfully`);
    })

}