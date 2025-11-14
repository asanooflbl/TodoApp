import express from 'express'
import { addTodo,getTodos,updateTodo,deleteTodo,toggleStatus } from '../controllers/todoController.js'
import auth from "../middleware/auth.js"

const todoRouter = express.Router();

todoRouter.post("/add",auth,addTodo)
todoRouter.get("/all",auth,getTodos)
todoRouter.post("/update",auth,updateTodo)
todoRouter.post("/delete",auth,deleteTodo)
todoRouter.post("/toggle",auth,toggleStatus)


export default todoRouter;