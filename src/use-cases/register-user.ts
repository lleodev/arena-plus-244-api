import type { JWTTokenService } from "../cryptography/jwt-token-service.js";
import type { PasswordHasher } from "../cryptography/password-hasher.js";
import type { RefeshTokenService } from "../cryptography/refesh-token-service.js";
import type { SessionRepository } from "../repositories/session-repository.js";
import type { UserRepository } from "../repositories/user.repository.js";

interface RegisterUserInput {
    username: string;
    email: string;
    password: string;
}

export class RegisterUser {
    constructor(
        private userRepository: UserRepository, 
        private passwordHasher: PasswordHasher, 
        private tokenService: JWTTokenService,
        private refeshTokenService: RefeshTokenService,
        private sessionRepository: SessionRepository
    ) {}

    async execute(data: RegisterUserInput) {
        const existingEmail = await this.userRepository.findByEmail(
            data.email
        )

        if (existingEmail)
            throw Error("Email já está sendo usado")

        const existingUsername = await this.userRepository.findByUsername(
            data.username
        )

        if (existingUsername)
            throw Error("Username já está sendo usado")

        const passwordhashed = await this.passwordHasher.hash(data.password)

        const user = await this.userRepository.create({
            username: data.username,
            email: data.email,
            password: passwordhashed
        })

        const accessToken = await this.tokenService.generate({ userid: user.id, username: user.username })
        const refeshToken = this.refeshTokenService.generate()
        const refeshTokenHash = await this.refeshTokenService.hash(refeshToken)

        await this.sessionRepository.create({
            userid: user.id,
            refeshTokenHash: refeshTokenHash,
            expiresAt: new Date(Date.now() + 30 * 24 * 60 * 1000)
        })

        return {
            accessToken,
            refeshToken,
            user: {
                id: user.id,
                username: user.username,
                email: user.email
            }
        }
    }
}