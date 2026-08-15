import express, { type Request, type Response } from "express"
import healthRoutes from "./routes/health.routes.js"
import authRoutes from "./routes/auth.routes.js"
import streamRoutes from "./routes/stream.routes.js"
import cors from 'cors'
import coockieParser from 'cookie-parser'
import { config } from "dotenv"
import { AuthMiddleware } from "./middlewares/auth.middleware.js"

config()

const app = express()

app.use(express.json())
app.use(coockieParser())

app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true
}))

app.use("/health", healthRoutes)
app.use("/api/v1/auth", authRoutes)
app.use("/api/v1", streamRoutes)

app.get("/api/v1/users/me", AuthMiddleware, (req: Request, res: Response) => {
    res.status(200).json(req.user)
})

export default app
