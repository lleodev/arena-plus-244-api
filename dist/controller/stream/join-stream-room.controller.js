import { JoinStreamRoom } from "../../use-cases/join-streamroom.js";
import { LivekitService } from "../../services/livekit/livekit.service.js";
import { CreateStreamRoom } from "../../use-cases/create-streamroom-token.js";
export async function JoinStreamRoomController(req, res) {
    try {
        const { id } = req.params;
        const { userid } = req.user;
        const livekitServ = new LivekitService();
        const livekittoken = new JoinStreamRoom(livekitServ);
        const roominfo = await livekittoken.execute(userid, id);
        return res.status(201).json({
            ...roominfo
        });
    }
    catch (error) {
        if (error instanceof Error) {
            console.log(error);
            return res.status(400).json({ message: error.message });
        }
        return res.status(500).json({ message: "Erro interno do servidor" });
    }
}
//# sourceMappingURL=join-stream-room.controller.js.map