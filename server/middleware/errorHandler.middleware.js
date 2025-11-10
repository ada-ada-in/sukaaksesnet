import ResponseHandler from "../utils/response.js";

export const errorHandler = (err, req, res, next) => {
  console.error(`[ERROR] ${req.method} ${req.url} - ${err.message}`);
  const message = err.message || "Internal Server Error";
  new ResponseHandler(res).error500(message, err.stack);
};
