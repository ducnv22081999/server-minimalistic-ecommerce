const productRouter = require("./api/product");
const categoryRouter = require("./api/category");

function route(app) {
  app.use("/api/product", productRouter);
  app.use("/api/category", categoryRouter);
}

module.exports = route;
