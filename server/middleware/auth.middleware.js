import jwt from "jsonwebtoken";
import { ENV } from "../configs/env.js";
import ResponseHandler from "../utils/response.js";

export const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return new ResponseHandler(res).error403("No token provided");
  };

  try {
    const decoded = jwt.verify(token, ENV.jwt.secret);
    req.user = decoded;
    next();
  } catch (error) {
    return new ResponseHandler(res).error401();
  }
};

export const verifyResetTokenMiddleware = (req, res, next) => {
  const { token } = req.params;
  if (!token) {
    return new ResponseHandler(res).error403("No token provided");
  }
  try {
    const decoded = jwt.verify(token, ENV.jwt.resetPasswordSecret);
    req.user = decoded;
    next();
  } catch (error) {
    return new ResponseHandler(res).error401();
  }
};


export const paymentMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return new ResponseHandler(res).error403("No token provided");
  };

  try {
    const decoded = jwt.verify(token, ENV.jwt.payment);
    req.payment = decoded;
    next();
  } catch (error) {
    return new ResponseHandler(res).error401();
  }
};