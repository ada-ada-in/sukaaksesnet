import jwt from "jsonwebtoken";
import { ENV } from "../configs/env.js";

export const jwtSign = (payload, expiresIn = ENV.jwt.expiresIn) => {
  return jwt.sign(payload, ENV.jwt.secret, { expiresIn });
}

export const refreshTokenSign = (payload, expiresIn = ENV.jwt.refreshExpiresIn) => {
  return jwt.sign(payload, ENV.jwt.refreshSecret, { expiresIn });
}

export const generateResetToken = (payload, expiresIn = ENV.jwt.expiresIn, resetAccountToken = ENV.jwt.resetPasswordSecret) => {
  return jwt.sign(payload, resetAccountToken, { expiresIn });
}

export const deleteCookie = (res) => { 
  const cookieName = 'refreshToken';
  const cookieOptions = ({
      httpOnly: true,
      secure: ENV.app.env === 'production',
      sameSite: 'Strict',
      path: '/',
  });

  res.clearCookie(cookieName, cookieOptions)
}

export const verifyToken = (token, jwtToken) => {
  return jwt.verify(token, jwtToken);
}
