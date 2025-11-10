import { Model, DataTypes } from "sequelize";
import { sequelize } from "../../configs/database.js";
import { v4 as uuidv4 } from "uuid";

class UsersModels extends Model {}

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
      type: DataTypes.BIGINT,
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
  },
  {
    sequelize,
    modelName: "users",
    timestamps: true,
    underscored: true,
    paranoid: false,
  }
);

export default UsersModels;
