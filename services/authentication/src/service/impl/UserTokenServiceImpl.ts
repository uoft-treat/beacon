import {UserTokenService}      from "../UserTokenService";
import {IUserToken, UserToken} from "../../model/UserToken";
import {IUser, User}           from "../../model/User";
import Boom                    from "@hapi/boom";
import {pbkdf2Sync}            from "pbkdf2";
import uuid                    from "uuid/v4";

const DEFAULT_SALT = "RY3txZQS3d72Mcr7";

export class UserTokenServiceImpl implements UserTokenService {
    async createTokenByUsernameAndPassword(username: string, password: string): Promise<IUserToken> {

        let user = await User.findOne({username});

        if (!user) {
            throw Boom.notFound("User with that username cannot be found.");
        }

        if (pbkdf2Sync(password, DEFAULT_SALT, 1, 32, 'sha512').toString('hex') !== user.password) {
            throw Boom.unauthorized("Invalid password.");
        }

        let token = new UserToken({
            user,
            body: uuid(),
        });

        await token.save();

        return token;
    }

    async getUserByToken(body: string): Promise<IUser> {

        let token = await UserToken.findOne({body});

        if (!token) {
            throw Boom.notFound("Token cannot be found.");
        }

        await token.populate('user').execPopulate();

        console.log(token);

        return token.user;

    }

}
