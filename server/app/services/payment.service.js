import axios from "axios";
import crypto from "crypto";
import { ENV } from "../../configs/env.js";
import { logger } from "../../configs/logger.js";
import { payMent } from "../../utils/payment.js";
import { PaymentRepository } from "../repositories/payment.repository.js";
import { createSendWaToUsers } from "../../utils/sendwa.js";

export class PaymentServices {
  constructor() {
    if (!ENV.duitku.merchantCode || !ENV.duitku.apiKey) {
      throw new Error("Duitku environment variables missing");
    }
    this.paymentrepository = new PaymentRepository();
  }

  async postPaymentServices({ amount, product, nama, email, handphone, id_users }) {
    try {
      const merchantCode = ENV.duitku.merchantCode;
      const apiKey = ENV.duitku.apiKey;
      const callbackUrl = ENV.duitku.callbackUrl;
      const returnUrl = ENV.duitku.returnUrl || "";
      const postUrl = ENV.duitku.postPaymentUrl;

      const timestamp = Date.now().toString();
      const signature = crypto
        .createHash("sha256")
        .update(merchantCode + timestamp + apiKey)
        .digest("hex");

      const merchantOrderId = `INV-${Date.now()}-${Math.floor(Math.random() * 100000)}`;

      const payload = {
        merchantCode,
        merchantOrderId,
        paymentAmount: amount,
        productDetails: product,
        customerDetail: {
          firstName: nama,
          email,
          phoneNumber: handphone,
        },
        callbackUrl,
        signature,
        returnUrl,
      };

      const response = await axios.post(postUrl, payload, {
        headers: {
          "Content-Type": "application/json",
          "x-duitku-timestamp": timestamp,
          "x-duitku-signature": signature,
          "x-duitku-merchantcode": merchantCode,
        },
        timeout: 10000,
      });

      const payment_url = response.data.paymentUrl;
      const paymentPayload = { merchantOrderId, amount, product };
      const jwtPayment = payMent(paymentPayload);

      createSendWaToUsers(handphone, merchantOrderId, nama, product, amount, payment_url);

      return await this.paymentrepository.createPayment({
        customerName: nama,
        handphone,
        amount,
        email,
        merchantOrderId,
        payment_url,
        product,
        id_users,
        jwtPayment,
      });

    } catch (err) {
      logger.error(`DUITKU CREATE INVOICE ERROR: ${err.message}`);
      return { success: false };
    }
  }

  //getAllPayment
  async getAllPaymentServices() {
    return await this.paymentrepository.getAllPayment();
  }

  //getPaymentByUser
  async getPaymentByUserServices(id_users) {
    return await this.paymentrepository.getPaymentByUser(id_users);
  }

  //deletePayment
  async deletePaymentServices(id) {
    const deleted = await this.paymentrepository.getPaymentById(id);
    if (!deleted) throw new Error("Payment not found");
    return { deleted: true };
  }

  //updatePayment
  async updatePaymentServices(id, data) {
    await this.paymentrepository.updatePayment(id, data);
    return { updated: true };
  }
}
