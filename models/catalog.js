const mongoose = require("mongoose");
const passLocalMongoose = require("passport-local-mongoose");

const catalogSchema = new mongoose.Schema({
  seller: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  products: [{ type: mongoose.Schema.Types.ObjectId, ref: "product" }],
});

catalogSchema.plugin(passLocalMongoose);

module.exports = new mongoose.Model("catalog", catalogSchema);
