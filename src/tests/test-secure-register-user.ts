import { Argon2PasswordHasher } from "../cryptography/argon2-password-hasher.js"
import { CryptoRefeshTokenService } from "../cryptography/crypto-refresh-token-service.js"
import { JWTTokenService } from "../cryptography/jwt-token-service.js"
import { PrismaSessionRepository } from "../repositories/prisma-session-repository.js"
import { PrismaUserRepository } from "../repositories/prisma-user.repository.js"
import { RegisterUser } from "../use-cases/register-user.js"

(async () => { 

    const data = {
        username: "lleodev",
        email: "lleodev@dev.ao", 
        password: "123456"
    }

    const repository = new PrismaUserRepository()
    const passwordHasher = new Argon2PasswordHasher()
    const tokenseerv = new JWTTokenService()
    const refeshtokenserv = new CryptoRefeshTokenService()
    const sessionrepo = new PrismaSessionRepository()

    const registerUserCase = new RegisterUser(repository, passwordHasher, tokenseerv, refeshtokenserv, sessionrepo)
    
    console.log(await registerUserCase.execute(data))

})()