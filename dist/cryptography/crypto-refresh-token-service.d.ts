import type { RefreshTokenService } from './refresh-token-service.js';
export declare class CryptoRefreshTokenService implements RefreshTokenService {
    generate(): string;
    hash(token: string): Promise<string>;
}
//# sourceMappingURL=crypto-refresh-token-service.d.ts.map