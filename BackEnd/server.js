import express from "express"
import "dotenv/config"
import cors from "cors"
import connectDB from "./configs/db.js"

const app = express()

//db connection
await connectDB()

// Middleware
app.use(cors())
app.use(express.json())

// Routes
app.get('/', (req, res) => {
    res.send("Server Started")
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))