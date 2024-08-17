// export const authMiddleware = (req, res, next) => {
//   const token = req.header("Authorization")?.replace("Bearer ", "");

//   if (!token) return res.status(401).json({ error: "No token provided" });

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.userId = decoded.id;
//     next();
//   } catch (err) {
//     res.status(401).json({ error: "Invalid token" });
//   }
// };
//auth.middleware.js
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.status(401).json({ success: false, message: "Unauthorized" });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
  // Find the user and attach to req.user
  // try {
  //   // const user = await User.findById(decoded.id);
  //   if (!user) return res.status(401).json({ message: "User not found" });
  //  const user = await authenticate(req);
  //  req.user = user;
  //  next();
  // } catch (err) {
  //   res.status(500).json({ message: "Server error" });
  // }
};
