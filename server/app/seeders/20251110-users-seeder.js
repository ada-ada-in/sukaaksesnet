import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";

export async function up(queryInterface, Sequelize) {
  const users = [];

  for (let i = 1; i <= 30; i++) {
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
  console.log("✅ Successfully seeded 30 users!");
}

export async function down(queryInterface, Sequelize) {
  await queryInterface.bulkDelete("users", null, {});
  console.log("🧹 Users table cleared.");
}
