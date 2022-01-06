const express = require("express");
const router = express.Router();

const multer = require("multer");
const upload = multer({ dest: "uploads/" });

const productController = require("../../app/controllers/ProductController");

router.get("/", productController.show);
router.post("/", productController.create);
router.delete("/:id", productController.destroy);
router.put("/:id", productController.update);

// get Image to Id image
router.get("/photo/:productId", productController.getImageToId);
router.param("productId", productController.productById);

module.exports = router;
