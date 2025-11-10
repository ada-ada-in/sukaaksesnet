import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";
import { logger } from "../../configs/logger.js";

export async function up(queryInterface, Sequelize) {
  const users = [];
  const stopValue = 30;

  for (let i = 1; i <= stopValue; i++) {
    const hashedPassword = await bcrypt.hash("password123", 10); 
    users.push({
      id: uuidv4(),
      nama: `User ${i}`,
      nomor_pelanggan: `PLG-${1000 + i}`,
      alamat: `Jalan Contoh No.${i}, Jakarta`,
      email: `user${i}@example.com`,
      password: hashedPassword,
      created_at: new Date(),
      updated_at: new Date(),
    });
  }

  await queryInterface.bulkInsert("users", users);
  logger.info(`✅ Successfully seeded ${stopValue} users!`);
}

export async function down(queryInterface, Sequelize) {
  await queryInterface.bulkDelete("users", null, {});
  logger.info("🧹 Users table cleared.");
}
