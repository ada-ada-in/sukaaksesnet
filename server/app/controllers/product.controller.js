import { ProductService } from "../services/product.service.js";
import  ResponseHandler  from "../../utils/response.js";

export class ProductController {
  constructor() {
    this.productService = new ProductService();
  }
    getAllProducts = async (req, res, next) => {
    const result = await this.productService.getAllProducts();
    return new ResponseHandler(res).success200(result);
  }
    getProductById = async (req, res, next) => {
    const { id } = req.params;
    const result = await this.productService.getProductById(id);
    return new ResponseHandler(res).success200(result);
  }
}