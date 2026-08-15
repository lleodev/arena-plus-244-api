import type { LivekitService } from "../services/livekit/livekit.service.js";
export declare class JoinStreamRoom {
    private livekitserv;
    constructor(livekitserv: LivekitService);
    execute(userid: string, roomname: string): Promise<{
        access_token: string;
        room: {
            userid: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            roomName: string;
            title: string;
            desc: string;
            status: string;
        };
        isowner: boolean;
    }>;
}
//# sourceMappingURL=join-streamroom.d.ts.map