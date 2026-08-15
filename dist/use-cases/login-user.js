export class LoginUser {
    userRepository;
    passwordHasher;
    tokenService;
    refreshTokenService;
    SessionService;
    constructor(userRepository, passwordHasher, tokenService, refreshTokenService, SessionService) {
        this.userRepository = userRepository;
        this.passwordHasher = passwordHasher;
        this.tokenService = tokenService;
        this.refreshTokenService = refreshTokenService;
        this.SessionService = SessionService;
    }
    async execute(data) {
        const existingUser = await this.userRepository.findByEmail(data.email);
        if (!existingUser) {
            throw Error("Email ou senha inválida");
        }
        const hashmatch = await this.passwordHasher.compare(data.password, existingUser.password);
        if (!hashmatch)
            throw Error("Email ou senha inválida");
        const token = await this.tokenService.generate({
            userid: existingUser.id,
            username: existingUser.username
        });
        const refreshToken = this.refreshTokenService.generate();
        this.SessionService.create({
            userid: existingUser.id,
            refreshTokenHash: await this.refreshTokenService.hash(refreshToken),
            expiresAt: new Date(Date.now() + 30 * 24 * 60 * 1000)
        });
        return {
            access_token: token,
            refresh_token: refreshToken,
            user: {
                id: existingUser.id,
                username: existingUser.username,
                email: existingUser.email
            }
        };
    }
}
//# sourceMappingURL=login-user.js.map