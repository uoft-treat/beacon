import Boom                              from '@hapi/boom';
import {ILocalUser, LocalUser}           from "../models/LocalUser";
import {ILocalUserToken, LocalUserToken} from "../models/LocalUserToken";
import uuid                              from 'uuid/v4';

type CreateLocalUserInput = {
    username: string,
    password: string,
    role: string,
}

type CreateLocalUserTokenInput = {
    username: string,
    password: string,
}

export default class LocalUserController {

    /**
     * Create a new user.
     * @param input
     */
    public static async createLocalUser(input: CreateLocalUserInput): Promise<ILocalUser> {
        if (await LocalUser.findOne({username: input.username})) {
            throw Boom.conflict("User with that username already exists.");
        }
        const localUser = new LocalUser({
            username: input.username,
            role: input.role,
        });
        localUser.setPassword(input.password);
        await localUser.save();
        return localUser;
    }

    public static async createLocalUserToken(input: CreateLocalUserTokenInput): Promise<ILocalUserToken> {
        const user = await LocalUser.findOne({username: input.username});
        if (!user) {
            throw Boom.notFound("User with that username cannot be found.");
        }
        if (!user.checkPassword(input.password)) {
            throw Boom.unauthorized("You have entered a wrong password.");
        }
        const token = new LocalUserToken({
            localUser: user._id,
            body: uuid(),
        });
        await token.save();
        return token;
    }

}
