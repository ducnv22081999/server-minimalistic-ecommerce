const Category = require("../models/Category");

class CategoryController {
  // [GET] /category
  show(req, res, next) {
    Category.find()
      .select("")
      .then((category) => {
        return res.status(200).json(category);
      })
      .catch((err, next) => {
        res.status(500).json(err.message);
        next;
      });
  }
  // [POST] /category/
  create(req, res, next) {
    const category = new Category(req.body);
    category
      .save()
      .then((category) => {
        return res.status(200).json(category);
      })
      .catch((err, next) => {
        res.status(500).json(err.message);
        next;
      });
  }
  // PUT /products/:id
  update(req, res, next) {
    Category.updateOne({ _id: req.params.id }, req.body)
      .then(() => {
        return res.status(200).json(req.body);
      })
      .catch((err, next) => {
        res.status(500).json(err.message);
        next;
      });
  }
  // [DELETE] /products/:id
  destroy(req, res, next) {
    Category.delete({ _id: req.params.id })
      .then(() => {
        return res.status(200).json(req.params.id);
      })
      .catch((err, next) => {
        res.status(500).json(err.message);
        next;
      });
  }
}

module.exports = new CategoryController();
