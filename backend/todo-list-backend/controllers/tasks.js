let Task = require("../models/tasks");
let User = require("../models/users");
require("dotenv").config();

// Create a new Task
exports.createTask = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const title = req.body.title;

    // Check if title already exists
    const existingTask = await Task.findOne({ title: title });
    if (existingTask) {
      return res.status(400).json({ success: false, message: "Task already exists" });
    }

    //Create new task
    const newTask = new Task({
      ...req.body,
      userId: userId,
    });

    // Save new task
    const createdTask = await Task.create(newTask);

    // Push created task to tasks array in the database
    await User.findByIdAndUpdate(userId, { $push: { tasks: createdTask._id } });

    // Return new task
    res.status(201).json({
      success: true,
      message: "Task created",
      task: createdTask,
    });
  } catch (error) {
    console.error(new Error(error.message));
    res.status(500).json({ success: false, message: "Error creating task" });
  }
};

// Get all tasks
exports.getAllTasks = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const tasks = await Task.find({ userId: userId });

    if (!tasks) {
      return res.status(404).json({
        success: false,
        message: "Tasks not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Tasks retrieved successfully",
      tasks: tasks,
    });
  } catch (error) {
    console.error(new Error(error.message));
    res.status(500).json({ success: false, message: "Error retrieving tasks" });
  }
};

// Get a single task
exports.getTask = async (req, res, next) => {
  try {
    const taskID = req.params.taskID;
    const task = await Task.findById(taskID);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Task retrieved successfully",
      task: task,
    });
  } catch (error) {
    console.error(new Error(error.message));
    res.status(500).json({ success: false, message: "Error retrieving task" });
  }
};

// Update a task
exports.updateTask = async (req, res, next) => {
  try {
    const taskID = req.params.taskID;
    const task = await Task.findById(taskID);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    // Copy req.body to avoid mutating the original object
    const updateData = { ...req.body };

    // List the fields you want to exclude from the update
    const excludeFields = ["userId", "startDate", "updatedAt"];

    // Remove the excluded fields from updateData
    excludeFields.forEach((field) => delete updateData[field]);

    const updatedTask = await Task.findByIdAndUpdate(taskID, updateData, { new: true });

    res.status(200).json({
      success: true,
      message: "Task updated successfully",
      task: updatedTask,
    });
  } catch (error) {
    console.error(new Error(error.message));
    res.status(500).json({ success: false, message: "Error updating task" });
  }
};

// Delete a task
exports.deleteTask = async (req, res, next) => {
  try {
    const taskID = req.params.taskID;
    const task = await Task.findById(taskID);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    await Task.findByIdAndDelete(taskID);

    res.status(200).json({
      success: true,
      message: "Task deleted successfully",
    });
  } catch (error) {
    console.error(new Error(error.message));
    res.status(500).json({ success: false, message: "Error deleting task" });
  }
};

// Delete all tasks
exports.deleteAllTasks = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const tasks = await Task.find({ userId: userId });

    if (!tasks) {
      return res.status(404).json({
        success: false,
        message: "Tasks not found",
      });
    }

    await Task.deleteMany({ userId: userId });

    res.status(200).json({
      success: true,
      message: "Tasks deleted successfully",
    });
  } catch (error) {
    console.error(new Error(error.message));
    res.status(500).json({ success: false, message: "Error deleting tasks" });
  }
};
