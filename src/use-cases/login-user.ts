import type { Argon2PasswordHasher } from "../cryptography/argon2-password-hasher.js";
import type { UserRepository } from "../repositories/user.repository.js";
import type { TokenService } from "../cryptography/token-service.js";

interface LoginUserInput {
    email: string;
    password: string;
}

export class LoginUser {
    constructor(private userRepository: UserRepository, private passwordHasher: Argon2PasswordHasher, private tokenService: TokenService) {}

    async execute(data: LoginUserInput){
        const existingUser = await this.userRepository.findByEmail(data.email)
        
        if (!existingUser) {
            throw Error("Email ou senha inválida")

        }

        const hashmatch = await this.passwordHasher.compare(data.password, existingUser.password)

        if (!hashmatch)
            throw Error("Email ou senha inválida")

        const token = await this.tokenService.generate({
            userid: existingUser.id,
            username: existingUser.username
        })

        return {
            token,
            user: {
                id: existingUser.id,
                username: existingUser.username,
                email: existingUser.email
            }
        }

    }
}