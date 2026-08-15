import { LivekitService } from "../../services/livekit/livekit.service.js";
export async function GetStreamsController(req, res) {
    try {
        const livekitServ = new LivekitService();
        const lives = await livekitServ.getAll();
        return res.status(201).json(lives);
    }
    catch (error) {
        if (error instanceof Error)
            return res.status(400).json({ message: error.message });
        return res.status(500).json({ message: "Erro interno do servidor" });
    }
}
//# sourceMappingURL=get-streams.controller.js.map