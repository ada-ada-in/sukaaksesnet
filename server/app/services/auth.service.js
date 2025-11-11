import { AuthRepository } from "../repositories/auth.repository.js";

export class AuthService {
    constructor() {
        this.authRepository = new AuthRepository();
    }
    async getUserByEmail(email) {
        return await this.authRepository.findByEmail(email);
    }   
    async getUserById(id) {
        return await this.authRepository.findById(id);
    }
}