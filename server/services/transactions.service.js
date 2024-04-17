import model from "../models/index.model.js";
export class TransactionService {
  constructor(attributes) {
    this.setAttributes = attributes; // fields attributes
    this.includeModel = [
      { model: model.Wallet, attributes: ["id", "name"] },
      { model: model.Category, attributes: ["id", "name"] },
    ];
  }

  async getAll(limit = 5, offset = 0, where) {
    try {
      const setLimit = Number(limit);
      const setOffset = Number(offset);
      const setWhere = where;

      const transaction = await model.Transaction.findAll({
        attributes: this.setAttributes,
        include: this.includeModel,
        limit: setLimit,
        offset: setOffset,
        where: setWhere,
      });

      return transaction;
    } catch (error) {
      console.log(error);
    }
  }

  async getById(id) {
    try {
      const where = id;
      const find = await model.Transaction.findByPk(where, {
        attributes: this.setAttributes,
        include: this.includeModel,
      });
      return find;
    } catch (error) {
      console.log(error);
      throw new Error("Not found!");
    }
  }

  async create(data) {
    try {
      const newTransaction = {
        note: data.note,
        balance: data.balance,
        date: data.date,
        transactionType: data.transactionType,
        paymentType: data.paymentType,
        walletId: data.walletId,
        categoryId: data.categoryId,
      };

      const save = await model.Transaction.create(newTransaction);
      return {
        status: "success",
        data: save,
      };
    } catch (err) {
      console.log(err);
      return {
        status: "error",
        data: err.errors,
      };
    }
  }

  async delete(id) {
    try {
      const doDelete = model.Transaction.destroy({
        where: { id: id },
      });
      return doDelete;
    } catch (err) {
      console.log(err);
      throw new Error("Not found!");
    }
  }

  async update(id, data) {
    try {
      const update = await model.Transaction.update(
        {
          note: data.note,
          balance: data.balance,
          date: data.date,
          transactionType: data.transactionType,
          paymentType: data.paymentType,
          walletId: data.walletId,
          categoryId: data.categoryId,
        },
        { where: { id: id } }
      );

      return {
        status: update,
      };
    } catch (err) {
      console.log(err.errors);
      return {
        status: 0,
        message: err.errors,
      };
    }
  }
}
