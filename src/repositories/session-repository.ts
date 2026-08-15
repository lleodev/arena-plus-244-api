import type { Session } from '../generated/prisma/client.js'

export interface SessionRepository {
    create(data: { userid: string, refreshTokenHash: string, expiresAt: Date}) : Promise<Session>

    findByTokenHash(refreshTokenHash: string): Promise<Session | null>

    revoke(sessionid: string): Promise<void>
}

