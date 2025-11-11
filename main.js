import "dotenv/config";
import app from "./server/server.js";
import http from "http";
import path from "path";
import express from "express";
import { sequelize } from "./server/configs/database.js";
import { fileURLToPath } from "url";
import { logger } from "./server/configs/logger.js";
import cors  from "cors";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());


// Middleware untuk melayani file statis (CSS, JS)
app.use(express.static(path.join(__dirname, "public")));
app.use("/node_modules", express.static(path.join(__dirname, "node_modules")));
app.use(cors());


const server = http.createServer(app);
const PORT = process.env.PORT || 8000;

process.on("unhandledRejection", (err) => {
  logger.error(`❌ Unhandled Rejection: ${err.message}`, { stack: err.stack });
});

process.on("uncaughtException", (err) => {
  logger.error(`💀 Uncaught Exception: ${err.message}`, { stack: err.stack });
  setTimeout(() => process.exit(1), 100);
});


const start = async () => {
  try {
    // Sync Database
    // await sequelize.sync(); // use this for first time
    // await sequelize.sync({ force: false }); // use this to reset db
    // await sequelize.sync({force: true}); // use this to drop and recreate db
       await sequelize.authenticate(); // use this to check connection
    // await sequelize.sync({ alter: true }); // use this to update db according to models
      console.log("=================================================================================");
      logger.info("Database Connected Successfully");

    server.listen(PORT, () =>
      logger.info(`🚀 [SERVER] is running on port http://localhost:${PORT}`)
    );
    console.log("=================================================================================");
  } catch (error) {
    logger.error(`⚠️ [ERROR] ${error.message}`);
  }
};

start();
