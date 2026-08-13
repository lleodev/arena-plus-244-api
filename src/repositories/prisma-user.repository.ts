import type { User } from "../generated/prisma/client.js"
import {  prisma } from "../config/database.js"
import type { UserRepository } from "./user.repository.js"

export class PrismaUserRepository implements UserRepository {

    async create(data: { username: string; email: string; password: string }): Promise<User> {
        return prisma.user.create({
            data
        })
    }

    async findById(id: string): Promise<User | null> {
        return prisma.user.findUnique({
            where: {
                id
            }
        })
    }

    async findByEmail(email: string): Promise<User | null> {
        return prisma.user.findUnique({
            where : {
                email
            }
        })
    }

    async findByUsername(username: string): Promise<User | null> {
        return prisma.user.findUnique({
            where: {
                username
            }
        })
    }

    async delete(id: string): Promise<User | null> {
        return prisma.user.delete({
            where: {
                id
            }
        })
    }
}
