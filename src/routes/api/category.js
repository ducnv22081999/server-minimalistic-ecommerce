const express = require("express");
const router = express.Router();

const categoryController = require("../../app/controllers/CategoryController");

router.get("/", categoryController.show);
router.post("/", categoryController.create);
router.delete("/:id", categoryController.destroy);
router.put("/:id", categoryController.update);

module.exports = router;
