import { AuthRepository } from "../repositories/auth.repository.js";
import bcrypt from "bcrypt";

export class AuthService {
    constructor() {
        this.authRepository = new AuthRepository();
    }
    async getUserByEmail(email) {
        return await this.authRepository.findByEmail(email);
    }   
    async registerUser(userData) {
        return await this.authRepository.createUser(userData);
    }
    async updateUserPassword(email, newPassword) {
        const salt = await bcrypt.genSalt(10);
        newPassword = await bcrypt.hash(newPassword, salt);
        return await this.authRepository.updatePassword(email, newPassword);
    }
}