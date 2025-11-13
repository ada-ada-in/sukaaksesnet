import UsersModels from '../models/users.model.js';

export class AuthRepository {
    constructor() {
        this.model = UsersModels;
    }
    async findByEmail(email) {
        return await this.model.findOne({ where: { email } });
    }

    async createUser(userData) {
        return await this.model.create(userData);
    }
    async updatePassword(email, newPassword) {
        return await this.model.update(
            { password: newPassword },
            { where: { email } }
        );
    }   
}