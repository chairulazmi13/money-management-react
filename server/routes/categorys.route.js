import express from "express";
import CategoryController from "../controllers/categorys.controller.js";

const router = express.Router();
const Category = new CategoryController();

// ======== route Category =========
router
  .route("/categorys")
  .get(Category.getAll.bind(Category))
  .post(Category.insert.bind(Category));

// ===== route parameter =====
router
  .route("/categorys/:id")
  .get(Category.getById.bind(Category))
  .delete(Category.doDelete.bind(Category))
  .put(Category.doEdit.bind(Category));

// ======= end route Category =======

export default router;
