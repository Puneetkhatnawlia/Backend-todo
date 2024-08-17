//todo.routes.js
import express from "express";
import { Todo } from "../models/todo.models.js";
import { authMiddleware } from "../middleware/Auth.middleware.js";
import User from "../models/login.models.js";
const router = express.Router();

router.post("/", authMiddleware, async (req, res) => {
  if (!req.body) {
    console.log("Missing request body");
    if (!res.headersSent) {
      return res.status(400).json({ error: "Request body is missing" });
    }
  }

  const { title, description, days, schedule } = req.body;
  const { id } = req.user;

  if (!id) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  if (!title || !description || !days || !schedule) {
    console.log("Missing required fields");
    if (!res.headersSent) {
      return res.status(400).json({
        error: "Title, description, days, and schedule are required",
      });
    }
  }

  try {
    const newTodo = new Todo({
      title,
      description,
      days,
      schedule,
    });

    const todo = await newTodo.save();
    const todoId = todo._id;

    await User.findOneAndUpdate(
      { _id: id },
      { $push: { todos: todoId } },
      { new: true }
    );

    if (!res.headersSent) {
      res.status(201).json({
        message: "Todo created successfully",
        todo: todo,
      });
    }
  } catch (error) {
    console.error("Error creating todo:", error.message);
    if (!res.headersSent) {
      res.status(400).json({ error: error.message });
    }
  }
});

router.get("/", authMiddleware, async (req, res) => {
  try {
    const id = req.user.id;
    const user = await User.findOne({ _id: id })
      .populate("todos")
      .select("-password -__v");

    return res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get("/:id", authMiddleware, async (req, res) => {
  const user = req.user;
  if (!user) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized",
    });
  }
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) return res.status(404).json({ message: "Todo not found" });
    res.status(200).json(todo);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.put("/:id",authMiddleware, async (req, res) => {
  try {
    const { title, description, days, schedule, completed } = req.body;
    const todo = await Todo.findByIdAndUpdate(
      req.params.id,
      { title, description, days, schedule, completed },
      { new: true, runValidators: true }
    );
    if (!todo) return res.status(404).json({ message: "Todo not found" });
    res.status(200).json({
      success:true,
      todo,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const todo = await Todo.findByIdAndDelete(req.params.id);
    if (!todo) return res.status(404).json({ message: "Todo not found" });
    res.status(204).json({
      success:true,
      message:"Todo deleted",
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default router;
