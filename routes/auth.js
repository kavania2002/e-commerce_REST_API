const express = require("express");
const router = express.Router();
const passport = require("passport");
const User = require("../models/user");

router.post("/login", (req, res) => {
  const logUser = new User({
    username: req.body.username,
    password: req.body.password,
  });

  req.login(logUser, (err) => {
    if (err) {
      console.log(err);
      res.redirect("/auth/login");
    } else {
      passport.authenticate("local")(req, res, () => {
        res.send("Successfully logged in");
      });
    }
  });
});

router.post("/register", (req, res) => {
  console.log(req.body.username);
  User.register(
    { username: req.body.username },
    req.body.password,
    (err, user) => {
      if (err) {
        console.log(err);
        res.redirect("/auth/login");
      } else {
        passport.authenticate("local")(req, res, () => {
          user.name = req.body.name;
          user.buyer = req.body.buyer;

          user.save();
          res.send("Registered Successfully");
        });
      }
    }
  );
});

module.exports = router;
