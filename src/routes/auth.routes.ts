import { Router, type Request, type Response } from "express";
import { ReisterController } from "../controllers/auth/register.controller.js";
import { LoginController } from "../controllers/auth/login.controller.js";
import { RefreshSession } from "../use-cases/refresh-session.js";
import { LogoutController } from "../controllers/auth/logout.controller.js";
import { RefreshSessionController } from "../controllers/auth/refesh-session.controller.js";
import { AuthMiddleware } from "../middlewares/auth.middleware.js";

const router = Router()

router.post("/register", ReisterController)

router.post("/login", LoginController)

router.post("/refresh", RefreshSessionController)

router.post("/logout", LogoutController)



export default router