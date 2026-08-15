import type { Request, Response } from 'express'
import { PrismaUserRepository } from '../../repositories/prisma-user.repository.js'
import { Argon2PasswordHasher } from '../../cryptography/argon2-password-hasher.js'
import { JWTTokenService } from '../../cryptography/jwt-token-service.js'
import type { UserRepository } from '../../repositories/user.repository.js'
import { RegisterUser } from '../../use-cases/register-user.js'
import { LoginUser } from '../../use-cases/login-user.js'
import { CryptoRefreshTokenService } from '../../cryptography/crypto-refresh-token-service.js'
import { PrismaSessionRepository } from '../../repositories/prisma-session-repository.js'

export async function LoginController(req: Request, res: Response)
{
    const { email, password } = req.body

    try {
        const userRep = new PrismaUserRepository()
        const passwHasher = new Argon2PasswordHasher()
        const tokenserv = new JWTTokenService()
        const refreshTokenServ = new CryptoRefreshTokenService()
        const sessionRepository = new PrismaSessionRepository()
        const login = new LoginUser(userRep, passwHasher, tokenserv,refreshTokenServ, sessionRepository)

        const user = await login.execute({
            email, 
            password
        })
        
        res.cookie("access_token", user.access_token, {
            httpOnly: true,
            secure: true,
            sameSite: "lax",
            maxAge: 30 * 24 * 60 * 60 * 1000,
            path: "/"
        })

        res.cookie("refresh_token", user.refresh_token, {
            httpOnly: true,
            secure: true,
            sameSite: "lax",
            maxAge: 30 * 24 * 60 * 60 * 1000,
            path: "/api/v1/auth"
        })
        
        console.log("RESPONSE: Logado com sucesso")
        res.status(201).json(user.user)
    }
    catch(error: any) {
        console.log(error.message)
        res.status(400).json({message: error.message})
    }
}