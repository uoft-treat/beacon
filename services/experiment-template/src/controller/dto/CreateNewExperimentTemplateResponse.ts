import {IExperimentTemplate} from "../../model/ExperimentTemplate";

export class CreateNewExperimentTemplateResponse {
    _id: string;

    /**
     * Construct this DTO from a model.
     * @param model
     */
    static constructFromModel(model: IExperimentTemplate) {
        let dto = new CreateNewExperimentTemplateResponse();
        dto._id = model._id.toString();
        return dto;
    }
}
