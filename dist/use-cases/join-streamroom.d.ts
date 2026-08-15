import type { LivekitService } from "../services/livekit/livekit.service.js";
export declare class JoinStreamRoom {
    private livekitserv;
    constructor(livekitserv: LivekitService);
    execute(userid: string, roomname: string): Promise<{
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
        isowner: boolean;
    }>;
}
//# sourceMappingURL=join-streamroom.d.ts.map