import jwt from "jsonwebtoken";
import ResponseHandler from "../utils/response.js";

export const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return new ResponseHandler(res).error403("No token provided");
  };

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return new ResponseHandler(res).error401();
  }
};

export const jwtSign = (payload, expiresIn) => {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn });
}
