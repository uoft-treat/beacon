import {IApi} from "../../model/Api";

export class ListAllApisResponse {

    name: string;
    endpoints: string[];

    /**
     * Construct this DTO from models.
     * @param model Message model.
     */
    static constructFromModel(model: IApi) {
        let dto = new ListAllApisResponse();
        dto.name = model.name;
        dto.endpoints = model.endpoints;
        return dto;
    }
}
