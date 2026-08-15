import type { Request, Response } from "express";
import { LivekitService } from "../../services/livekit/livekit.service.js";

export async function GetStreamsController(req: Request, res: Response) {

    try {
        const livekitServ = new LivekitService()
        const lives = await livekitServ.getAll()
        console.log("RESPONSE: Todas as transmissões")
        return res.status(201).json(lives)
    } catch(error) {
        if (error instanceof Error){
            console.log("ERROR", error.message)
            return res.status(400).json({ message: error.message })
        }

            return res.status(500).json({ message: "Erro interno do servidor" })
    } 
}