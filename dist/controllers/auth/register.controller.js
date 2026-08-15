import { PrismaUserRepository } from '../../repositories/prisma-user.repository.js';
import { Argon2PasswordHasher } from '../../cryptography/argon2-password-hasher.js';
import { RegisterUser } from '../../use-cases/register-user.js';
import { JWTTokenService } from '../../cryptography/jwt-token-service.js';
import { CryptoRefreshTokenService } from '../../cryptography/crypto-refresh-token-service.js';
import { PrismaSessionRepository } from '../../repositories/prisma-session-repository.js';
export async function ReisterController(req, res) {
    const { username, email, password } = req.body;
    try {
        const prismaRepo = new PrismaUserRepository();
        const passwHasher = new Argon2PasswordHasher();
        const tokenserv = new JWTTokenService();
        const refreshToken = new CryptoRefreshTokenService();
        const sessionRepo = new PrismaSessionRepository();
        const register = new RegisterUser(prismaRepo, passwHasher, tokenserv, refreshToken, sessionRepo);
        const user = await register.execute({
            username,
            email,
            password
        });
        res.cookie("access_token", user.accessToken, {
            httpOnly: true,
            secure: process.env.SECURE_COOCKIE === "production",
            sameSite: (process.env.SAME_ORIGIN as boolean | "lax" | "strict" | "none" | undefined),
            maxAge: 30 * 24 * 60 * 60 * 1000,
            path: "/"
        });
        res.cookie("refresh_token", user.refreshToken, {
            httpOnly: true,
            secure: process.env.SECURE_COOCKIE === "production",
            sameSite: (process.env.SAME_ORIGIN as boolean | "lax" | "strict" | "none" | undefined),
            maxAge: 30 * 24 * 60 * 60 * 1000,
            path: "/api/v1/auth"
        });
        console.log("RESPONSE: Conta criada com sucesso");
        return res.status(200).json(user.user);
    }
    catch (error) {
        if (error instanceof Error) {
            console.error(error.message);
            return res.status(400).json({ message: error.message });
        }
        return res.status(500).json({ message: "Erro interno do servidor" });
    }
}
//# sourceMappingURL=register.controller.js.map