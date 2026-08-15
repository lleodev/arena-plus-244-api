import type { RefreshTokenService } from "../cryptography/refresh-token-service.js";
import type { SessionRepository } from "../repositories/session-repository.js";


export class Logout {
    
    constructor(
        private sessionRepository: SessionRepository,
        private refreshTokenService: RefreshTokenService
    ) {}

    async execute(refreshToken: string) {
        const hash = await this.refreshTokenService.hash(refreshToken)

        const session = await this.sessionRepository.findByTokenHash(hash)

        if (!session)
            return
        
        await this.sessionRepository.revoke(session.id)
    }
}