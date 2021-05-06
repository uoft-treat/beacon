import {IExperimentSession} from "../../model/ExperimentSession";

export class GetOneExperimentSessionResponse {
    _id: string;
    surveyTemplateId: string;
    experimentTemplateId: string;
    createdAt: string;
    updatedAt: string;

    /**
     * Construct this DTO from a model.
     * @param model
     */
    static constructFromModel(model: IExperimentSession) {
        let dto = new GetOneExperimentSessionResponse();
        dto._id = model._id.toString();
        dto.surveyTemplateId = model.surveyTemplateId;
        dto.experimentTemplateId = model.experimentTemplateId;
        dto.createdAt = model.createdAt.toISOString();
        dto.updatedAt = model.updatedAt.toISOString();
        return dto;
    }
}
