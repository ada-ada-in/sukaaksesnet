import ResponseHandler from "../../utils/response.js";
import { PaymentServices } from "../services/payment.service.js";
import { asyncHandler } from "../../middleware/asyncHandler.middleware.js";

export class PaymentController {

    constructor(){
        this.paymentservices = new PaymentServices()
    } 

    postPayment = asyncHandler(async(req, res, next)=> {
        const {amount, product, resultCode} = req.body
        const {email, nama, handphone, id} = req.user
        console.log(req.user)
        const result = await this.paymentservices.postPaymentServices({amount, product, nama, email, handphone, id_users : id, resultCode})
        return new ResponseHandler(res).success201(result)
    })

    callbackPayment = asyncHandler(async(req, res, next) => {
    const callbackData = req.body;
    const { merchantOrderId, resultCode, amount, signature } = callbackData;   
    const responseHash = await this.paymentservices.callbackPaymentServices(merchantOrderId, resultCode, amount, signature)
    return res.send(responseHash)
    })

    // getAllPayment

    // getPaymentById

    // getPaymentByUser

    // deletePayment

    // update Payment
}