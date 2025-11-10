import "dotenv/config";
import app from "./server/server.js";
import http from "http";
import path from "path";
import express from "express";
import { sequelize } from "./server/configs/database.js";
import { fileURLToPath } from "url";
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

const start = async () => {
  try {
    // Sync Database
    const database = await sequelize.sync(); // use this for first time
    // const database = await sequelize.sync({ force: false }); // use this to reset db
    // const database = await sequelize.sync({force: true}); // use this to drop and recreate db
    // const database = await sequelize.authenticate(); // use this to check connection
    // const database = await sequelize.sync({ alter: true }); // use this to update db according to models
    if (!database) {
      console.log("database cannot sync");
    } else {
      console.log("====================================================");
      console.log("Database Connected Successfully");
    }

    server.listen(PORT, () =>
      console.log(`🚀 [SERVER] is running on port http://localhost:${PORT}`)
    );
    console.log("====================================================");
  } catch (error) {
    console.error(`⚠️ [ERROR] ${error.message}`);
  }
};

start();
