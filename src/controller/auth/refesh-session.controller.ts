import type { Request, Response } from "express";
import { RefeshSession } from "../../use-cases/refresh-session.js";
import { CryptoRefeshTokenService } from "../../cryptography/crypto-refresh-token-service.js";
import { PrismaSessionRepository } from "../../repositories/prisma-session-repository.js";
import { JWTTokenService } from "../../cryptography/jwt-token-service.js";
import { PrismaUserRepository } from "../../repositories/prisma-user.repository.js";

export async function handler(req: Request, res: Response)
{
    const sessionRepo = new PrismaSessionRepository()
    const refeshTokenserv = new CryptoRefeshTokenService()
    const tokenserv = new JWTTokenService()
    const userRepo = new PrismaUserRepository()
    const refeshSession = new RefeshSession(sessionRepo, refeshTokenserv, tokenserv, userRepo)

    const refeshToken = req.cookies.refesh_token

    if (!refeshToken) {
        return res.status(401).json({ message: "Refesh token não encontrado" })
    }

    try {
        const accessToken = await refeshSession.execute(refeshToken)

        res.cookie("access_token", accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 15 * 60 * 1000
        })

        return (res.status(200).json({ message: "Sessão renovada" }))
    } catch(error) {
        if (error instanceof Error)
            return res.status(400).json({ message: error.message })

        return res.status(500).json({ message: "Erro interno do servidor" })
        
    }
}