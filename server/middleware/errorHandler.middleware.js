import ResponseHandler from "../utils/response.js";
import { logger } from "../configs/logger.js";

export const errorHandler = (err, req, res, next) => {
  logger.error(`[ERROR] ${req.method} ${req.url} - ${err.message}`);
  const message = err.message || "Internal Server Error";
  new ResponseHandler(res).error500(message, err.stack);
};
