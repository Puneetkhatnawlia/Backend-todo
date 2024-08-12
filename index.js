// import dotenv from "dotenv";
// import express from "express";
// import router from "./src/routes/todo.routes.js";
// import { connectDb } from "./src/db/db.js";
// import cors from "cors";
// import bodyParser from "body-parser";
// const app = express();
// const PORT = process.env.PORT;
// dotenv.config();
// app.use(cors());
// app.use("/api/todo", router);
// // app.use(express.json());
// app.use(bodyParser.json());

// connectDb().then(() => {
//   app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT} `);
//   });
// });

import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import router from "./src/routes/todo.routes.js";
import { connectDb } from "./src/db/db.js";

dotenv.config(); // Load environment variables

const app = express();
const PORT = process.env.PORT || 5000; // Default port if not provided

app.use(cors());
app.use(express.json()); // Use built-in body parser
app.use("/api/todo", router);

// Connect to the database and start the server
connectDb()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Failed to connect to the database:", err);
    process.exit(1); // Exit the process if the connection fails
  });
