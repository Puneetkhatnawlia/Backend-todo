// //todo.js
// import mongoose from "mongoose";

// const todoSchema = new mongoose.Schema({
//   title: {
//     type: String,
//     required: true,
//   },
//   description: {
//     type: String,
//     required: true,
//   },
//   days:{
//     type: String,
//     required: true,
//   },
//   schedule:{
//     type: String,
//     required: true,
//   },
//   completed:{
//     type:Boolean,
//     default:false
//   }
// });
// export const Todo = mongoose.model("Todo", todoSchema);

import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  days: {
    type: String,
    required: true,
  },
  schedule: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

export const Todo = mongoose.model("Todo", todoSchema);