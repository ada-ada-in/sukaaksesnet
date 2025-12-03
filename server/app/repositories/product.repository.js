import fs from "fs";

export class ProductRepository {
  constructor() {
    const jsonData = fs.readFileSync("./server/json/packet.json", "utf-8");
    this.products = JSON.parse(jsonData);
  }

  async getAllProducts() {
    return this.products;
  }

  async getProductById(id) {
    for(let i = 0; i < this.products.length; i++) {
        if(this.products[i].id === parseInt(id)) {
            return this.products[i];
        }
      }
      return null;
    }
}
