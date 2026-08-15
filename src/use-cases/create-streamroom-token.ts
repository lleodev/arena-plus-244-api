import type { LivekitService } from "../services/livekit/livekit.service.js";
import type { User } from "../types/index.js";

export class CreateStreamRoom {

    constructor(
        private livekitserv: LivekitService
    ) {}

    async execute(userid: string, roomprop: { title: string, desc: string}) {

        const room = await this.livekitserv.createStreamRoom(userid, roomprop)

        const livekitRoomToken = await this.livekitserv.createLiveKitToken(userid, room.roomName, true)

        return (
            {
                access_token: livekitRoomToken,
                room,
            }
        )
    }
}

