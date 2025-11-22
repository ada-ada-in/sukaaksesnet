import Joi from "joi";
import ResponseHandler from "../utils/response.js";
import bcrypt from "bcrypt";

export const validatePayment = (req, res, next) => {
  const schema = Joi.object({
    amount: Joi.number().required(),
    product: Joi.string().required(),
    customerName: Joi.string().required(),
    customerEmail: Joi.string().email().required(),
    phoneNumber: Joi.string().required()
  })
  const { error } = schema.validate(req.body);
  if (error) return new ResponseHandler(res).error400(error.details[0].message);
  next();
}

export const validateUser = (req, res, next) => {
  const schema = Joi.object({
    nama: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    nomor_pelanggan: Joi.string().required(),
    alamat: Joi.string().required(),
  });

  const { error } = schema.validate(req.body);
  if (error) return new ResponseHandler(res).error400(error.details[0].message);
  next();
};

export const validateLogin = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  });
  const { error } = schema.validate(req.body);
  if (error) return new ResponseHandler(res).error400(error.details[0].message);
  next();
};

export const validateForgetPassword = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
  });
  const { error } = schema.validate(req.body);
  if (error) return new ResponseHandler(res).error400(error.details[0].message);
  next();
};

export const validateResetPassword = (req, res, next) => {
  const schema = Joi.object({
    newPassword: Joi.string().min(6).required(),
  });
  const { error } = schema.validate(req.body);
  if (error) return new ResponseHandler(res).error400(error.details[0].message);
  next();
};


export const validatePassword = async (plainPassword, hashedPassword) => {
  return await bcrypt.compare(plainPassword, hashedPassword);
}