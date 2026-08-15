import { SignJWT, jwtVerify } from "jose";
import "dotenv/config";
const secret = new TextEncoder().encode(process.env.JWT_SECRET);
export class JWTTokenService {
    async generate(payload) {
        return new SignJWT({ username: payload.username })
            .setProtectedHeader({ alg: "HS256" })
            .setSubject(payload.userid)
            .setIssuedAt()
            .setExpirationTime("15m")
            .sign(secret);
    }
    async verify(token) {
        const { payload } = await jwtVerify(token, secret);
        if (!payload.sub || typeof payload.username !== "string")
            throw new Error("Token inválido");
        return {
            userid: payload.sub,
            username: payload.username
        };
    }
}
//# sourceMappingURL=jwt-token-service.js.map