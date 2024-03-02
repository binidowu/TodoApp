const express = require("express");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const expressSession = require("express-session");
const User = require("../todo-list-backend/models/users");
const bcrypt = require("bcryptjs");
const cors = require("cors");
require("dotenv").config();

// Initialize Express app
const app = express();

//Enable CORS
app.use(cors({ origin: "http://localhost:3006", credentials: true }));
// Set the view engine to ejs
app.set("view engine", "ejs");

// Middleware for sessions
app.use(
  expressSession({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    },
  })
);

// Middleware for parsing request bodies
app.use(express.json());

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
  console.log(`4 - Serialize user: ${JSON.stringify(user.id)}`);
  return done(null, user.id);
});
passport.deserializeUser(async (id, done) => {
  console.log(`5 - Deserialize user: ${JSON.stringify(id)}`);
  const user = await User.findById(id);
  if (user) {
    return done(null, { id: user.id, email: user.email });
  } else {
    return done(new Error("No user with id found"));
  }
});

passport.use(
  "local",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true,
    },
    async (req, email, password, done) => {
      console.log(`2 - Local strategy verify cb`);
      const user = await User.findOne({ email: email.toLowerCase() });
      if (!user) {
        return done(null, false, { message: "Incorrect email or does not exist" });
      }

      const result = await new Promise((resolve, reject) => {
        bcrypt.compare(password, user.hashedPassword, (err, res) => {
          if (err) reject(err);
          resolve(res);
        });
      });

      if (result) {
        return done(null, user);
      } else {
        return done(null, false, { message: "Incorrect password." });
      }
    }
  )
);

// Import routes
const indexRouter = require("../todo-list-backend/routes/index");
const taskRouter = require("../todo-list-backend/routes/tasks");
const userRouter = require("../todo-list-backend/routes/users");

// Define api routes
app.use("/", indexRouter);
app.use("/tasks", taskRouter);
app.use("/users", userRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({
    success: false,
    message: err.message,
  });
});

module.exports = app;
