const formidable = require("formidable");
const fs = require("fs");

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
    // const { name, category_id, rating, price, thumbnail_cdn } = req.body;
    const form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
      console.log(files);
      if (err) {
        return res.status(400).json(err.message);
      }
      const { name, category_id, rating, price, description, quantily } =
        fields;
      if (!name || !category_id || !rating || !price) {
        return res
          .status(400)
          .json({ message: "Bạn cần nhập đầy đủ thông tin!" });
      }
      const product = new Product({
        name,
        price,
        category_id,
        rating,
        quantily,
        description,
      });
      if (files.thumbnail_cdn) {
        if (files.size > 10000) {
          return res
            .status(400)
            .json({ message: "bạn nên upload ảnh dưới 10mb!" });
        }
        product.photo.data = fs.readFileSync(files.thumbnail_cdn.filepath);
        product.photo.contentType = files.thumbnail_cdn.mimetype;
      }

      product
        .save()
        .then((product) => {
          return res.status(200).json(product);
        })
        .catch((err, next) => {
          res.status(500).json(err.message);
          next;
        });

      // console.log("prod", product);

      // res.json(product);
    });

    // console.log(typeof thumbnail_cdn);

    // console.log(thumbnail_cdn[0]);

    // const product = new Product({
    //   name,
    //   price: price,
    //   category_id,
    //   rating,
    //   photo: thumbnail_cdn,
    // });

    // console.log(product);

    // product
    //   .save()
    //   .then((product) => {
    //     return res.status(200).json(product);
    //   })
    //   .catch((err, next) => {
    //     res.status(500).json(err.message);
    //     next;
    //   });
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

  // productById
  productById(req, res, next, id) {
    Product.findById(id).exec((err, product) => {
      if (err || !product) {
        return res.status(400).json({ message: "Không tìm thấy sp!" });
      }
      req.product = product;
      next();
    });
  }

  // get Image to Id image
  getImageToId(req, res, next) {
    if (req.product.photo.data) {
      res.set("Content-Type", req.product.photo.data.contentType);
      return res.send(req.product.photo.data);
    }
    next();
  }
}

module.exports = new ProductController();
