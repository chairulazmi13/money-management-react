import { TransactionService } from "../services/transactions.service.js";

class TransactionController {
  constructor() {
    const attr = [
      "id",
      "note",
      "balance",
      "date",
      "transactionType",
      "paymentType",
    ];
    this.transactionService = new TransactionService(attr);
  }

  async getAll(req, res) {
    try {
      const limit = req.query.limit;
      const offset = req.query.offset;

      const transaction = await this.transactionService.getAll(limit, offset);

      !transaction
        ? res.status(404).json({ message: "Transaction not found" })
        : res.json(transaction);
    } catch (error) {
      res.status(500).json({ message: error });
    }
  }

  async getAllIncome(req, res) {
    try {
      const limit = req.query.limit;
      const offset = req.query.offset;

      const income = await this.transactionService.getAll(limit, offset, {
        transactionType: "Income",
      });

      !income
        ? res.status(404).json({ message: "Income not found" })
        : res.json(income);
    } catch (error) {
      res.status(500).json({ message: error });
    }
  }

  async getTotalIncome(req, res) {
    try {
    } catch (error) {}
  }

  async getAllExpense(req, res) {
    try {
      const limit = req.query.limit;
      const offset = req.query.offset;

      const expense = await this.transactionService.getAll(limit, offset, {
        transactionType: "Expense",
      });

      !expense
        ? res.status(404).json({ message: "Expense not found" })
        : res.json(expense);
    } catch (error) {
      res.status(500).json({ message: error });
    }
  }

  async createTransaction(req, res) {
    try {
      const save = await this.transactionService.create(req.body);
      save.status === "success"
        ? res.status(201).json(save.data)
        : res.status(400).json(save.data);
    } catch (Error) {
      res.status(500).json({ message: Error });
    }
  }

  async findTransaction(req, res) {
    try {
      const id = req.params.id;
      const find = await this.transactionService.getById(id);

      !find
        ? res.status(404).json({ message: "Transcation not found" })
        : res.json(find);
    } catch (error) {
      res.status(500).json({ message: error });
    }
  }

  async deleteTransaction(req, res) {
    try {
      const id = req.params.id;
      const find = await this.transactionService.getById(id);

      if (!find) {
        res.status(404).json({ message: "Data not found" });
        return;
      }

      await this.transactionService.delete(id);

      res.json({
        message: "Delete success",
        data: find,
      });
    } catch (error) {
      res.status(500).json({ message: error });
    }
  }

  async updateTransaction(req, res, next) {
    try {
      const id = req.params.id;
      const data = req.body;
      const find = await this.transactionService.getById(id);

      if (!find) {
        res.status(404).json({ message: "Data not found" });
        return;
      }

      const response = await this.transactionService.update(id, data);

      !response.status
        ? res.status(400).json(response.message)
        : res.json({ message: "Update success", data: data });
    } catch (error) {
      res.status(500).json({ message: "an error occurred" });
    }
  }
}

export default TransactionController;
