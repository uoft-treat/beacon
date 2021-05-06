import {IApi} from "../../model/Api";

export class GetOneApiByNameResponse {

    name: string;
    endpoints: string[];

    /**
     * Construct this DTO from models.
     * @param model
     */
    static constructFromModel(model: IApi) {
        let dto = new GetOneApiByNameResponse();
        dto.name = model.name;
        dto.endpoints = model.endpoints;
        return dto;
    }
}
