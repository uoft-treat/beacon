import {ISurveyQuestion} from "../../model";

export class PatchOneSurveyQuestionResponse {

    _id: string;

    /**
     * Create an new instance from survey question model.
     * @param model
     */
    static createFromSurveyQuestionModel(model: ISurveyQuestion): PatchOneSurveyQuestionResponse {
        let instance = new PatchOneSurveyQuestionResponse();
        instance._id = model._id.toString();
        return instance;
    }

}
