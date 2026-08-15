import type { TokenService } from "./token-service.js";
import "dotenv/config";
export declare class JWTTokenService implements TokenService {
    generate(payload: {
        userid: string;
        username: string;
    }): Promise<string>;
    verify(token: string): Promise<{
        userid: string;
        username: string;
    }>;
}
//# sourceMappingURL=jwt-token-service.d.ts.map