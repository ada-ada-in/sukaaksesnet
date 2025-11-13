import dotenv from "dotenv";

dotenv.config();

export const ENV = {
  app: {
    port: process.env.PORT,
    env: process.env.NODE_ENV,
    front_end_url: process.env.FRONTEND_APP_URL,
  },
  nodemailer: {
    email_user: process.env.EMAIL_USER,
    email_pass: process.env.EMAIL_PASS,
  },
  db: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    name: process.env.DB_NAME,
    user: process.env.DB_USER,
    pass: process.env.DB_PASS,
    timezone: process.env.DB_TIMEZONE,
    dialect: process.env.DB_DIALECT,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: process.env.JWT_EXPIRES_IN,
    refreshSecret: process.env.JWT_REFRESH_SECRET,
    refreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN,
    resetPasswordSecret: process.env.JWT_RESET_PASSWORD_SECRET,
  },
};
