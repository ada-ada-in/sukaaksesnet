import { ProductRepository } from "../repositories/product.repository.js";

export class ProductService {
  constructor() {
    this.productRepository = new ProductRepository();
  }
    async getAllProducts() {
    return await this.productRepository.getAllProducts();
    }
    async getProductById(id) {
    return await this.productRepository.getProductById(id);
    }
}