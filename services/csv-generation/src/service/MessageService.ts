import {IMessage} from '../model';

export interface MessageService {
    createNewMessage(message: string): Promise<IMessage>;
    getAll(): Promise<IMessage[]>;
}