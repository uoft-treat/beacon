import {IMessage, Message} from '../../model';
import {MessageService} from "../MessageService";

export class MessageServiceImpl implements MessageService {

    /**
     * Create a new message.
     * @param message Message string to create.
     */
    async createNewMessage(message: string): Promise<IMessage> {
        let msg = new Message({message});
        await msg.save();
        return msg;
    }

    /**
     * Get all messages.
     */
    async getAll(): Promise<IMessage[]> {
        return await Message.find({});
    }

}
