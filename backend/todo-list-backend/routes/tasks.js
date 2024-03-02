const { isAuthenticated } = require("../controllers/auth");

let express = require("express");
let router = express.Router();

let tasksController = require("../controllers/tasks.js");

// Create a new task
router.post("/newtask", isAuthenticated, tasksController.createTask);

// Get all tasks
router.get("/", isAuthenticated, tasksController.getAllTasks);

// Get a single task
router.get("/:taskID", isAuthenticated, tasksController.getTask);

// Update a task
router.put("/:taskID", isAuthenticated, tasksController.updateTask);

// Delete a task
router.delete("/:taskID", isAuthenticated, tasksController.deleteTask);

// Delete a task
router.delete("/all", isAuthenticated, tasksController.deleteAllTasks);

module.exports = router;
