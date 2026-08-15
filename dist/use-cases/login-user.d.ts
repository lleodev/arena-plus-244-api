import type { Argon2PasswordHasher } from "../cryptography/argon2-password-hasher.js";
import type { UserRepository } from "../repositories/user.repository.js";
import type { TokenService } from "../cryptography/token-service.js";
import type { RefreshTokenService } from "../cryptography/refresh-token-service.js";
import type { PrismaSessionRepository } from "../repositories/prisma-session-repository.js";
interface LoginUserInput {
    email: string;
    password: string;
}
export declare class LoginUser {
    private userRepository;
    private passwordHasher;
    private tokenService;
    private refreshTokenService;
    private SessionService;
    constructor(userRepository: UserRepository, passwordHasher: Argon2PasswordHasher, tokenService: TokenService, refreshTokenService: RefreshTokenService, SessionService: PrismaSessionRepository);
    execute(data: LoginUserInput): Promise<{
        access_token: string;
        refresh_token: string;
        user: {
            id: string;
            username: string;
            email: string;
        };
    }>;
}
export {};
//# sourceMappingURL=login-user.d.ts.map