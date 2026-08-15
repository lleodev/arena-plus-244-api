import { Router, type Request, type Response } from "express";
import { ReisterController } from "../controller/auth/register.controller.js";
import { LoginController } from "../controller/auth/login.controller.js";
import { RefreshSession } from "../use-cases/refresh-session.js";
import { LogoutController } from "../controller/auth/logout.controller.js";
import { RefreshSessionController } from "../controller/auth/refesh-session.controller.js";
import { AuthMiddleware } from "../middlewares/auth.middleware.js";

const router = Router()

router.post("/register", ReisterController)

router.post("/login", LoginController)

router.post("/refresh", RefreshSessionController)

router.post("/logout", LogoutController)



export default router