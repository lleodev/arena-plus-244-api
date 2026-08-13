export interface TokenService {
    generate(payload: {
        userid: string;
        username: string;
    }) : Promise<string>;

    verify(token: string): Promise<{
        userid: string;
        username: string;
    }>
}