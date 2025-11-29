import PaymentModels from "../models/payment.models.js";

export class PaymentRepository {
  constructor() {
    this.model = PaymentModels;
  }
  async createPayment(data) {
    return await this.model.create(data);
  }
  async findByMerchantOrderId(merchantOrderId) {
    return await this.model.findOne({
      where: { merchantOrderId },
    });
  }

  async getAllPayments() {
    return await this.model.findAll();
  }

  async getPaymentById(id) {
    return await this.model.findByPk(id);
  }

  async getPaymentByUser(id_users) {
    return await this.model.findAll({
      where: { id_users },
    });
  }

  async deletePayment(id) {
    return await this.model.destroy({
      where: { id },
    });
  }

  async updatePayment(id, data) {
    return await this.model.update(data, {
      where: { id },
    });
  }
}
