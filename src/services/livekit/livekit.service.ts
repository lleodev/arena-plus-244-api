import { AccessToken } from "livekit-server-sdk";
import type { StreamRepository, StreamRoomProp } from "../../repositories/stream-repository.js";
import type { Room as StreamRoom } from "../../generated/prisma/client.js"
import { prisma } from "../../config/database.js";

export class LivekitService implements StreamRepository {
    async createLiveKitToken(identity: string, roomname: string, canPublish: boolean) {
    
        const token = new AccessToken(
            process.env.LIVEKIT_API_KEY!,
            process.env.LIVEKIT_API_SECRET!, 
            {
                identity
            }
        )
    
        token.addGrant({
            roomJoin: true,
            room: roomname,
            canPublish,
            canSubscribe: true
        })
    
        return await token.toJwt()
    }

    async createStreamRoom(owner: string, roomprop: { title: string, desc: string}): Promise<StreamRoom> {
        console.log(roomprop)
        return await prisma.room.create({
            data: {
                title: roomprop.title,
                userid: owner,
                desc: roomprop.desc,
                roomName: `${owner}-${crypto.randomUUID().substring(0,12)}`,
                status: "",
            }
        })
    }

    closeStreamRoom(roomname: string): Promise<void> {
        
    }

    async findByRoomName(roomname: string): Promise<StreamRoom | null> {
        return await (
            prisma.room.findUnique({
                where: {
                    roomName: roomname
                }
            })
        )
    }

    async getAll() : Promise<StreamRoom[]> {
        return await prisma.room.findMany()
    }

    async findByRoomId(id: string): Promise<StreamRoom | null> {
        return await (
            prisma.room.findUnique({
                where: {
                    id
                }
            })
        )
    }

}