import { SignJWT, jwtVerify } from "jose";
import type { TokenService } from "./token-service.js";
import "dotenv/config"

const secret = new TextEncoder().encode(
    process.env.JWT_SECRET!
)

export class JWTTokenService implements TokenService {
    async generate(payload: { userid: string; username: string; }): Promise<string> {
        return new SignJWT({ username: payload.username })
        .setProtectedHeader({ alg: "HS256" })
        .setSubject(payload.userid)
        .setIssuedAt()
        .setExpirationTime("15m")
        .sign(secret)
    }

    async verify(token: string): Promise<{ userid: string; username: string; }> {
        const { payload } = await jwtVerify(
            token, secret
        )

        if (!payload.sub || typeof payload.username !== "string")
            throw new Error("Token inválido")
        
        return {
            userid: payload.sub,
            username: payload.username
        }
    }
}