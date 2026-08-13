import express, { type Request, type Response } from "express"
import healthRoutes from "./routes/health.routes.js"
import authRoutes from "./routes/auth.routes.js"
import cors from 'cors'
import coockieParser from 'cookie-parser'
import { config } from "dotenv"

config()

const app = express()

app.use(express.json())

app.use(cors({
    origin: "http://10.203.124.241:3000",
    credentials: true
}))

app.use(coockieParser())

app.use("/health", healthRoutes)

app.use("/api/v1/auth", authRoutes)

export default app
