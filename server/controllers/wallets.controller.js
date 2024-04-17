import { WalletService } from "../services/wallets.service.js";

class WalletController {
  constructor() {
    const attributes = ["id", "name"];
    this.walletService = new WalletService(attributes);
  }

  async getAll(req, res) {
    try {
      const wallet = await this.walletService.getAll();

      !wallet
        ? res.status(404).json({ message: "Wallets not found" })
        : res.json(wallet);
    } catch (error) {
      res.status(500).json({ message: "unknow error" });
    }
  }

  async create(req, res) {
    try {
      const data = req.body;
      const response = await this.walletService.create(data);

      !response.success
        ? res.status(400).json(response.message)
        : res.json({ message: `${req.body} succesfully created` });
    } catch (error) {
      res.status(500).json({ message: error });
    }
  }

  async getById(req, res) {
    try {
      const id = req.params.id;
      const find = await this.walletService.getById(id);

      !find ? res.status(404).json({ message: "Not found" }) : res.json(find);
    } catch (error) {
      res.status(500).json({ message: "Unknow error" });
    }
  }

  async doDelete(req, res) {
    try {
      const id = req.params.id;
      const find = await this.walletService.getById(id);

      if (!find) {
        return res.status(404).json({ message: "Not found" });
      }

      await this.walletService.destroy(id);
      res.json({ message: "Delete success" });
    } catch (error) {
      res.status(500).send("Unknow error");
    }
  }

  async doEdit(req, res) {
    try {
      const id = req.params.id;
      const data = req.body;
      const find = await this.walletService.getById(id);

      if (!find) {
        return res.status(404).json({ message: "Not found" });
      }

      const response = await this.walletService.update(id, data);

      !response.success
        ? res.status(400).json({ message: response.message })
        : res.json({ message: "Update success" });
    } catch (error) {
      res.status(500).send("Unknow error");
    }
  }
}

export default WalletController;
