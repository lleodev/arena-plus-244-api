import { Router, type Request, type Response } from "express";
import { ReisterController } from "../controller/auth/register.controller.js";
import { LoginController } from "../controller/auth/login.controller.js";
import { RefeshSession } from "../use-cases/refresh-session.js";
import { LogoutController } from "../controller/auth/logout.controller.js";

const router = Router()

router.post("/register", ReisterController)

router.post("/login", LoginController)

router.post("/refesh", ReisterController)

router.post("/logout", LogoutController)

export default router