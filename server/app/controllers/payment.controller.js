import ResponseHandler from "../../utils/response.js";
import { PaymentServices } from "../services/payment.service.js";
import { asyncHandler } from "../../middleware/asyncHandler.middleware.js";

export class PaymentController {

    constructor(){
        this.paymentservices = new PaymentServices()
    } 

    postPayment = asyncHandler(async(req, res, next)=> {
        const {amount, product, email, customerName, handphone} = req.body
        const result = await this.paymentservices.postPaymentServices(amount, product, customerName, email, handphone)
        return new ResponseHandler(res).success201(result)
    })

    callbackPayment = asyncHandler(async(req, res, next) => {
    const {amount, merchantOrderId, merchantCode, signature, resultCode, product} = req.body;   
    console.log(req.body) 
    // const {email, handhone, nama} = req.user  
    await this.paymentservices.callbackPaymentServices({amount, merchantOrderId, merchantCode, signature, resultCode, product})
    // await this.paymentservices.callbackPaymentServices(amount, merchantCode, merchantOrderId, signature, handhone, resultCode, product, nama, email)
    return res.send("OK")
    })
}