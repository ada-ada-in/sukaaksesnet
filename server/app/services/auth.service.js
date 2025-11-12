import { AuthRepository } from "../repositories/auth.repository.js";

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
}