const express = require("express");
const router = express.Router();
const passport = require("passport");

const User = require("../models/user");

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
      res.send('You are not authorized to see the sellers');
  }
});

module.exports = router;