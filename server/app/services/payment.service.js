import axios from "axios";
import crypto from "crypto";
import { ENV } from "../../configs/env.js";
import { logger } from "../../configs/logger.js";
import {payMent} from    "../../utils/payment.js"
import { PaymentRepository } from "../repositories/payment.repository.js";
import { createSendWaToUsers, successPaymentSendWa, sendWaToAdmin} from "../../utils/sendwa.js";

export class PaymentServices {
    constructor() {
        if (!ENV.duitku.merchantCode || !ENV.duitku.apiKey) {
            throw new Error("Duitku environment variables missing");
        }
        this.paymentrepository = new PaymentRepository()
    }
    
    async postPaymentServices(amount, product, customerName, email, handphone) {
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
            const merchantOrderId = `SAN-${Date.now()}-${Math.floor(Math.random() * 100000)}`;
            const payload = {
                merchantCode,
                merchantOrderId,
                paymentAmount: amount,
                productDetails: product,
                customerDetail: {
                    firstName: customerName,
                    email,
                    phoneNumber: handphone
                },
                callbackUrl,
                signature,
                returnUrl
            };
            const response = await axios.post(postUrl, payload, {
                headers: {
                    "Content-Type": "application/json",
                    "x-duitku-timestamp": timestamp,
                    "x-duitku-signature": signature,
                    "x-duitku-merchantcode": merchantCode
                },
                timeout: 10000
            });           
            const payment_url = response.data.paymentUrl
            const paymentPayload = {
                merchantCodeId: merchantOrderId,
            }
            payMent(paymentPayload)

            createSendWaToUsers(handphone,merchantOrderId,customerName,product,amount,payment_url)
            return await this.paymentrepository.createPayment({customerName, handphone, amount, email, merchantOrderId, payment_url, product})

        } catch (error) {
            logger.error(`DUITKU CREATE INVOICE ERROR: ${error.message}`);
            throw error;
        }
    }
    

    async callbackPaymentServices(merchantCodeId) {
            try {

                if (resultCode === "00") {
                    successPaymentSendWa(handphone, merchantOrderId, customerName, email, productDetails, amount, reference);
                    sendWaToAdmin(customerName, email, handphone, merchantOrderId, productDetails, amount, reference);

                    console.log("cihuyyy")

                    return { success: true };
                }

                return { success: false };

            } catch (err) {
                logger.error(`CALLBACK ERROR: ${err.message}`);
                return { success: false };
            }
        }
}
