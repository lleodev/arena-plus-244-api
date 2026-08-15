import type { RefreshTokenService } from "../cryptography/refresh-token-service.js";
import type { SessionRepository } from "../repositories/session-repository.js";
export declare class Logout {
    private sessionRepository;
    private refreshTokenService;
    constructor(sessionRepository: SessionRepository, refreshTokenService: RefreshTokenService);
    execute(refreshToken: string): Promise<void>;
}
//# sourceMappingURL=logout-user.d.ts.map