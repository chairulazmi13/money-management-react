import model from "../models/index.model.js";

export class WalletService {
  constructor(attributes) {
    this.setAttributes = attributes;
  }

  async getAll() {
    try {
      const wallets = await model.Wallet.findAll({
        attributes: this.setAttributes,
      });

      return wallets;
    } catch (error) {
      console.error(error);
    }
  }

  async getById(id) {
    try {
      const wallet = await model.Wallet.findByPk(id, {
        attributes: this.setAttributes,
      });
      return wallet;
    } catch (error) {
      console.error(error, 500);
    }
  }

  async create(data) {
    try {
      await model.Wallet.create({
        name: data.name,
      });

      return { success: true };
    } catch (err) {
      console.error(err.errors);
      return { success: false, message: err.errors };
    }
  }

  async update(id, data) {
    try {
      await model.Wallet.update({ name: data.name }, { where: { id: id } });
      return { success: true };
    } catch (err) {
      console.error(err.error, 500);
      return { success: false, message: err.errors };
    }
  }

  async destroy(id) {
    try {
      await model.Wallet.destroy({ where: { id: id } });
      return { success: true };
    } catch (err) {
      console.error(err, 500);
      return { success: false, message: err };
    }
  }
}
