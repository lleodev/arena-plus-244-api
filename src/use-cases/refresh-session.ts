import type { JWTTokenService } from "../cryptography/jwt-token-service.js"
import type { CryptoRefeshTokenService } from "../cryptography/crypto-refresh-token-service.js"
import type { SessionRepository } from "../repositories/session-repository.js"
import type { UserRepository } from "../repositories/user.repository.js"

export class RefeshSession {
    constructor (
        private sessionRepository: SessionRepository,
        private refeshTokenService: CryptoRefeshTokenService,
        private tokenService: JWTTokenService,
        private userRepository: UserRepository
    ) {}

    async execute(refeshToken: string) {

        const refeshTokenHash = await this.refeshTokenService.hash(refeshToken)

        const session = await this.sessionRepository.findByTokenHash(refeshTokenHash)

        if (!session)
            throw new Error("Sessão inválida")

        if (session.revokedAt)
            throw new Error("Sessão revogada")

        if (session.expiresAt < new Date())
                throw new Error("Sessão expirada")

        const user = await this.userRepository.findById(session.userid)
        
        if (!user)
            throw new Error("Usuário não encontrado")

        const accessToken = await this.tokenService.generate({
            userid: user.id,
            username: user.username
        })
            
        return accessToken
    }
}