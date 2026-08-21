import type { UserRepository } from "../repositories/user.repository.js";
import type { LivekitService } from "../services/livekit/livekit.service.js";
import type { User } from "../types/index.js";

export class JoinStreamRoom {

    constructor(
        private livekitserv: LivekitService,
    ) {}

    async execute(userid: string, roomname: string) {

        const room = await this.livekitserv.findByRoomName(roomname)

        if (!room)
            throw new Error("Sala não encontrada")

        const livekitRoomToken = await this.livekitserv.createLiveKitToken(userid, room.roomName, true)

        return (
            {
                access_token: livekitRoomToken,
                room,
                isowner: userid == room.userid
            }
        )
    }
}

