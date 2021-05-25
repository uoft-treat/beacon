import {LocalUserToken} from "../models/LocalUserToken";

export const authenticationMiddleware = async (req, res, next) => {
    if (req.headers.authorization) {
        const token = await LocalUserToken.findOne({body: req.headers.authorization});
        if(token) {
            await token.populate('localUser').execPopulate();
            req.user = token.localUser;
        }
    }
    next();
};