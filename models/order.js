const mongoose = require("mongoose");
const passLocalMongoose = require("passport-local-mongoose");

const orderSchema = new mongoose.Schema({
  buyer: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  seller: { type: mongoose.Schema.Types.ObjectId, ref: "user" },  
  products: [{ type: mongoose.Schema.ObjectId, ref: "product" }],
  time: { type: Number, default: Date.now },
});

orderSchema.plugin(passLocalMongoose);

module.exports = new mongoose.model("order", orderSchema);
