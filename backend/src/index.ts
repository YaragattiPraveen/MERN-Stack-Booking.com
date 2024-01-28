import express from 'express'
import cors from 'cors'
import "dotenv/config"
import userRoute from "./routes/userRoute"
import authRoute from './routes/authRoute'
import dbConnect from './Config/dbConfig'
import cookieParser from 'cookie-parser'


const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}))
app.use(cookieParser())
// mongoose.connect(process.env.DB_URL as string)
dbConnect()

app.use("/api/user", userRoute)
app.use("/api/auth", authRoute)

app.listen(3700, () => {
    console.log('server is will be running on port 3700')
}) 