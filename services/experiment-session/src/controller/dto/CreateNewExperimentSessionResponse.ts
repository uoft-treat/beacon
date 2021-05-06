import {IExperimentSession} from "../../model/ExperimentSession";

export class CreateNewExperimentSessionResponse {
    _id: string;

    /**
     * Construct this DTO from a model.
     * @param model
     */
    static constructFromModel(model: IExperimentSession) {
        let dto = new CreateNewExperimentSessionResponse();
        dto._id = model._id.toString();
        return dto;
    }
}
