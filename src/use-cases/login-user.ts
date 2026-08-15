import type { Argon2PasswordHasher } from "../cryptography/argon2-password-hasher.js";
import type { UserRepository } from "../repositories/user.repository.js";
import type { TokenService } from "../cryptography/token-service.js";
import type { RefreshTokenService } from "../cryptography/refresh-token-service.js";
import type { PrismaSessionRepository } from "../repositories/prisma-session-repository.js";

interface LoginUserInput {
    email: string;
    password: string;
}

export class LoginUser {
    constructor(
        private userRepository: UserRepository, 
        private passwordHasher: Argon2PasswordHasher, 
        private tokenService: TokenService,
        private refreshTokenService: RefreshTokenService,
        private SessionService: PrismaSessionRepository
    ) {}

    async execute(data: LoginUserInput){
        const existingUser = await this.userRepository.findByEmail(data.email)
        
        if (!existingUser) {
            throw Error("Email ou senha inválida")

        }

        const hashmatch = await this.passwordHasher.compare(data.password, existingUser.password)

        if (!hashmatch)
            throw Error("Email ou senha inválida")

        const token = await this.tokenService.generate({
            userid: existingUser.id,
            username: existingUser.username
        })

        const refreshToken = this.refreshTokenService.generate()

        this.SessionService.create({
            userid: existingUser.id,
            refreshTokenHash: await this.refreshTokenService.hash(refreshToken),
            expiresAt: new Date(Date.now() + 30 * 24 * 60 * 1000)

        })

        return {
            access_token: token,
            refresh_token: refreshToken,
            user: {
                id: existingUser.id,
                username: existingUser.username,
                email: existingUser.email
            }
        }

    }
}