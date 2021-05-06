import {IExperimentTemplate} from "../../model/ExperimentTemplate";

export class PatchOneTemplateResponse {
    _id: string;

    /**
     * Construct this DTO from a model.
     * @param model
     */
    static constructFromModel(model: IExperimentTemplate) {
        let dto = new PatchOneTemplateResponse();
        dto._id = model._id.toString();
        return dto;
    }
}
