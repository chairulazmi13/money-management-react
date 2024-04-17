import express from "express";
import TransactionCntroller from "../controllers/transactions.controller.js";

const router = express.Router();
const transaction = new TransactionCntroller();

router
  .route("/transactions")
  .get(transaction.getAll.bind(transaction))
  .post(transaction.createTransaction.bind(transaction));

router
  .route("/transactions/:id")
  .get(transaction.findTransaction.bind(transaction))
  .delete(transaction.deleteTransaction.bind(transaction))
  .put(transaction.updateTransaction.bind(transaction));

router.get("/incomes", transaction.getAllIncome.bind(transaction));
router.get("/expenses", transaction.getAllExpense.bind(transaction));

export default router;
