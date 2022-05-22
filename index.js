const dotenv = require("dotenv");
dotenv.config();

require("./config/database").connect();

// importing all the required packages
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const session = require("express-session");
const passport = require("passport");

const app = express();

app.use(express.json());

// configuring the bodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// adding the cors to make it accessible to everywhere
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

// importing the passport strategies
require("./middleware/auth");

app.use(passport.initialize());
app.use(passport.session());

/* ----------------- All the Routes ------------------- */
app.use("/auth", require("./routes/auth"));
app.use("/seller", require("./routes/seller"));

// The last route when the route isn't valid
app.use("*", (req, res) => {
  res.status(404).json({
    success: "false",
    message: "Page not found",
    error: {
      statusCode: 404,
      message: "You reached a route that is not defined on this server",
    },
  });
});

app.listen(process.env.PORT || 8000, (err) => {
  if (err) console.log(err);
  else console.log("Server Started");
});
