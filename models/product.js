const mongoose = require("mongoose");
const passLocalMongoose = require("passport-local-mongoose");

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
});

productSchema.plugin(passLocalMongoose);

module.exports = new mongoose.Model("product", productSchema);
