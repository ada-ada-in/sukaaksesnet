import axios from "axios";
import crypto from "crypto";
import { ENV } from "../../configs/env.js";
import { logger } from "../../configs/logger.js";
import {payMent} from    "../../utils/payment.js"
import { PaymentRepository } from "../repositories/payment.repository.js";
import { createSendWaToUsers, successPaymentSendWa, sendWaToAdmin} from "../../utils/sendwa.js";
import jwt from "jsonwebtoken";


export class PaymentServices {
    constructor() {
        if (!ENV.duitku.merchantCode || !ENV.duitku.apiKey) {
            throw new Error("Duitku environment variables missing");
        }
        this.paymentrepository = new PaymentRepository()
    }
    
    async postPaymentServices(amount, product, customerName, email, handphone, id_users) {
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
                merchantOrderId, 
                amount,
                product
            }
            const jwtPayment = payMent(paymentPayload)

            // createSendWaToUsers(handphone,merchantOrderId,customerName,product,amount,payment_url)
            return await this.paymentrepository.createPayment({customerName, handphone, amount, email, merchantOrderId, payment_url, product, id_users, jwtPayment})

        } catch (error) {
            logger.error(`DUITKU CREATE INVOICE ERROR: ${error.message}`);
            throw error;
        }
    }
    

    async callbackPaymentServices(merchantOrderId, resultCode) {
            try {

                const trx = await this.paymentrepository.findByMerchantOrderId(merchantOrderId)
                if (!trx) return { success: false };
                const token = trx.jwtPayment
                if (!token) {
                logger.error("❌ No jwtPayment stored for this trx");
                return { success: false };
                }
                let decoded;
                try {
                decoded = jwt.verify(token, ENV.jwt.payment);
                } catch (err) {
                logger.error("❌ INVALID INTERNAL JWT");
                return { success: false };
                }
                if(decoded.merchantOrderId !== merchantOrderId) {
                          logger.error("❌ merchantOrderId mismatch", decoded.merchantOrderId, merchantOrderId);
                    return {success: false}
                } 
                if (resultCode === "00") {
                    successPaymentSendWa(trx.handphone, trx.merchantOrderId, trx.customerName, trx.email, trx.productDetails, trx.amount,trx.paymentUrl);
                    sendWaToAdmin(trx.customerName, trx.email, trx.handphone, trx.merchantOrderId, trx.product, trx.amount, trx.paymentUrl);

                    return { success: true };
                }

                return { success: false };

            } catch (err) {
                logger.error(`CALLBACK ERROR: ${err.message}`);
                return { success: false };
            }
        }
}
