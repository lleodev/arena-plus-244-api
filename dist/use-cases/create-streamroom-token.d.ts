import type { LivekitService } from "../services/livekit/livekit.service.js";
export declare class CreateStreamRoom {
    private livekitserv;
    constructor(livekitserv: LivekitService);
    execute(userid: string, roomprop: {
        title: string;
        desc: string;
    }): Promise<{
        access_token: string;
        room: {
            id: string;
            roomName: string;
            title: string;
            desc: string;
            status: string;
            createdAt: Date;
            updatedAt: Date;
            userid: string;
        };
    }>;
}
//# sourceMappingURL=create-streamroom-token.d.ts.map