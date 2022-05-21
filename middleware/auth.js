const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const verify = require("./authVerify");

const User = require("../models/user");

passport.use(
  new LocalStrategy(function (username, password, done) {
    User.findOne({ username: username }, (err, user) => {
      if (err) return done(err, false);
      else if (!user) return done(null, false);

      if (verify.validatePassword(password, user.hash)) {
        return done(null, user);
      }
      return done(null, false);
    });
  })
);

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});
