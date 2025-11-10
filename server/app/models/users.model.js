import { Model, DataTypes } from "sequelize";
import { sequelize } from "../../configs/database.js";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";

class UsersModels extends Model {
  async validatePassword(password) {
    return bcrypt.compare(password, this.password);
  }
}

 UsersModels.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: uuidv4,
      primaryKey: true,
      allowNull: false,
      unique: true,
    },
    nama: {
      type: DataTypes.STRING(60),
      allowNull: true,
    },
    nomor_pelanggan: {
      type: DataTypes.STRING(60),
      allowNull: false,
    },
    alamat: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      get() {
        const rawValue = this.getDataValue("createdAt");
        return rawValue
          ? new Date(rawValue).toLocaleString("id-ID", {
              timeZone: "Asia/Jakarta",
              dateStyle: "medium",
              timeStyle: "short",
            })
          : null;
      },
    },
    updatedAt: {
      type: DataTypes.DATE,
      get() {
        const rawValue = this.getDataValue("updatedAt");
        return rawValue
          ? new Date(rawValue).toLocaleString("id-ID", {
              timeZone: "Asia/Jakarta",
              dateStyle: "medium",
              timeStyle: "short",
            })
          : null;
      },
    },
  },
  {
    sequelize,
    modelName: "users",
    underscored: true,
    paranoid: false,
    hooks: {
      beforeCreate: async (user) => {
        if (user.password) {
          const salt = await bcrypt.genSalt(10);
          user.password = await bcrypt.hash(user.password, salt);
        }
      },
      beforeUpdate: async (user) => {
        if (user.changed("password")) {
          const salt = await bcrypt.genSalt(10);
          user.password = await bcrypt.hash(user.password, salt);
        }
      },
    },
  }
);

export default UsersModels;
