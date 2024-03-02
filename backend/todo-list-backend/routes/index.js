let express = require("express");
let router = express.Router();

let indexController = require("../controllers/index");

// Home page
router.get("/", indexController.home);

module.exports = router;
