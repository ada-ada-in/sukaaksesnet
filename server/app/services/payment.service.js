import axios from "axios";
import crypto from "crypto";
import { ENV } from "../../configs/env.js";
import { logger } from "../../configs/logger.js";
import { createSendWaToUsers, successPaymentSendWa, sendWaToAdmin} from "../../utils/sendwa.js";

export class PaymentServices {
    constructor() {
        if (!ENV.duitku.merchantCode || !ENV.duitku.apiKey) {
            throw new Error("Duitku environment variables missing");
        }
    }

    /**
     *  MAKE PAYMENT INVOICE
     */
    async postPaymentServices(amount, product, customerName, email, phoneNumber) {
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
                    phoneNumber
                },
                callbackUrl,
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
            const paymentUrl = response.data.paymentUrl
            createSendWaToUsers(phoneNumber,merchantOrderId,customerName,product,amount,paymentUrl)
            return response.data;

        } catch (error) {
            logger.error(`DUITKU CREATE INVOICE ERROR: ${error.message}`);
            throw error;
        }
    }

    async callbackPaymentServices(params = {}) {
        try {
            const {
                amount,
                merchantCode,
                merchantOrderId,
                signature,
                resultCode,
                productDetails,
                reference,
                phoneNumber,
                customerName,
                email
            } = params;
            const apiKey = ENV.duitku.apiKey;
            const expectedSignature = crypto
                .createHash("sha256")
                .update(amount + merchantCode + merchantOrderId + apiKey)
                .digest("hex");

            if (expectedSignature !== signature) {
                logger.error("❌ INVALID SIGNATURE CALLBACK");
                return { success: false };
            }
            if (resultCode === "002") {

            successPaymentSendWa(phoneNumber,merchantOrderId,customerName,email,productDetails,amount,reference)
            sendWaToAdmin(customerName,email,phoneNumber,merchantOrderId,productDetails,amount,reference)

            return {success: true}

            }


            return { success: false };

        } catch (err) {
            logger.error(`CALLBACK ERROR: ${err.message}`);
            return { success: false };
        }
    }
}
