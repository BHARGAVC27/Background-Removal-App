import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import connectDB from './configs/mongoDB.js';

//App config
const PORT = process.env.PORT || 5000
const app = express()
await connectDB();

//Middleware
app.use(cors())
app.use(express.json())


//Api routes
app.get("/",(req,res)=>{
    res.send("/ api working ")
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})