const productRouter = require("./product");
const categoryRouter = require("./category");

function route(app) {
  app.use("/product", productRouter);
  app.use("/category", categoryRouter);
}

module.exports = route;
