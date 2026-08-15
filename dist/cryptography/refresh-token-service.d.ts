export interface RefreshTokenService {
    generate(): string;
    hash(token: string): Promise<string>;
}
//# sourceMappingURL=refresh-token-service.d.ts.map