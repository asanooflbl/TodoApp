import express from 'express'
import 'dotenv/config'
import cors from 'cors'
import connectDB from './config/db.js';
import authRouter from './routes/authRoutes.js';
import todoRouter from './routes/todoRoutes.js';

const app = express();

await connectDB();

app.use(cors())
app.use(express.json());

app.get('/',(req,res)=>res.send("TodoApp API is working"));

app.use('/api/auth',authRouter);
app.use('/api/todo',todoRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT,()=> console.log("Server is running on port " + PORT));

export default app;