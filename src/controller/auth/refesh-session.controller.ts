import type { Request, Response } from "express";
import { RefreshSession } from "../../use-cases/refresh-session.js";
import { CryptoRefreshTokenService } from "../../cryptography/crypto-refresh-token-service.js";
import { PrismaSessionRepository } from "../../repositories/prisma-session-repository.js";
import { JWTTokenService } from "../../cryptography/jwt-token-service.js";
import { PrismaUserRepository } from "../../repositories/prisma-user.repository.js";

export async function RefreshSessionController(req: Request, res: Response)
{
    const sessionRepo = new PrismaSessionRepository()
    const refreshTokenserv = new CryptoRefreshTokenService()
    const tokenserv = new JWTTokenService()
    const userRepo = new PrismaUserRepository()
    const refreshSession = new RefreshSession(sessionRepo, refreshTokenserv, tokenserv, userRepo)

    const refreshToken = req.cookies.refresh_token

    if (!refreshToken) {
        return res.status(401).json({ message: "refresh token não encontrado" })
    }

    try {
        const accessToken = await refreshSession.execute(refreshToken)

        res.cookie("access_token", accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 30 * 24 * 60 * 60 * 1000
        })

        return (res.status(200).json({ message: "Sessão renovada" }))
    } catch(error) {
        if (error instanceof Error)
            return res.status(400).json({ message: error.message })

        return res.status(500).json({ message: "Erro interno do servidor" })
        
    }
}