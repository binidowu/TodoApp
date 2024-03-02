const { isAuthenticated } = require("../controllers/auth.js");
//const { isAuthorized } = require('../controllers/users');

let express = require("express");
let router = express.Router();

let tasksController = require("../controllers/tasks.js");

// Create a new task
router.post("/newtask", isAuthenticated, tasksController.createTask);

// Get all tasks
router.post("/", isAuthenticated, tasksController.getAllTasks);

// Get a single task
router.get("/:taskID", isAuthenticated, tasksController.getTask);

// Update a task
router.put("/:taskID", isAuthenticated, tasksController.updateTask);

// Delete a task
router.delete("/:taskID", isAuthenticated, tasksController.deleteTask);

// Delete a task
router.delete("/", isAuthenticated, tasksController.deleteAllTasks);

module.exports = router;
