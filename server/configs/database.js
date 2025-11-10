import { Sequelize } from "sequelize";
import "dotenv/config";

export const sequelize = new Sequelize(
  process.env.DB_DATABASE,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    timezone: process.env.DB_TIMEZONE || "+07:00",
    dialect: process.env.DB_DIALECT,
    dialectOptions: {
      useUTC: false ,
      dateStrings: true,
    },
    logging:
      process.env.ENV === "development"
        ? (...msg) => console.log(msg[0])
        : false,
  }
);
