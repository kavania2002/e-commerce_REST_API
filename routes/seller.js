const express = require("express");
const router = express.Router();
const passport = require("passport");

const Catalog = require('../models/catalog');

router.post("/create-catalog", (req, res) => {
  if (req.isAuthenticated() && !req.user.buyer) {
    const { items } = req.body;
    // console.log(items);
    const sellerID = req.user._id;
    Catalog.findOne({seller: sellerID}, (err, catalog) => {
        if (err) console.log(err);
        else if (catalog) {
            const previousProducts = catalog.products;
            Array.prototype.push.apply(previousProducts,items);
            catalog.products = previousProducts;
            catalog.save();
        } else {
            const newCatalog = new Catalog({
                seller: sellerID,
                products: items
            });

            newCatalog.save((err)=>{
                if (err) console.log(err);
                res.send('Catalog Saved');
            })
        }
    })
  } else {
    res.send("You are not authorized to create a Catalog");
  }
});

module.exports = router;