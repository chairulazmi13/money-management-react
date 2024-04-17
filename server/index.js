import express from "express";
import bodyParser from "body-parser";
import walletRouter from "./routes/wallets.route.js";
import categoryRouter from "./routes/categorys.route.js";
import transactionRouter from "./routes/transactions.route.js";
import chalk from "chalk";
import cors from "cors";

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.use(
  cors({
    origin: ["http://localhost:3001", "http://192.168.1.13:3001"],
    methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"],
  })
);

app.all("/", (req, res) => {
  res.send("Welcome to Money-management API");
});

app.use([walletRouter, categoryRouter, transactionRouter]);

app.use((req, res) => {
  res.status(404).json({
    message: "Route not found",
  });
});

app.listen(port, () => {
  console.log(chalk.green(`[App]  App listening on port ${port}`));
});
