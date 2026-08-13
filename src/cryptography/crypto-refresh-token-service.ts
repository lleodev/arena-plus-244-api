import crypto from 'node:crypto'
import type { RefeshTokenService } from './refesh-token-service.js'

export class CryptoRefeshTokenService implements RefeshTokenService {
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