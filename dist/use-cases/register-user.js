export class RegisterUser {
    userRepository;
    passwordHasher;
    tokenService;
    refreshTokenService;
    sessionRepository;
    constructor(userRepository, passwordHasher, tokenService, refreshTokenService, sessionRepository) {
        this.userRepository = userRepository;
        this.passwordHasher = passwordHasher;
        this.tokenService = tokenService;
        this.refreshTokenService = refreshTokenService;
        this.sessionRepository = sessionRepository;
    }
    async execute(data) {
        const existingEmail = await this.userRepository.findByEmail(data.email);
        if (existingEmail)
            throw Error("Email já está sendo usado");
        const existingUsername = await this.userRepository.findByUsername(data.username);
        if (existingUsername)
            throw Error("Username já está sendo usado");
        const passwordhashed = await this.passwordHasher.hash(data.password);
        const user = await this.userRepository.create({
            username: data.username,
            email: data.email,
            password: passwordhashed
        });
        const accessToken = await this.tokenService.generate({ userid: user.id, username: user.username });
        const refreshToken = this.refreshTokenService.generate();
        const refreshTokenHash = await this.refreshTokenService.hash(refreshToken);
        await this.sessionRepository.create({
            userid: user.id,
            refreshTokenHash: refreshTokenHash,
            expiresAt: new Date(Date.now() + 30 * 24 * 60 * 1000)
        });
        return {
            accessToken,
            refreshToken,
            user: {
                id: user.id,
                username: user.username,
                email: user.email
            }
        };
    }
}
//# sourceMappingURL=register-user.js.map