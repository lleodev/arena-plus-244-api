import type { SessionRepository } from "./session-repository.js";
import type { Session } from '../generated/prisma/client.js'
import { prisma } from "../config/database.js"


export class PrismaSessionRepository implements SessionRepository {

    async create(data: { userid: string; refreshTokenHash: string; expiresAt: Date; }): Promise<Session> {
        return prisma.session.create({ data })
    }
    
    async findByTokenHash(refreshTokenHash: string): Promise<Session | null> {
        return prisma.session.findUnique({ 
            where: {
                refreshTokenHash,
            }
         })
    }

    async revoke(sessionid: string): Promise<void> {
        await prisma.session.update({
            where: {
                id: sessionid
            },
            data: {
                revokedAt: new Date()
            }
        })
    }
}