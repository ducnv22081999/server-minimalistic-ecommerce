const formidable = require("formidable");
const fs = require("fs");

const Product = require("../models/Product");

const multer = require("multer");
const upload = multer({ dest: "uploads/" });

const { storage } = require("../../firebase/storage_initialize");
const {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  uploadBytes,
} = require("firebase/storage");

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
    const product = new Product(req.body);
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

  // upload image to firebase
  uploadImage(req, res, next) {
    console.log("đang up load");
    const form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
      if (err) {
        return res.status(400).json(err.message);
      }
      if (files.image) {
        if (files.size > 10000) {
          return res
            .status(400)
            .json({ message: "Bạn nên upload ảnh dưới 10mb!" });
        }
        const storageRef = ref(
          storage,
          `images/${files.image.originalFilename}`
        );

        const uploadTask = uploadBytesResumable(
          storageRef,
          fs.readFileSync(files.image.filepath),
          {
            contentType: files.image.mimetype,
          }
        );

        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log("Upload is " + progress + "% done");
            switch (snapshot.state) {
              case "paused":
                console.log("Upload is paused");
                break;
              case "running":
                console.log("Upload is running");
                break;
            }
          },
          (error) => {
            console.log("Lỗi cmnr ", error);
            res.status(500).json(error.message);
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              console.log("File available at", downloadURL);
              return res.status(200).json(downloadURL);
            });
          }
        );
      }
    });
  }
}

module.exports = new ProductController();
