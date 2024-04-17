import model from "../models/index.model.js";

export class CategoryService {
  constructor(attributes) {
    this.setAttributes = attributes;
    this.IncludeModel = [
      {
        model: model.Category,
        as: "subCategories",
        attributes: ["id", "name"],
      },
    ];
  }

  async getAll(limit = 5, offset = 0) {
    try {
      const setLimit = Number(limit);
      const setOffset = Number(offset);

      const data = await model.Category.findAll({
        attributes: this.setAttributes,
        include: this.IncludeModel,
        limit: setLimit,
        offset: setOffset,
      });

      return data;
    } catch (error) {
      console.error(error);
    }
  }

  async getById(id = Number()) {
    try {
      const response = await model.Category.findByPk(id, {
        attributes: this.setAttributes,
        include: this.IncludeModel,
      });
      return response;
    } catch (error) {
      console.error(error, 500);
    }
  }

  async create(data) {
    try {
      await model.Category.create({
        name: data.name,
        parentCategoryId: data.parentCategoryId,
      });

      return { success: true };
    } catch (err) {
      console.error(err.errors);
      return { success: false, message: err.errors };
    }
  }

  async update(id, data) {
    try {
      await model.Category.update(
        {
          name: data.name,
          parentCategoryId: data.parentCategoryId,
        },
        { where: { id: id } }
      );
      return { success: true };
    } catch (err) {
      console.error(err.error, 500);
      return { success: false, message: err.errors };
    }
  }

  async destroy(id) {
    try {
      await model.Category.destroy({ where: { id: id } });
      return { success: true };
    } catch (err) {
      console.error(err, 500);
      return { success: false, message: err };
    }
  }
}
