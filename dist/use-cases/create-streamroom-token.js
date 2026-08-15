export class CreateStreamRoom {
    livekitserv;
    constructor(livekitserv) {
        this.livekitserv = livekitserv;
    }
    async execute(userid, roomprop) {
        const room = await this.livekitserv.createStreamRoom(userid, roomprop);
        const livekitRoomToken = await this.livekitserv.createLiveKitToken(userid, room.roomName, true);
        return ({
            access_token: livekitRoomToken,
            room,
        });
    }
}
//# sourceMappingURL=create-streamroom-token.js.map