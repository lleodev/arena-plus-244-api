import argon2 from "argon2";
export class Argon2PasswordHasher {
    async hash(password) {
        return argon2.hash(password);
    }
    async compare(password, hash) {
        return argon2.verify(hash, password);
    }
}
//# sourceMappingURL=argon2-password-hasher.js.map