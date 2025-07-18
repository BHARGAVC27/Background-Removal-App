import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import connectDB from './configs/mongoDB.js';
import userRouter from './routes/userRoutes.js';

//App config
const PORT = process.env.PORT || 5000
const app = express()
await connectDB();

//Middleware
app.use(cors())
app.use(express.json())


//Api routes
app.get("/",(req,res)=>{
    try {
        res.status(200).json({message: "Welcome to the Background Removal App API"})
    } catch (error) {
        console.error("Error in root route:", error);
        res.status(500).json({error: "Internal Server Error"});
    }
})

app.use("/api/user",userRouter)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})