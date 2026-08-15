import type { SessionRepository } from "./session-repository.js";
import type { Session } from '../generated/prisma/client.js';
export declare class PrismaSessionRepository implements SessionRepository {
    create(data: {
        userid: string;
        refreshTokenHash: string;
        expiresAt: Date;
    }): Promise<Session>;
    findByTokenHash(refreshTokenHash: string): Promise<Session | null>;
    revoke(sessionid: string): Promise<void>;
}
//# sourceMappingURL=prisma-session-repository.d.ts.map