import { Router, type Request, type Response } from "express"
import { AuthMiddleware } from "../middlewares/auth.middleware.js"

const router = Router()

router.get("/", (req: Request, res: Response) => {
    res.json({
        status: "OK",
        message: "API working"
    })
})

export default router;