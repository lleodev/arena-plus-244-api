import type { User } from "../generated/prisma/client.js";
export interface UserRepository {
    create(data: {
        username: string;
        email: string;
        password: string;
    }): Promise<User>;
    findById(id: string): Promise<User | null>;
    findByEmail(email: string): Promise<User | null>;
    findByUsername(usename: string): Promise<User | null>;
    delete(id: string): Promise<User | null>;
}
//# sourceMappingURL=user.repository.d.ts.map