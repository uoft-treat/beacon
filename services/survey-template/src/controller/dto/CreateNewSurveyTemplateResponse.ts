import {ISurveyTemplate} from "../../model/SurveyTemplate";

export class CreateNewSurveyTemplateResponse {
    _id: string;

    /**
     * Construct this DTO from a model.
     * @param model
     */
    static constructFromModel(model: ISurveyTemplate) {
        let dto = new CreateNewSurveyTemplateResponse();
        dto._id = model._id.toString();
        return dto;
    }
}
