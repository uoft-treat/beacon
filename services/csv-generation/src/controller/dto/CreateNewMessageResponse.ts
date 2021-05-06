import {IMessage} from "../../model";

export class CreateNewMessageResponse {
    _id: string;
    message: string;

    /**
     * Construct this DTO from a message model.
     * @param model Message model.
     */
    static constructFromModel(model: IMessage) {
        let dto = new CreateNewMessageResponse();
        dto._id = model._id.toString();
        dto.message = model.message;
        return dto;
    }
}
