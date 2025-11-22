import axios from "axios";
import crypto from "crypto";
import { ENV } from "../../configs/env.js";
import { logger } from "../../configs/logger.js";

export class PaymentServices {
    constructor() {
        if (!ENV.duitku.merchantCode || !ENV.duitku.apiKey) {
            throw new Error("Duitku environment variables missing");
        }
    }

    async postPaymentServices(amount, product, customerName, customerEmail) {
        try {
            if (!amount || amount <= 0) throw new Error("Invalid amount");
            if (!customerEmail) throw new Error("Email required");
            const merchantCode = ENV.duitku.merchantCode;
            const apiKey = ENV.duitku.apiKey;
            const callbackUrl = ENV.duitku.callbackUrl;
            const returnUrl = ENV.duitku.returnUrl;
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
                email: customerEmail,
                customerVaName: customerName,
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
            return response.data;
        } catch (error) {
            logger.error(`DUITKU ERROR: ${error.message}`);
            throw error;
        }
    }
}
