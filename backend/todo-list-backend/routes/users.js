let express = require("express");
let router = express.Router();

let userController = require("../controllers/users");
let authController = require("../controllers/auth");

router.post("/register", userController.registerUser);
router.post("/login", authController.loginUser);
router.get("/logout", authController.logoutUser);

router.param("userID", userController.getUserById);

module.exports = router;
