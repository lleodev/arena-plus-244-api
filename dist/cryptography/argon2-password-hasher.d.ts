import type { PasswordHasher } from "./password-hasher.js";
export declare class Argon2PasswordHasher implements PasswordHasher {
    hash(password: string): Promise<string>;
    compare(password: string, hash: string): Promise<boolean>;
}
//# sourceMappingURL=argon2-password-hasher.d.ts.map