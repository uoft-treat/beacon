import {IMessage} from "../../model";

export class GetOneMessageResponse {
    _id: string;
    message: string;

    /**
     * Construct this DTO from a message model.
     * @param model Message model.
     */
    static constructFromModel(model: IMessage) {
        let dto = new GetOneMessageResponse();
        dto._id = model._id.toString();
        dto.message = model.message;
        return dto;
    }
}
