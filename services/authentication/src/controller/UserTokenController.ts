import {UserTokenService} from "../service/UserTokenService";

export class UserTokenController {

    userTokenService: UserTokenService;

    constructor(userTokenService: UserTokenService) {
        this.userTokenService = userTokenService;
    }

    createNewUserToken = async (req, res, next) => {
        try {
            let token = await this.userTokenService.createTokenByUsernameAndPassword(req.body.username, req.body.password);
            res.send(token);
        } catch (e) {
            return next(e);
        }
    };

    getUserByToken = async (req, res, next) => {
        try {
            res.send(await this.userTokenService.getUserByToken(req.params.body));
        } catch (e) {
            return next(e);
        }
    }

}