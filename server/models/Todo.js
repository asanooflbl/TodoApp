
import mongoose from "mongoose";

const TodoSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
  title: { type: String, required: true },
  description: { type: String },
  status: { type: String, enum: ["pending", "completed"], default: "pending" }
}, { timestamps: true });

const Todo = mongoose.model("todo", TodoSchema);

export default Todo;
