import { DataTypes, Model } from "sequelize";
import db from "../configs/database.js";

class Category extends Model {}

Category.init(
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
        notEmpty: { msg: "Name can't be empty" },
        notNull: { msg: "Name can't be Null" },
      },
    },
    parentCategoryId: { type: DataTypes.INTEGER, allowNull: true },
  },
  {
    sequelize: db,
  }
);

Category.hasMany(Category, {
  as: "subCategories",
  foreignKey: "parentCategoryId",
  onDelete: "RESTRICT",
  onUpdate: "RESTRICT",
});

Category.belongsTo(Category, {
  constraints: false,
  foreignKey: "id",
});

// await Category.drop();
await Category.sync();

export default Category;
