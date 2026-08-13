import type { RefeshTokenService } from "../cryptography/refesh-token-service.js";
import type { SessionRepository } from "../repositories/session-repository.js";


export class Logout {
    
    constructor(
        private sessionRepository: SessionRepository,
        private refeshTokenService: RefeshTokenService
    ) {}

    async execute(refeshToken: string) {
        const hash = await this.refeshTokenService.hash(refeshToken)

        const session = await this.sessionRepository.findByTokenHash(hash)

        if (!session)
            return
        
        await this.sessionRepository.revoke(session.id)
    }
}