import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import TodoRouter from "./src/routes/todo.routes.js";
import authRouter from "./src/routes/auth.routes.js"
import { connectDb } from "./src/db/db.js";

dotenv.config(); 

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use("/api/todo", TodoRouter);
app.use("/api/auth", authRouter);

connectDb()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Failed to connect to the database:", err);
    process.exit(1);
  });
