import { Model, DataTypes } from "sequelize";
import { sequelize } from "../../configs/database.js";
import { v4 as uuidv4 } from "uuid";

class PaymentModels extends Model {}

 PaymentModels.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: uuidv4,
      primaryKey: true,
      allowNull: false,
      unique: true,
    },
    customerName: {
      type: DataTypes.STRING(60),
      allowNull: true,
    },
    handphone: {
      type: DataTypes.STRING(60),
      allowNull: false,
    },
    amount: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    merchantOrderId: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    payment_url: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    product: {
      type: DataTypes.STRING(100),
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
    modelName: "payment",
    underscored: true,
    paranoid: false,
  }
);

export default PaymentModels;
