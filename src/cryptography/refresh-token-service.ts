export interface RefreshTokenService {
    generate(): string
    hash(token: string): Promise<string>
}