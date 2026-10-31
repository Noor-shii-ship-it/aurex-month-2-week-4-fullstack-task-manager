
const Task = require("../models/Task");

// Get tasks belonging to the logged-in user
const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user.id }).sort({
      createdAt: -1,
    });

    return res.status(200).json(tasks);
  } catch (error) {
    console.error("Get tasks error:", error.message);
    return res.status(500).json({ message: "Unable to fetch tasks." });
  }
};

// Create a task
const createTask = async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title || !title.trim()) {
      return res.status(400).json({
        message: "Task title is required.",
      });
    }

    const task = await Task.create({
      title: title.trim(),
      description: description ? description.trim() : "",
      user: req.user.id,
    });

    return res.status(201).json(task);
  } catch (error) {
    console.error("Create task error:", error.message);
    return res.status(500).json({ message: "Unable to create task." });
  }
};

// Update a task owned by the logged-in user
const updateTask = async (req, res) => {
  try {
    const { title, description, completed } = req.body;
    const updates = {};

    if (title !== undefined) {
      if (typeof title !== "string" || !title.trim()) {
        return res.status(400).json({
          message: "Task title cannot be empty.",
        });
      }
      updates.title = title.trim();
    }

    if (description !== undefined) {
      if (typeof description !== "string") {
        return res.status(400).json({
          message: "Description must be text.",
        });
      }
      updates.description = description.trim();
    }

    if (completed !== undefined) {
      if (typeof completed !== "boolean") {
        return res.status(400).json({
          message: "Completed must be true or false.",
        });
      }
      updates.completed = completed;
    }

    if (Object.keys(updates).length === 0) {
      return res.status(400).json({
        message: "Provide at least one field to update.",
      });
    }

    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      { $set: updates },
      { new: true, runValidators: true }
    );

    if (!task) {
      return res.status(404).json({
        message: "Task not found.",
      });
    }

    return res.status(200).json(task);
  } catch (error) {
    console.error("Update task error:", error.message);
    return res.status(500).json({ message: "Unable to update task." });
  }
};

// Delete a task owned by the logged-in user
const deleteTask = async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!task) {
      return res.status(404).json({
        message: "Task not found.",
      });
    }

    return res.status(200).json({
      message: "Task deleted successfully.",
    });
  } catch (error) {
    console.error("Delete task error:", error.message);
    return res.status(500).json({ message: "Unable to delete task." });
  }
};

module.exports = {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
};

