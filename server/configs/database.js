import chalk from "chalk";
import { Sequelize } from "sequelize";

const db = new Sequelize("money-management", "root", "", {
  host: "127.0.0.1",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

try {
  await db.authenticate();
  console.info(
    chalk.green("[Database]  Connection has been established successfully.")
  );
} catch (error) {
  console.error(
    chalk.red("[Database]  Unable to connect to the database:"),
    error
  );
}

export default db;
