import {ISurveyQuestion} from "../../model";

export class ListAllSurveyQuestionsSingleResponse {

    _id: string;
    title: string;
    description: string;
    questionType: string;
    choices: string[];
    lockedAt: string;
    createdAt: string;
    updatedAt: string;

    /**
     * Create an instance from model.
     * @param model
     */
    static createFromSurveyQuestionModel(model: ISurveyQuestion): ListAllSurveyQuestionsSingleResponse {

        let instance = new ListAllSurveyQuestionsSingleResponse();
        instance._id = model._id.toString();
        instance.title = model.title;
        instance.description = model.description;
        instance.questionType = model.questionType;
        instance.choices = model.choices;
        if (model.lockedAt) {
            instance.lockedAt = model.lockedAt.toISOString();
        }
        instance.createdAt = (model.createdAt || new Date(0)).toISOString();
        instance.updatedAt = (model.updatedAt || new Date(0)).toISOString();

        return instance;
    }

}
