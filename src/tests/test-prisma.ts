import { prisma } from "../config/database.js"
import { Argon2PasswordHasher } from "../cryptography/argon2-password-hasher.js"
import { CryptoRefreshTokenService } from "../cryptography/crypto-refresh-token-service.js"
import { JWTTokenService } from "../cryptography/jwt-token-service.js"
import { PrismaSessionRepository } from "../repositories/prisma-session-repository.js"
import { PrismaUserRepository } from "../repositories/prisma-user.repository.js"
import type { UserRepository } from "../repositories/user.repository.js"
import { RegisterUser } from "../use-cases/register-user.js"

export async function create() {

    const data = {
        username: "lleodev",
        email: "lleodev@dev.ao", 
        password: "123456"
    }
    const repository = new PrismaUserRepository()
    const passwordHasher = new Argon2PasswordHasher()
    const tokenseerv = new JWTTokenService()
    const refreshtokenserv = new CryptoRefreshTokenService()
    const sessionrepo = new PrismaSessionRepository()

    const registerUserCase = new RegisterUser(repository, passwordHasher, tokenseerv, refreshtokenserv, sessionrepo)

    const registerSessioncase = new PrismaSessionRepository()

    if (await repository.findByEmail(data.email))
        console.error()

    const { user } = await registerUserCase.execute(data)
    
    const session = await registerSessioncase.create({ 
        userid: user.id, 
        refreshTokenHash: "hash-test-123",
        expiresAt: new Date(Date.now() + 1000 * 60 * 60)
     })

     console.log(session)
}

export async function getUsers() {
    const users = await prisma.user.findMany()
    console.log(users)
}

export async function getUser()
{

}

export async function deleteUser() {
    
    const repository = new PrismaUserRepository()
    const result = await repository.delete("cmsq0rihr0000ixlyi8qnoc2y")
    
    if (result)
        console.log("Conta eliminada com sucesso")
    else
        console.error("Erro ao eliminar conta")
}

try {
    // await deleteUser()
    await create()
    await getUsers()
} catch (error: any) {
    console.log("Error: ", error.stack)
} finally {
    prisma.$disconnect()
}