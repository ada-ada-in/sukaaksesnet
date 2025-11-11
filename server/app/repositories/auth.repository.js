import UsersModels from '../models/users.model.js';

export class AuthRepository {
    constructor() {
        this.model = UsersModels;
    }
    async findByEmail(email) {
        return await this.model.findOne({ where: { email } });
    }
    async findById(id) {
        return await this.model.findByPk(id);
    }
}