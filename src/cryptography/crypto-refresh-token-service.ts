import crypto from 'node:crypto'
import type { RefreshTokenService } from './refresh-token-service.js'

export class CryptoRefreshTokenService implements RefreshTokenService {
    generate(): string {
        return crypto.randomBytes(64).toString("hex")

    }

    async hash(token: string): Promise<string> {
        return crypto
            .createHash("sha256")
            .update(token)
            .digest("hex")
    }
}