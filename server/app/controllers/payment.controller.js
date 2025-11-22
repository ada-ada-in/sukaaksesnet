import ResponseHandler from "../../utils/response.js";
import { PaymentServices } from "../services/payment.service.js";
import { asyncHandler } from "../../middleware/asyncHandler.middleware.js";

export class PaymentController {

    constructor(){
        this.paymentservices = new PaymentServices()
    } 

    postPayment = asyncHandler(async(req, res, next)=> {
        const {amount, product, customerEmail, customerName, phoneNumber} = req.body
        const result = await this.paymentservices.postPaymentServices(amount,product,customerName,customerEmail, phoneNumber)
        return new ResponseHandler(res).success201(result)
    })
}