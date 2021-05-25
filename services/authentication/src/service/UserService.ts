import {IUser, UserRoleEnum, UserSourceEnum} from "../model/User";

export interface UserService {
    createNewUser(
        username: string,
        password: string,
        source: UserSourceEnum,
        roles: UserRoleEnum[],
    ): Promise<IUser>;

    getOneByUsername(username: string): Promise<IUser>;

    getAll(): Promise<IUser[]>;
}
