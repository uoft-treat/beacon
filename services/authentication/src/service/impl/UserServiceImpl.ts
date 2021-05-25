import {UserService}                               from "../UserService";
import {pbkdf2Sync}                                from 'pbkdf2';
import {IUser, User, UserRoleEnum, UserSourceEnum} from "../../model/User";

const DEFAULT_SALT = "RY3txZQS3d72Mcr7";

export class UserServiceImpl implements UserService {
    async createNewUser(username: string, password: string, source: UserSourceEnum, roles: UserRoleEnum[]): Promise<IUser> {
        let user = new User({
            username,
            password: pbkdf2Sync(password, DEFAULT_SALT, 1, 32, 'sha512').toString('hex'),
            source,
            roles,
        });
        await user.save();
        return user;
    }

    async getAll(): Promise<IUser[]> {
        return await User.find({});
    }

    async getOneByUsername(username: string): Promise<IUser> {
        return await User.findOne({username});
    }

}
