import type { Request, Response } from "express";
import { CreateStreamRoom } from "../../use-cases/create-streamroom-token.js";
import { LivekitService } from "../../services/livekit/livekit.service.js";
import type { User } from "../../types/index.js";

export async function CreateStreamRoomController(req: Request, res: Response) {

    const livekitServ = new LivekitService()
    const livekittoken = new CreateStreamRoom(livekitServ)

    try {
        const { userid } = req.user as User
        const { title, desc  } = req.body
    
        console.log(req.body)
        const result = await livekittoken.execute(userid, { desc, title })
        
        return res.status(201).json({
            ...result
        })

    } catch(error) {
        if (error instanceof Error)
        {
            console.log(error)
            return res.status(400).json({ message : error.message })
        }
        return res.status(500).json({ message : "Erro interno do servidor" })

    }


}