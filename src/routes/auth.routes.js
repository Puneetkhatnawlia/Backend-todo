import express from "express";
import jwt from "jsonwebtoken";
import User from "../models/login.models.js";
import dotenv from "dotenv";
const router = express.Router();

dotenv.config();

router.post("/register", async (req, res) => {
  const { email, password, username } = req.body;

  try {
    const exUser = await User.findOne({email:email});
    if (exUser) {
      return res.status(400).json({ message: "user already exists" });
    }
    const user = new User({ email, password, username });
    await user.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// router.post("/login", async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const user = await User.findOne({ email });
//     if (!user)
//       return res.status(400).json({ error: "Invalid email or password" });

//     const isMatch = await user.comparePassword(password);
//     if (!isMatch)
//       return res.status(400).json({ error: "Invalid email or password" });

//     const token = jwt.sign({ id: user._id }, { expiresIn: "1h" });
//     res.json({ token });
//     JWT_SECRET;
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is not defined");
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
