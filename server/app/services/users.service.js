import { UserRepository } from "../repositories/users.repository.js";

export class UsersService {
  constructor() {
    this.userRepository = new UserRepository();
  }

    async getAllUsers({page, limit}) {  
    return await this.userRepository.findAll({limit, page});
    }

    async getUserByEmail(email) {
    return await this.userRepository.findByEmail(email);
    }

    async createUser(data) {
    return await this.userRepository.create(data);
    }

    async getUserById(id) {
    return await this.userRepository.getById(id);
    }

    async updateUser(id, data) {
    return await this.userRepository.updateById(id, data);
    }

    async deleteUser(id) {
    return await this.userRepository.deleteById(id);
    }

    async updateUserPassword(id, newPassword) {
        return await this.userRepository.updatePassword(id, newPassword);
    }
}