import Boom from '@hapi/boom';
import {CreateNewMessageResponse} from "./dto/CreateNewMessageResponse";
import {GetOneMessageResponse} from "./dto/GetOneMessageResponse";
import {MessageService} from "../service";

export class MessageController {

    messageService: MessageService;

    constructor(messageService: MessageService) {
        this.messageService = messageService;
    }

    /**
     * Handle POST /messages request
     * @param req
     * @param res
     * @param next
     */
    createNewMessage = async (req, res, next) => {
        if(!req.body.message) {
            return next(Boom.badRequest("You must provide a message"));
        }
        let message = await this.messageService.createNewMessage(req.body.message);
        res.send(CreateNewMessageResponse.constructFromModel(message));
    };

    /**
     * Handle GET /messages request
     * @param req
     * @param res
     * @param next
     */
    listAllMessages = async (req, res, next) => {
        let messages = await this.messageService.getAll();
        let response: GetOneMessageResponse[] = [];
        for(let msg of messages) {
            response.push(GetOneMessageResponse.constructFromModel(msg));
        }
        res.send(response);
    };

}