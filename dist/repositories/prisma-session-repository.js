import { prisma } from "../config/database.js";
export class PrismaSessionRepository {
    async create(data) {
        return prisma.session.create({ data });
    }
    async findByTokenHash(refreshTokenHash) {
        return prisma.session.findUnique({
            where: {
                refreshTokenHash,
            }
        });
    }
    async revoke(sessionid) {
        await prisma.session.update({
            where: {
                id: sessionid
            },
            data: {
                revokedAt: new Date()
            }
        });
    }
}
//# sourceMappingURL=prisma-session-repository.js.map