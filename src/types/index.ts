declare global {
    namespace Express {
        interface Request {
            user?: {
                userid: string,
                username: string,
                email: string
            }
        }
    }
}

export interface User {
    userid: string,
    username: string,
    email: string
}