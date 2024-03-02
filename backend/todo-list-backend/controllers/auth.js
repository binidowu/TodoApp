let User = require("../models/users");
let config = require("../../config/config");
const passport = require("passport");

exports.loginUser = (req, res, next) => {
  console.log(`loggin in`);
  passport.authenticate("local", (err, user, info) => {
    // console.log(`3 - Passport authenticate cb ${JSON.stringify(user)}`);
    if (err) {
      return res.status(401).json({ success: false, message: "Username or password is incorrect" });
    }
    if (!user) {
      return res.status(400).json({ success: false, message: "Unauthorised User" });
    }
    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }
      console.log("logged in successfully", user);
      const userData = {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
      };
      return res.status(200).json({ success: true, message: "Logged in successfully", user: userData });
    });
  })(req, res, next);
};

exports.logoutUser = (req, res) => {
  req.logout(() => {
    res.status(200).json({ success: true, message: "Logged out successfully" });
  });
};

exports.isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  return res.status(401).json({ success: false, message: "User is not authenticated" });
};
