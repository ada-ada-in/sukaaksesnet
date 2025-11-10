import { UsersService } from "../services/users.service.js";
import ResponseHandler from "../../utils/response.js";

export class UserController {
  constructor() {
    this.usersService = new UsersService();
  }
    async getAllUsers(req, res) {  
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const users = await this.usersService.getAllUsers({page, limit});
        if(users.length === 0){
            return new ResponseHandler(res).success200("No users found");
        }
        if(!users){
            const message = "Failed to retrieve users";
            return new ResponseHandler(res).error400(message);
        }
        return new ResponseHandler(res).success200(users);
    } catch (error) {
        return new ResponseHandler(res).error500(error.message);}
 }

    async createUser(req, res) {
    try {
        const { nomor_pelanggan, nama, alamat, email, password } = req.body;
        if (!nomor_pelanggan || !alamat || !email || !password || !nama) {
            return new ResponseHandler(res).error400("Missing required fields: nomor_pelanggan, alamat, email, password, nama");
        }
        const newUser = await this.usersService.createUser({
            nomor_pelanggan,
            nama,
            alamat,
            email,
            password,
        });
        return new ResponseHandler(res).success201(newUser);
    } catch (error) {
        return new ResponseHandler(res).error500(error.message);}
    }
    
    async getUserById(req, res) {
    try {
        const { id } = req.params;
        const user = await this.usersService.getUserById(id);
        if (!user) {
            return new ResponseHandler(res).error404();
        }
        return new ResponseHandler(res).success200(user);
    } catch (error) {
        return new ResponseHandler(res).error500(error.message);
    }
}

    async deleteUser(req, res) {
    try {
        const { id } = req.params;
        const deleted = await this.usersService.deleteUser(id);
        if (!deleted) {
            const message = `User with id ${id} not found`;
            return new ResponseHandler(res).error404(message);
        }
        return new ResponseHandler(res).success200(`User with id ${id} deleted successfully`);
    } catch (error) {
        return new ResponseHandler(res).error500(error.message);
    }
}

    async updateUser(req, res) {
    try {
        const { id } = req.params;
        const { nomor_pelanggan, nama, alamat, email, password } = req.body;
        const updatedUser = await this.usersService.updateUser(id, {
            nomor_pelanggan,
            nama,
            alamat,
            email,
            password,
        });
        if (!updatedUser) {
            const message = `User with id ${id} not found or no changes made`;
            return new ResponseHandler(res).error404(message);
        }   
        return new ResponseHandler(res).success200(updatedUser);
    } catch (error) {
        return new ResponseHandler(res).error500(error.message);
    }
}

}