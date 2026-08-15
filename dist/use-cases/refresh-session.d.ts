import type { JWTTokenService } from "../cryptography/jwt-token-service.js";
import type { CryptoRefreshTokenService } from "../cryptography/crypto-refresh-token-service.js";
import type { SessionRepository } from "../repositories/session-repository.js";
import type { UserRepository } from "../repositories/user.repository.js";
export declare class RefreshSession {
    private sessionRepository;
    private refreshTokenService;
    private tokenService;
    private userRepository;
    constructor(sessionRepository: SessionRepository, refreshTokenService: CryptoRefreshTokenService, tokenService: JWTTokenService, userRepository: UserRepository);
    execute(refreshToken: string): Promise<string>;
}
//# sourceMappingURL=refresh-session.d.ts.map