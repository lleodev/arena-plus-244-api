import { CreateStreamRoom } from "../../use-cases/create-streamroom-token.js";
import { LivekitService } from "../../services/livekit/livekit.service.js";
export async function CreateStreamRoomController(req, res) {
    const livekitServ = new LivekitService();
    const livekittoken = new CreateStreamRoom(livekitServ);
    try {
        const { userid } = req.user;
        const { title, desc } = req.body;
        console.log(req.body);
        const result = await livekittoken.execute(userid, { desc, title });
        console.log("RESPONSE: Transmissão criada com sucesso");
        return res.status(201).json({
            ...result
        });
    }
    catch (error) {
        if (error instanceof Error) {
            console.log(error.message);
            return res.status(400).json({ message: error.message });
        }
        return res.status(500).json({ message: "Erro interno do servidor" });
    }
}
//# sourceMappingURL=create-stream-room.controller.js.map