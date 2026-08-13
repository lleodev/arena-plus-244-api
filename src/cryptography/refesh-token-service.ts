export interface RefeshTokenService {
    generate(): string
    hash(token: string): Promise<string>
}