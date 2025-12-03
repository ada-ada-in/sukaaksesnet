import ResponseHandler from "../../utils/response.js";
import { UsersService } from "../services/users.service.js";
import { asyncHandler } from "../../middleware/asyncHandler.middleware.js";
import bcrypt from "bcrypt";

export class UserController {
  constructor() {
    this.usersService = new UsersService();
  }
    getAllUsers = asyncHandler(async (req, res, next) => {  
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const users = await this.usersService.getAllUsers({page, limit});
        if(!users){
            const message = "Failed to retrieve users";
            return new ResponseHandler(res).error400(message);
            
        }
        if(users.length === 0){
            return new ResponseHandler(res).success200("No users found");
        }
        return new ResponseHandler(res).success200(users);
    });
    
    getUserById = asyncHandler(async (req, res, next) => {
        const { id } = req.params;
        const user = await this.usersService.getUserById(id);
        if (!user) {
            return new ResponseHandler(res).error404();
        }
        return new ResponseHandler(res).success200(user);
    });

    getUserByMe = asyncHandler(async(req, res, next) => {
        const {id} = req.user
        const user  = await this.usersService.getUserById(id)
        if(!user) return new ResponseHandler(res).error400('Cannot find Id!')
        return new ResponseHandler(res).success200(user)
    })

    getProfile = asyncHandler(async (req, res, next) => {
        const userId = req.user.id;
        const user = await this.usersService.getUserById(userId);
        if (!user) {
            return new ResponseHandler(res).error404();
        }
        return new ResponseHandler(res).success200(user);
    });

    deleteUser = asyncHandler(async (req, res, next) => {
        const { id } = req.params;
        const deleted = await this.usersService.deleteUser(id);
        if (!deleted) {
            const message = `User with id ${id} not found`;
            return new ResponseHandler(res).error404(message);
        }
        return new ResponseHandler(res).success200(`User with id ${id} deleted successfully`);
    });

    updateUser = asyncHandler(async (req, res, next) => {
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
    } );

    updateUserByToken = asyncHandler(async (req, res, next) => {
        const { id } = req.user;
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
        return new ResponseHandler(res).success200Custom("Profile updated successfully", updatedUser);
    } );

    updatePasswordUserByToken = asyncHandler(async (req, res, next) => {
        const { id } = req.user;
        const { password, confirm_password } = req.body;
        if(password !== confirm_password){
            return new ResponseHandler(res).error400("Password and Confirm Password do not match");
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const updatedUser = await this.usersService.updateUserPassword(id,
            hashedPassword
        );
        if (!updatedUser) {
            const message = `User with id ${id} not found or no changes made`;
            return new ResponseHandler(res).error404(message);
        }   
        return new ResponseHandler(res).success200Custom("Profile updated successfully", updatedUser);
    } );

}