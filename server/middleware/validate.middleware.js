import Joi from "joi";
import ResponseHandler from "../utils/response.js";

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