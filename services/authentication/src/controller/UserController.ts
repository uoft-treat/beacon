import {UserService}                  from "../service/UserService";
import Boom                           from '@hapi/boom';
import {UserRoleEnum, UserSourceEnum} from "../model/User";

export class UserController {

    userService: UserService;

    constructor(userService: UserService) {
        this.userService = userService;
    }

    createNewUser = async (req, res, next) => {

        if (await this.userService.getOneByUsername(req.body.username)) {
            return next(Boom.conflict("Username already exists."));
        }
        let user = await this.userService.createNewUser(req.body.username, req.body.password, UserSourceEnum.LOCAL, [UserRoleEnum.ADMIN]);
        res.send(user);

    };

    getAllUsers = async (req, res, next) => {
        res.send(await this.userService.getAll());
    }

}