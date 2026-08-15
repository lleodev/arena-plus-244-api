import { CryptoRefreshTokenService } from "../cryptography/crypto-refresh-token-service.js";
import { JWTTokenService } from "../cryptography/jwt-token-service.js";
import { PrismaUserRepository } from "../repositories/prisma-user.repository.js";
export async function AuthMiddleware(req, res, next) {
    const accessToken = req.cookies.access_token;
    console.log("MIDD: ", accessToken);
    if (!accessToken)
        return res.status(401).json({ message: "Não autenticado" });
    const jwtserv = new JWTTokenService();
    const userRepository = new PrismaUserRepository();
    try {
        const payload = await jwtserv.verify(accessToken);
        const raw = await userRepository.findById(payload.userid);
        req.user = {
            userid: payload.userid,
            username: payload.username,
            email: raw.email
        };
        return next();
    }
    catch {
        return res.status(401).json({ message: "Access token inválido ou expirado" });
    }
}
//# sourceMappingURL=auth.middleware.js.map