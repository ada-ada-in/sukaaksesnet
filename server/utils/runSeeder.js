import {sequelize} from "../configs/database.js";
import { logger } from "../configs/logger.js";

const queryInterface = sequelize.getQueryInterface();

import { up as seedUsers } from "../app/seeders/20251110-users-seeder.js";

async function runSeeders() {
  try {
    await sequelize.authenticate();
    logger.info("✅ Database connected.");

    await seedUsers(queryInterface);
    logger.info("✅ Users seeded successfully!");
  } catch (err) {
    logger.error("❌ Seeding failed:", err);
  } finally {
    await sequelize.close();
  }
}

runSeeders();
