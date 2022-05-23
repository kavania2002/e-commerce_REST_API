const express = require("express");
const router = express.Router();
const passport = require("passport");
const mongoose = require("mongoose");

const User = require("../models/user");
const Catalog = require("../models/catalog");
const Product = require("../models/product");
const Order = require("../models/order");

router.get("/list-of-sellers", (req, res) => {
  if (req.isAuthenticated() && req.user.buyer) {
    User.find({ buyer: false }, (err, sellers) => {
      let sellerName = [];
      sellers.forEach((seller) => {
        sellerName.push(seller.name);
      });
      res.send(sellerName);
    });
  } else {
    res.send("You are not authorized to see the sellers");
  }
});

router.get("/seller-catalog/:seller_id", (req, res) => {
  if (req.isAuthenticated() && req.user.buyer) {
    Catalog.findOne({ seller: req.params.seller_id }, (err, seller) => {
      if (err) console.log(err);
      else if (!seller) res.send(`Such Seller doesn't exists`);
      else {
        const productIDs = seller.products;
        let products = [];
        productIDs.forEach((id) => {
          Product.findById(id, (err, product) => {
            products.push(product.name);
            if (products.length == productIDs.length) {
              console.log(products);
              res.send(products);
            }
          });
        });
      }
    });
  } else {
    res.send("You are not authorized to see the seller catalog");
  }
});

router.post("/create-order/:seller_id", (req, res, done) => {
  if (req.isAuthenticated() && req.user.buyer) {
    const buyerID = req.user._id;

    const { items } = req.body;
    console.log(items);

    Catalog.findOne({ seller: req.params.seller_id }, (err, catalog) => {
      const newOrder = new Order({
        buyer: buyerID,
        seller: req.params.seller_id,
        products: items,
      });

      let found = false;
      items.forEach((itemID) => {
        if (catalog.products.findIndex((e) => e.toString() === itemID) == -1) {
          res.send(`Items doesn't exist in catalog`);
          found = true;
        }
      });

      if (!found) {
        newOrder.save((err) => {
          if (err) console.log(err);
          res.send("Order Placed Successfully");
        });
      }
    });
  } else {
    res.send("You are not authorized to place an order");
  }
});

module.exports = router;
