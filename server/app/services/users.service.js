import { UserRepository } from "../repositories/users.repository.js";

export class UsersService {
  constructor() {
    this.userRepository = new UserRepository();
  }

    async getAllUsers() {  
    return await this.userRepository.findAll();
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
}