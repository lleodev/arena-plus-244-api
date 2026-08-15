import type { Request, Response } from "express";
import type { User } from "../../types/index.js";
import { JoinStreamRoom } from "../../use-cases/join-streamroom.js";
import { LivekitService } from "../../services/livekit/livekit.service.js";
import { CreateStreamRoom } from "../../use-cases/create-streamroom-token.js";


export async function JoinStreamRoomController(req: Request, res: Response) {

    try {
        const { id } = req.params 

        const { userid } = req.user as User

        const livekitServ = new LivekitService()
        const livekittoken = new JoinStreamRoom(livekitServ)

        const roominfo = await livekittoken.execute(userid, id as string)
        console.log("RESPONSE: Entrou na transmissão")

        return res.status(201).json (
            {
                ...roominfo
            }
        )
    } catch (error) {
        if (error instanceof Error)
        {
            console.error("ERROR: ", error)
            return res.status(400).json({ message: error.message })
        }
        return res.status(500).json({ message: "Erro interno do servidor" })
    }
}
