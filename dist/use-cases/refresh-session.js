export class RefreshSession {
    sessionRepository;
    refreshTokenService;
    tokenService;
    userRepository;
    constructor(sessionRepository, refreshTokenService, tokenService, userRepository) {
        this.sessionRepository = sessionRepository;
        this.refreshTokenService = refreshTokenService;
        this.tokenService = tokenService;
        this.userRepository = userRepository;
    }
    async execute(refreshToken) {
        const refreshTokenHash = await this.refreshTokenService.hash(refreshToken);
        const session = await this.sessionRepository.findByTokenHash(refreshTokenHash);
        if (!session)
            throw new Error("Sessão inválida");
        if (session.revokedAt)
            throw new Error("Sessão revogada");
        if (session.expiresAt < new Date())
            throw new Error("Sessão expirada");
        const user = await this.userRepository.findById(session.userid);
        if (!user)
            throw new Error("Usuário não encontrado");
        const accessToken = await this.tokenService.generate({
            userid: user.id,
            username: user.username
        });
        return accessToken;
    }
}
//# sourceMappingURL=refresh-session.js.map