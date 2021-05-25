import {IUserToken} from "../model/UserToken";
import {IUser}      from "../model/User";

export interface UserTokenService {

    createTokenByUsernameAndPassword(username: string, password: string): Promise<IUserToken>;

    getUserByToken(token: string): Promise<IUser>;

}
