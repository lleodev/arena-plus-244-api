export class JoinStreamRoom {
    livekitserv;
    constructor(livekitserv) {
        this.livekitserv = livekitserv;
    }
    async execute(userid, roomname) {
        const room = await this.livekitserv.findByRoomName(roomname);
        if (!room)
            throw new Error("Sala não encontrada");
        const livekitRoomToken = await this.livekitserv.createLiveKitToken(userid, room.roomName, true);
        return ({
            access_token: livekitRoomToken,
            room,
            isowner: userid == room.userid
        });
    }
}
//# sourceMappingURL=join-streamroom.js.map