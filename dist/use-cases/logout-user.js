export class Logout {
    sessionRepository;
    refreshTokenService;
    constructor(sessionRepository, refreshTokenService) {
        this.sessionRepository = sessionRepository;
        this.refreshTokenService = refreshTokenService;
    }
    async execute(refreshToken) {
        const hash = await this.refreshTokenService.hash(refreshToken);
        const session = await this.sessionRepository.findByTokenHash(hash);
        if (!session)
            return;
        await this.sessionRepository.revoke(session.id);
    }
}
//# sourceMappingURL=logout-user.js.map