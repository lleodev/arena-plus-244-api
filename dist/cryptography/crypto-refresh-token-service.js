import crypto from 'node:crypto';
export class CryptoRefreshTokenService {
    generate() {
        return crypto.randomBytes(64).toString("hex");
    }
    async hash(token) {
        return crypto
            .createHash("sha256")
            .update(token)
            .digest("hex");
    }
}
//# sourceMappingURL=crypto-refresh-token-service.js.map