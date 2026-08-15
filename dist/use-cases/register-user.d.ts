import type { JWTTokenService } from "../cryptography/jwt-token-service.js";
import type { PasswordHasher } from "../cryptography/password-hasher.js";
import type { RefreshTokenService } from "../cryptography/refresh-token-service.js";
import type { SessionRepository } from "../repositories/session-repository.js";
import type { UserRepository } from "../repositories/user.repository.js";
interface RegisterUserInput {
    username: string;
    email: string;
    password: string;
}
export declare class RegisterUser {
    private userRepository;
    private passwordHasher;
    private tokenService;
    private refreshTokenService;
    private sessionRepository;
    constructor(userRepository: UserRepository, passwordHasher: PasswordHasher, tokenService: JWTTokenService, refreshTokenService: RefreshTokenService, sessionRepository: SessionRepository);
    execute(data: RegisterUserInput): Promise<{
        accessToken: string;
        refreshToken: string;
        user: {
            id: string;
            username: string;
            email: string;
        };
    }>;
}
export {};
//# sourceMappingURL=register-user.d.ts.map