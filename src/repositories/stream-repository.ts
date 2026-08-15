import type { Room as StreamRoom } from "../generated/prisma/client.js"

export interface StreamRoomProp {
    id: string,
    roomname: string,
    title: string,
    desc: string,
    status: string,
    createdAt: Date
    updatedAt: Date
    owner: string,
}

export interface StreamRepository {
    
    createLiveKitToken(identity: string, roomname: string, canPublish: boolean): Promise<string>
    createStreamRoom(owner: string, roomprop: {roomname: string, title: string, desc: string}) : Promise<StreamRoom>
    closeStreamRoom(roomname: string) : Promise<void>
    findByRoomName(roomname: string) : Promise<StreamRoom | null>
    findByRoomId(id: string) : Promise<StreamRoom | null>
    getAll() : Promise<StreamRoom[]>
}