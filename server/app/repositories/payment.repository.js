import PaymentModels from '../models/payment.models.js';

export class PaymentRepository {
    constructor() {
        this.model = PaymentModels;
    }
    async createPayment(data) {
        return await this.model.create(data);
    }
    async findByMerchantOrderId(merchantOrderId) {
        return await this.model.findOne({
            where: { merchantOrderId }
        });
    }
  
}