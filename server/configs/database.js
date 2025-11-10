import { Sequelize } from "sequelize";
import { ENV } from "./env.js";

export const sequelize = new Sequelize(
  ENV.db.name,
  ENV.db.user,
  ENV.db.pass,
  {
    host: ENV.db.host,
    timezone: ENV.db.timezone,
    dialect: ENV.db.dialect,
    dialectOptions: {
      useUTC: false ,
      dateStrings: true,
    },
    logging:
      ENV.app.env === "development"
        ? (...msg) => console.log(msg[0])
        : false,
  }
);
