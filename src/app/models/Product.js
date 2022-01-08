const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;
const slug = require("mongoose-slug-generator");
const mongooseDelete = require("mongoose-delete");

const Schema = mongoose.Schema;

const productSchema = new Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    category_id: { type: ObjectId, ref: "Category" },
    rating: { type: Number, required: true },
    description: { type: String, required: true },
    slug: { type: String, slug: "name", unique: true },
    quantily: { type: Number, required: true },
    thumbnail_cdn_server: { type: String, required: true },
    photo: {
      data: Buffer,
      contentType: String,
    },
  },
  {
    timestamps: true,
  }
);

// Add plugins
mongoose.plugin(slug);
productSchema.plugin(mongooseDelete, {
  deletedAt: true,
  overrideMethods: "all",
});

module.exports = mongoose.model("Product", productSchema);
