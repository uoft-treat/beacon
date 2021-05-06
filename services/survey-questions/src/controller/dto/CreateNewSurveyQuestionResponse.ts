import {ISurveyQuestion} from "../../model";

export class CreateNewSurveyQuestionResponse {

    _id: string;

    /**
     * Create an new instance from survey question model.
     * @param model
     */
    static createFromSurveyQuestionModel(model: ISurveyQuestion): CreateNewSurveyQuestionResponse {
        let instance = new CreateNewSurveyQuestionResponse();
        instance._id = model._id.toString();
        return instance;
    }

}