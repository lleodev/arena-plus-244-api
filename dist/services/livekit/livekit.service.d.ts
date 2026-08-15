import type { StreamRepository } from "../../repositories/stream-repository.js";
import type { Room as StreamRoom } from "../../generated/prisma/client.js";
export declare class LivekitService implements StreamRepository {
    createLiveKitToken(identity: string, roomname: string, canPublish: boolean): Promise<string>;
    createStreamRoom(owner: string, roomprop: {
        title: string;
        desc: string;
    }): Promise<StreamRoom>;
    findByRoomName(roomname: string): Promise<StreamRoom | null>;
    getAll(): Promise<StreamRoom[]>;
    findByRoomId(id: string): Promise<StreamRoom | null>;
}
//# sourceMappingURL=livekit.service.d.ts.map