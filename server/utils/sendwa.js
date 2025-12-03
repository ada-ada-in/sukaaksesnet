import axios from "axios";
import { logger } from "../configs/logger.js";
import { ENV } from "../configs/env.js";

export const sendWa = async (phone, message) => {
    try {
        const url = `${ENV.wablas.apihost}api/send-message?device_id=${ENV.wablas.deviceId}`;

        console.log("FINAL URL:", url);

        const payload = {
            phone: phone,
            message: message
        };

        const response = await axios.post(url, payload, {
            headers: {
                Authorization: ENV.wablas.token,
                "x-secret-key": ENV.wablas.secretkey,
                "Content-Type": "application/json"
            }
        });

        console.log("WA SENT:", response.data);
        return response.data;

    } catch (error) {
        console.log("WABLAS ERROR RAW:", error.response?.data || error.message);
        logger.error(`send Wa Error: ${error.message}`);
        throw error;
    }
};


export const createSendWaToUsers = async (phoneNumber,merchantOrderId,customerName,product,amount,paymentUrl) => {
    let waNumber = phoneNumber.replace(/[^0-9]/g, '');
    if (waNumber.startsWith("0")) waNumber = "62" + waNumber.slice(1);
    if (!waNumber.startsWith("62")) waNumber = "62" + waNumber;
    await sendWa(waNumber, `
Pelanggan yang Terhormat,

Nomor Pembayaran : ${merchantOrderId}
Nama : ${customerName}
Paket : ${product}
Tagihan : Rp ${Number(amount).toLocaleString("id-ID")}

Silakan lakukan pembayaran menggunakan link berikut:
👉 ${paymentUrl}

Terima kasih.
SUKA AKSES NET
            `);
}

export const successPaymentSendWa = async (phoneNumber,merchantOrderId,customerName,email,productDetails,amount,payment_url) => {
    await sendWa(phoneNumber, `
Pembayaran BERHASIL!

Nomor Pembayaran : ${merchantOrderId}
Nama : ${customerName}
Email : ${email}
Paket : ${productDetails}
Jumlah : Rp ${Number(amount).toLocaleString("id-ID")}

Bukti pembayaran dapat dilihat dengan Link:
👉 ${payment_url}

Terima kasih.
SUKA AKSES NET
                `);
}

export const sendWaToAdmin = async (customerName,email,phoneNumber,merchantOrderId,productDetails,amount,payment_url) => {
                    await sendWa(ENV.wablas.adminPhone, `
USER TELAH MELAKUKAN PEMBAYARAN!

Nama : ${customerName}
Email : ${email}
HP : ${phoneNumber}
Invoice : ${merchantOrderId}
Paket : ${productDetails}
Jumlah : Rp ${Number(amount).toLocaleString("id-ID")}

Link: ${payment_url}
                `);

                return { success: true };
}