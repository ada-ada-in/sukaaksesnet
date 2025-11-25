import jwt from "jsonwebtoken";
import { ENV } from "../configs/env.js";

export const payMent = (payload, expiresIn = ENV.jwt.expiresIn) => {
  return jwt.sign(payload, ENV.jwt.payment, { expiresIn });
}
