const express = require("express");
const router = express.Router();

const multer = require("multer");
const upload = multer({ dest: "uploads/" });

const productController = require("../../app/controllers/ProductController");

router.get("/", productController.show);
router.post("/", upload.single("thumbnail_cdn"), productController.create);
router.delete("/:id", productController.destroy);
router.put("/:id", productController.update);

module.exports = router;
