import type { Request, Response } from "express";
import { Logout } from "../../use-cases/logout-user.js";
import { PrismaSessionRepository } from "../../repositories/prisma-session-repository.js";
import { CryptoRefeshTokenService } from "../../cryptography/crypto-refresh-token-service.js";

export async function LogoutController (req: Request, res: Response) {

    const sessionRep = new PrismaSessionRepository()
    const refeshToken = new CryptoRefeshTokenService()
    const logout = new Logout(sessionRep, refeshToken)

    const refeshtoken = req.cookies.refesh_token

    try {
        if (refeshtoken)
            await logout.execute(refeshtoken)

        res.clearCookie("access_token")
        res.clearCookie("refesh_token", {
            path: "/auth"
        })

        return res.status(204).send()
    } catch (error) {
        
        if (error instanceof Error)
            return res.status(400).json({ message: error.message })
        return res.status(500).json({message : "Error interno do servidor"})
    }

}