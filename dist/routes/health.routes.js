import { Router } from "express";
import { AuthMiddleware } from "../middlewares/auth.middleware.js";
const router = Router();
router.get("/", (req, res) => {
    res.json({
        status: "OK",
        message: "API working"
    });
});
export default router;
//# sourceMappingURL=health.routes.js.map