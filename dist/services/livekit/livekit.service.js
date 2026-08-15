import { AccessToken } from "livekit-server-sdk";
import { prisma } from "../../config/database.js";
export class LivekitService {
    async createLiveKitToken(identity, roomname, canPublish) {
        const token = new AccessToken(process.env.LIVEKIT_API_KEY, process.env.LIVEKIT_API_SECRET, {
            identity
        });
        token.addGrant({
            roomJoin: true,
            room: roomname,
            canPublish,
            canSubscribe: true
        });
        return await token.toJwt();
    }
    async createStreamRoom(owner, roomprop) {
        console.log(roomprop);
        return await prisma.room.create({
            data: {
                title: roomprop.title,
                userid: owner,
                desc: roomprop.desc,
                roomName: `${owner}-${crypto.randomUUID().substring(0, 12)}`,
                status: "",
            }
        });
    }
    async findByRoomName(roomname) {
        return await (prisma.room.findUnique({
            where: {
                roomName: roomname
            }
        }));
    }
    async getAll() {
        return await prisma.room.findMany();
    }
    async findByRoomId(id) {
        return await (prisma.room.findUnique({
            where: {
                id
            }
        }));
    }
}
//# sourceMappingURL=livekit.service.js.map