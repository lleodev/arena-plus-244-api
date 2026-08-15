import { prisma } from "../config/database.js";
export class PrismaUserRepository {
    async create(data) {
        return prisma.user.create({
            data
        });
    }
    async findById(id) {
        return prisma.user.findUnique({
            where: {
                id
            }
        });
    }
    async findByEmail(email) {
        return prisma.user.findUnique({
            where: {
                email
            }
        });
    }
    async findByUsername(username) {
        return prisma.user.findUnique({
            where: {
                username
            }
        });
    }
    async delete(id) {
        return prisma.user.delete({
            where: {
                id
            }
        });
    }
}
//# sourceMappingURL=prisma-user.repository.js.map