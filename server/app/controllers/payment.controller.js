import ResponseHandler from "../../utils/response.js";
import { PaymentServices } from "../services/payment.service.js";
import { asyncHandler } from "../../middleware/asyncHandler.middleware.js";
import { get } from "http";

export class PaymentController {
  constructor() {
    this.paymentservices = new PaymentServices();
  }

  postPayment = asyncHandler(async (req, res, next) => {
    const {
      amount,
      product,
      email,
      customerName,
      handphone,
      id_users,
      resultCode,
    } = req.body;
    const result = await this.paymentservices.postPaymentServices(
      amount,
      product,
      customerName,
      email,
      handphone,
      id_users,
      resultCode
    );
    return new ResponseHandler(res).success201(result);
  });

  callbackPayment = asyncHandler(async (req, res, next) => {
    const callbackData = req.body;
    const { merchantOrderId, resultCode, amount, signature } = callbackData;
    const responseHash = await this.paymentservices.callbackPaymentServices(
      merchantOrderId,
      resultCode,
      amount,
      signature
    );
    return res.send(responseHash);
  });

  // getAllPayment
  getAllPayment = asyncHandler(async (req, res, next) => {
    const result = await this.paymentservices.getAllPaymentServices();
    return new ResponseHandler(res).paymentGetAll(result);
  });

  // getPaymentById
  getPaymentById = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const result = await this.paymentservices.getPaymentByIdServices(id);
    return new ResponseHandler(res).paymentGetById(result);
  });

  // getPaymentByUser
  getPaymentByUser = asyncHandler(async (req, res, next) => {
    const { id_users } = req.params;
    const result = await this.paymentservices.getPaymentByUserServices(
      id_users
    );
    return new ResponseHandler(res).paymentGetByUser(result);
  });

  // deletePayment
  deletePayment = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const result = await this.paymentservices.deletePaymentServices(id);
    return new ResponseHandler(res).paymentDeleted(result);
  });

  // update Payment
  updatePayment = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const updateData = req.body;
    const result = await this.paymentservices.updatePaymentServices(
      id,
      updateData
    );
    return new ResponseHandler(res).paymentUpdated(result);
  });
}
