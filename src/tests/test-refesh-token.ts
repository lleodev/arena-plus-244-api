import { CryptoRefreshTokenService } from "../cryptography/crypto-refresh-token-service.js"

(async () => {

    const service = new CryptoRefreshTokenService()

    const token = service.generate()

    const hash = service.hash(token)

    console.log("TOKEN: ", token)
    console.log("HASH: ", await hash)

})()