import ResponseHandler from "../../utils/response.js";
import { PaymentServices } from "../services/payment.service.js";
import { asyncHandler } from "../../middleware/asyncHandler.middleware.js";

export class PaymentController {

    constructor(){
        this.paymentservices = new PaymentServices()
    } 

    postPayment = asyncHandler(async(req, res, next)=> {
        const {amount, product, email, customerName, handphone, id_users, resultCode} = req.body
        const result = await this.paymentservices.postPaymentServices(amount, product, customerName, email, handphone, id_users, resultCode)
        return new ResponseHandler(res).success201(result)
    })

    callbackPayment = asyncHandler(async(req, res, next) => {
    const callbackData = req.body;
    const { merchantOrderId, resultCode, amount, signature } = callbackData;   
    const responseHash = await this.paymentservices.callbackPaymentServices(merchantOrderId, resultCode, amount, signature)
      console.log("🔥 CALLBACK HIT!", new Date().toISOString());
  console.log("Headers:", req.headers);
  console.log("Body:", req.body);
    return res.send(responseHash)
    })
}