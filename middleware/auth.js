const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const passLocalMongoose = require('passport-local-mongoose');

const User = require("../models/user");

passport.use(User.createStrategy());

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});
