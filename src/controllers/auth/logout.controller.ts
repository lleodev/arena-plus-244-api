import type { Request, Response } from "express";
import { Logout } from "../../use-cases/logout-user.js";
import { PrismaSessionRepository } from "../../repositories/prisma-session-repository.js";
import { CryptoRefreshTokenService } from "../../cryptography/crypto-refresh-token-service.js";

export async function LogoutController (req: Request, res: Response) {

    const sessionRep = new PrismaSessionRepository()
    const refreshToken = new CryptoRefreshTokenService()
    const logout = new Logout(sessionRep, refreshToken)

    const refreshtoken = req.cookies.refresh_token

    try {
        if (refreshtoken)
            await logout.execute(refreshtoken)

        res.clearCookie("access_token")
        res.clearCookie("refresh_token", {
            path: "/api/v1/auth"
        })
        console.log("RESPONSE: ")
        return res.status(204).send()
    } catch (error) {
        
        
        if (error instanceof Error)
        {
            console.log(error.message)
            return res.status(400).json({ message: error.message })
        }
        return res.status(500).json({message : "Error interno do servidor"})
    }

}