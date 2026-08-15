import { Router } from "express";
import { AuthMiddleware } from "../middlewares/auth.middleware.js";
import { CreateStreamRoomController } from "../controllers/stream/create-stream-room.controller.js";
import { JoinStreamRoomController } from "../controllers/stream/join-stream-room.controller.js";
import { GetStreamsController } from "../controllers/stream/get-streams.controller.js";
const router = Router();
router.post("/stream/create", AuthMiddleware, CreateStreamRoomController);
router.get("/stream/join/:id", AuthMiddleware, JoinStreamRoomController);
router.get("/streams", AuthMiddleware, GetStreamsController);
export default router;
//# sourceMappingURL=stream.routes.js.map