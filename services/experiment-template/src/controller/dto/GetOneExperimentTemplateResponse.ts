import {IExperimentTemplate} from "../../model/ExperimentTemplate";

export class GetOneExperimentTemplateResponse {
    _id: string;
    name: string;
    description: string;
    link: string;

    /**
     * Construct this DTO from a model.
     * @param model
     */
    static constructFromModel(model: IExperimentTemplate) {
        let dto = new GetOneExperimentTemplateResponse();
        dto._id = model._id.toString();
        dto.name = model.name;
        dto.description = model.description;
        dto.link = model.link;
        return dto;
    }
}
