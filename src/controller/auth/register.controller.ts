import type { Request, Response } from 'express'

import { PrismaUserRepository } from '../../repositories/prisma-user.repository.js'
import { Argon2PasswordHasher } from '../../cryptography/argon2-password-hasher.js'
import { RegisterUser } from '../../use-cases/register-user.js'
import { JWTTokenService } from '../../cryptography/jwt-token-service.js'
import { CryptoRefeshTokenService } from '../../cryptography/crypto-refresh-token-service.js'
import { PrismaSessionRepository } from '../../repositories/prisma-session-repository.js'

export async function ReisterController(req: Request, res: Response) {
    const { username, email, password } = req.body

    try {
        const prismaRepo = new PrismaUserRepository()
        const passwHasher = new Argon2PasswordHasher()
        const tokenserv = new JWTTokenService()
        const refeshToken = new CryptoRefeshTokenService()
        const sessionRepo = new PrismaSessionRepository()
    
        const register = new RegisterUser(prismaRepo, passwHasher, tokenserv, refeshToken, sessionRepo)
    
        const user = await register.execute({
            username,
            email, 
            password
        })

        res.cookie("access_token", user.accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 15 * 60 * 1000,
            path: "/"
        })

        res.cookie("refesh_token", user.refeshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 30 * 24 * 60 * 60 * 1000,
            path: "/auth"
        })
    
        return res.status(200).json(user.user)
        
    } catch (error: any) {
        if (error instanceof Error)
        {
            console.error(error.message)
            return res.status(400).json({message: error.message})
        }
        return res.status(500).json({ message: "Erro interno do servidor" })
    }


}