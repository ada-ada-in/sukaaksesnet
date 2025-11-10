import {sequelize} from "../configs/database.js";

const queryInterface = sequelize.getQueryInterface();

import { up as seedUsers } from "../app/seeders/20251110-users-seeder.js";

async function runSeeders() {
  try {
    await sequelize.authenticate();
    console.log("✅ Database connected.");

    await seedUsers(queryInterface);
    console.log("✅ Users seeded successfully!");
  } catch (err) {
    console.error("❌ Seeding failed:", err);
  } finally {
    await sequelize.close();
  }
}

runSeeders();
