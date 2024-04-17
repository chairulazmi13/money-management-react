import { DataTypes, Model } from "sequelize";
import db from "../configs/database.js";
import Wallet from "./wallets.model.js";
import Category from "./categorys.model.js";

class Transaction extends Model {}

Transaction.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    note: {
      type: DataTypes.STRING(25),
      allowNull: false,
      validate: {
        notNull: { msg: "Note can't be Null" },
        notEmpty: { msg: "Note can't be Empty" },
      },
    },
    balance: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        isFloat: true,
        notNull: { msg: "Balance can't be Null" },
        notEmpty: { msg: "Balance can't be Empty" },
      },
    },
    date: {
      type: DataTypes.DATE(),
      allowNull: false,
      validate: {
        notNull: { msg: "Date can't be Null" },
        notEmpty: { msg: "Date can't be Empty" },
      },
    },
    transactionType: {
      type: DataTypes.ENUM("Income", "Expense", "Transfer"),
      allowNull: false,
      validate: {
        notNull: { msg: "Transaction type can't be Null" },
        notEmpty: { msg: "Transaction type can't be Empty" },
        isIn: {
          args: [["Income", "Expense", "Transfer"]],
          msg: "Transaction type not valid",
        },
      },
    },
    paymentType: {
      type: DataTypes.ENUM(
        "Cash",
        "Debit card",
        "Credit card",
        "Bank Transfer",
        "Web payment"
      ),
      allowNull: false,
      validate: {
        notNull: { msg: "Payment type can't be Null" },
        notEmpty: { msg: "Payment type can't be Empty" },
        isIn: {
          args: [
            [
              "Cash",
              "Debit card",
              "Credit card",
              "Bank Transfer",
              "Web payment",
            ],
          ],
          msg: "Payment type not valid",
        },
      },
    },
    walletId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize: db,
  }
);

//======== Join Wallet =========//
Wallet.hasMany(Transaction, {
  foreignKey: "id",
  onUpdate: "RESTRICT",
  onDelete: "RESTRICT",
});

Transaction.belongsTo(Wallet, {
  constraints: false,
  foreignKey: "walletId",
});

//====== Join Category ==========//
Category.hasMany(Transaction, {
  foreignKey: "id",
  onDelete: "RESTRICT",
  onUpdate: "RESTRICT",
});

Transaction.belongsTo(Category, {
  constraints: false,
  foreignKey: "categoryId",
});

// Create table if not exist
Transaction.sync();

export default Transaction;
