import express from "express";
import { Todo } from "../models/todo.models.js";

const router = express.Router();


router.post("/", async (req, res) => {
  console.log("Request Body:", req.body); 
  if (!req.body) {
    return res.status(400).json({ error: "Request body is missing" });
  }

  const { title, description, days, schedule } = req.body;

  if (!title || !description || !days || !schedule) {
    return res
      .status(400)
      .json({ error: "Title and description are required" });
  }

  try {
    const newTodo = new Todo({
      title,
      description,
      days,
      schedule,
    });
    const todo = await newTodo.save();
    res.status(201).json(todo);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all todos
router.get("/", async (req, res) => {
  try {
    const todos = await Todo.find();
    res.status(200).json(todos);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get a todo by ID
router.get("/:id", async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) return res.status(404).json({ message: "Todo not found" });
    res.status(200).json(todo);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
router.put("/:id", async (req, res) => {
  try {
    const { title, description, days, schedule, completed } = req.body;
    const todo = await Todo.findByIdAndUpdate(
      req.params.id,
      { title, description, days, schedule, completed },
      { new: true, runValidators: true }
    );
    if (!todo) return res.status(404).json({ message: "Todo not found" });
    res.status(200).json(todo);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
router.delete("/:id", async (req, res) => {
  try {
    const todo = await Todo.findByIdAndDelete(req.params.id);
    if (!todo) return res.status(404).json({ message: "Todo not found" });
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default router;
