const Product = require("../models/Product");

const multer = require("multer");
const upload = multer({ dest: "uploads/" });

class ProductController {
  // [GET] /products
  show(req, res, next) {
    Product.find()
      .select("")
      .then((product) => {
        return res.status(200).json(product);
      })
      .catch((err, next) => {
        res.status(500).json(err.message);
        next;
      });
  }
  // [POST] /products/
  create(req, res, next) {
    const { name, category_id, rating, price, thumbnail_cdn } = req.body;
    console.log(typeof thumbnail_cdn);

    console.log(thumbnail_cdn[0]);

    const product = new Product({
      name,
      price: price,
      category_id,
      rating,
      photo: thumbnail_cdn,
    });

    console.log(product);

    product
      .save()
      .then((product) => {
        return res.status(200).json(product);
      })
      .catch((err, next) => {
        res.status(500).json(err.message);
        next;
      });
  }
  // PUT /products/:id
  update(req, res, next) {
    Product.updateOne({ _id: req.params.id }, req.body)
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
    Product.delete({ _id: req.params.id })
      .then(() => {
        return res.status(200).json(req.params.id);
      })
      .catch((err, next) => {
        res.status(500).json(err.message);
        next;
      });
  }
}

module.exports = new ProductController();
