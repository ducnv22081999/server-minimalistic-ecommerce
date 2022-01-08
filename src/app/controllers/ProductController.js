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
    const form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
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

        // const data = uploadImageToFirebase(files.thumbnail_cdn);
        // console.log("link down là ", data);

        const storageRef = ref(
          storage,
          `images/${files.thumbnail_cdn.originalFilename}`
        );

        const uploadTask = uploadBytesResumable(
          storageRef,
          fs.readFileSync(files.thumbnail_cdn.filepath),
          {
            contentType: "image/jpeg",
          }
        );

        uploadTask.on(
          "state_changed",
          (snapshot) => {
            // Observe state change events such as progress, pause, and resume
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
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
            // Handle unsuccessful uploads
            console.log("Lỗi cmnr ", error);
          },
          () => {
            // Handle successful uploads on complete
            // For instance, get the download URL: https://firebasestorage.googleapis.com/...
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              console.log("File available at", downloadURL);
              product.thumbnail_cdn_server = downloadURL;

              product
                .save()
                .then((product) => {
                  return res.status(200).json(product);
                })
                .catch((err, next) => {
                  res.status(500).json(err.message);
                  next;
                });
            });
          }
        );

        // product.photo.data = fs.readFileSync(files.thumbnail_cdn.filepath);
        // product.photo.contentType = files.thumbnail_cdn.mimetype;
      }

      console.log("prod", product);

      // res.json(product);
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

  // upload Image to Firebase
  async uploadImageToFirebase(file) {
    //   const storageRef = ref(
    //     storage,
    //     `images/${files.thumbnail_cdn.originalFilename}`
    //   );

    //   uploadBytes(storageRef, fs.readFileSync(files.thumbnail_cdn.filepath)).then(
    //     (snapshot) => {
    //       console.log("Uploaded a blob or file!", snapshot);
    //     }
    //   );

    const storageRef = ref(storage, `images/${file.originalFilename}`);

    const uploadTask = await uploadBytesResumable(
      storageRef,
      fs.readFileSync(file.filepath)
    );

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
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
        // Handle unsuccessful uploads
      },
      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);
          return downloadURL;
        });
      }
    );
  }
}

module.exports = new ProductController();
