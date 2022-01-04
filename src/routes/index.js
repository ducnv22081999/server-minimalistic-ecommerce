const productRouter = require("./product");
const categoryRouter = require("./category");

function route(app) {
  app.use("/api/product", productRouter);
  app.use("/api/category", categoryRouter);
}

module.exports = route;
