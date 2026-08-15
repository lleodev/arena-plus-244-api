import type { User } from "../generated/prisma/client.js";
import type { UserRepository } from "./user.repository.js";
export declare class PrismaUserRepository implements UserRepository {
    create(data: {
        username: string;
        email: string;
        password: string;
    }): Promise<User>;
    findById(id: string): Promise<User | null>;
    findByEmail(email: string): Promise<User | null>;
    findByUsername(username: string): Promise<User | null>;
    delete(id: string): Promise<User | null>;
}
//# sourceMappingURL=prisma-user.repository.d.ts.map