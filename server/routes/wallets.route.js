import express from "express";
import bodyParser from "body-parser";
import WalletController from "../controllers/wallets.controller.js";

const router = express.Router();
const wallet = new WalletController();

// ======= route wallet =========
router
  .route("/wallets") //
  .get(wallet.getAll.bind(wallet)) //
  .post(wallet.create.bind(wallet)); //

router
  .route("/wallets/:id")
  .get(wallet.getById.bind(wallet))
  .delete(wallet.doDelete.bind(wallet))
  .put(wallet.doEdit.bind(wallet));

// ======= end route wallet ===========

export default router;
