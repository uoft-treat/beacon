import {IApi} from "../../model/Api";

export class CreateNewApiResponse {
    name: string;

    /**
     * Construct this DTO from a model.
     * @param model Message model.
     */
    static constructFromModel(model: IApi) {
        let dto = new CreateNewApiResponse();
        dto.name = model.name.toString();
        return dto;
    }
}
