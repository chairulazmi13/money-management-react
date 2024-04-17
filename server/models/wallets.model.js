import { DataTypes, Model } from "sequelize";
import db from "../configs/database.js";

class Wallet extends Model {}

Wallet.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "Name can't be Null" },
        notEmpty: { msg: "Name can't be empty" },
      },
    },
  },
  {
    sequelize: db,
  }
);

await Wallet.sync();

export default Wallet;
