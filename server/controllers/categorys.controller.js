import { CategoryService } from "../services/categories.service.js";

class CategoryController {
  constructor() {
    const attr = ["id", "name"];
    this.categoryService = new CategoryService(attr);
  }

  async getAll(req, res) {
    try {
      const setLimit = req.query.limit;
      const setOffset = req.query.offset;
      const data = await this.categoryService.getAll(setLimit, setOffset);

      data.length < 1
        ? res.status(404).json({ message: "Data not found" })
        : res.json(data);
    } catch (error) {
      res.status(500).send("Unknow error");
    }
  }

  async insert(req, res) {
    try {
      const newData = req.body;
      const response = await this.categoryService.create(newData);

      !response.success
        ? res.status(400).json({ message: response.message })
        : res.json({ message: "succesfuly created", data: newData });
    } catch (error) {
      res.status(500).send("Unknow error");
    }
  }

  async getById(req, res) {
    try {
      const data = await this.categoryService.getById(req.params.id);
      !data
        ? res.status(404).json({ message: "Data not found" })
        : res.json(data);
    } catch (error) {
      res.status(500).send("Unknow error");
    }
  }

  async doDelete(req, res) {
    try {
      const id = req.params.id;
      const find = await this.categoryService.getById(id);

      if (!find) {
        res.status(404).json({ message: "Data not found" });
        return;
      }

      await this.categoryService.destroy(id);
      res.json({ message: "succesfuly deleted" });
    } catch (error) {
      res.status(500).send("Unknow error");
    }
  }

  async doEdit(req, res) {
    try {
      const id = req.params.id;
      const data = req.body;
      const find = await this.categoryService.getById(id);

      if (!find) {
        return res.status(404).json({ message: "Data not found" });
      }

      const response = await this.categoryService.update(id, data);

      !response.success
        ? res.status(400).json({ message: response.message })
        : res.json({ message: "Update success" });
    } catch (error) {
      res.status(500).send("Unknow error");
    }
  }
}

export default CategoryController;
