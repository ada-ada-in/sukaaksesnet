import UsersModels from '../models/users.model.js';

export class UserRepository {
  constructor() {
    this.model = UsersModels;
  }
    async create(data) {
    return await this.model.create(data);
    }

    async getById(id) {
    return await this.model.findByPk(id);
    }

    async updateById(id, data) {
    const user = await this.model.findByPk(id);
    if (user) {
        return await user.update(data);
    }
    return null;
    }

    async deleteById(id) {
    const user = await this.model.findByPk(id);
    if (user) {
        await user.destroy();
        return true;
    }   
    return false;
    }

    async findAll({page = 1, limit = 10}) {
      const offset = (page - 1) * limit;
      const { rows, count } = await this.model.findAndCountAll({
          limit,
          offset,
      });
      return {
          data: rows,
          pagination: {
          totalItems: count,
          totalPages: Math.ceil(count / limit),
          currentPage: page,
          itemsPerPage: limit,
          },  
      };
    }
}
    