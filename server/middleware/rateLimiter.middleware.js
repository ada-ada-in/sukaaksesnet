import expressRateLimiter from "express-rate-limit";
import { logger } from "../configs/logger.js";
import ResponseHandler from "../utils/response.js";

export const globalLimiter = expressRateLimiter({
  windowMs: 15 * 60 * 1000,  // 15 minutes
  max: 300,
  message: "Too many requests from this IP, please try again later.",
  handler: (req, res, next, options) => {
    logger.info(`[RATE LIMIT] ${req.method} ${req.url} - ${options.message}`);
    new ResponseHandler(res).error429("Too many requests");
  },
  headers: true,
});

export const loginLimiter = expressRateLimiter({
  windowMs: 1 * 60 * 1000,  // 1 minute
  max: 10,
  message: "Too many login attempts from this IP, please try again later.",
  handler: (req, res, next, options) => {
    logger.info(`[LOGIN RATE LIMIT] ${req.method} ${req.url} - ${options.message}`);
    new ResponseHandler(res).error429("Too many login attempts");
  },
  headers: true,
});

export const paymentLimiter = expressRateLimiter({
  windowMs: 1 * 60 * 1000,  // 1 minute
  max: 5,
  message: "Too many login attempts from this IP, please try again later.",
  handler: (req, res, next, options) => {
    logger.info(`[LOGIN RATE LIMIT] ${req.method} ${req.url} - ${options.message}`);
    new ResponseHandler(res).error429("Too many login attempts");
  },
  headers: true,
});



export const logoutLimiter = expressRateLimiter({
  windowMs: 1 * 60 * 1000,  // 1 minute
  max: 10,
  message: "Too many login attempts from this IP, please try again later.",
  handler: (req, res, next, options) => {
    logger.info(`[LOGIN RATE LIMIT] ${req.method} ${req.url} - ${options.message}`);
    new ResponseHandler(res).error429("Too many login attempts");
  },
  headers: true,
});


export const forgetPasswordLimiter = expressRateLimiter({
  windowMs: 1 * 60 * 1000,  // 1 minute
  max: 5,
  message: "Too many login attempts from this IP, please try again later.",
  handler: (req, res, next, options) => {
    logger.info(`[LOGIN RATE LIMIT] ${req.method} ${req.url} - ${options.message}`);
    new ResponseHandler(res).error429("Too many login attempts");
  },
  headers: true,
});

export const resetPasswordLimiter = expressRateLimiter({
  windowMs: 1 * 60 * 1000,  // 1 minute
  max: 5,
  message: "Too many login attempts from this IP, please try again later.",
  handler: (req, res, next, options) => {
    logger.info(`[LOGIN RATE LIMIT] ${req.method} ${req.url} - ${options.message}`);
    new ResponseHandler(res).error429("Too many login attempts");
  },
  headers: true,
});


export const registerLimiter = expressRateLimiter({
  windowMs: 1 * 60 * 1000,  // 1 minute
  max: 10,
  message: "Too many registration attempts from this IP, please try again later.",
  handler: (req, res, next, options) => {
    logger.info(`[REGISTER RATE LIMIT] ${req.method} ${req.url} - ${options.message}`);
    new ResponseHandler(res).error429("Too many registration attempts");
  },
  headers: true,
});